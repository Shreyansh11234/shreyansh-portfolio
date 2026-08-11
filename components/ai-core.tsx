"use client";

import { useRef, useEffect, useCallback } from "react";
import { usePerformanceMode } from "@/lib/use-performance-mode";

/* ------------------------------------------------------------------ */
/*  Schwarzschild Black-Hole — full-screen WebGL 2 ray-march shader   */
/*  Based on proper geodesic light-bending with accretion disk,       */
/*  Doppler beaming, and procedural starfield.                        */
/* ------------------------------------------------------------------ */

const VERT_SRC = `#version 300 es
void main() {
  vec2 p = vec2((gl_VertexID == 2) ? 3.0 : -1.0,
                (gl_VertexID == 1) ? 3.0 : -1.0);
  gl_Position = vec4(p, 0.0, 1.0);
}`;

const FRAG_SRC = `#version 300 es
precision highp float;
out vec4 fragColor;

uniform vec2  u_resolution;
uniform float u_time;
uniform vec3  u_camPos;
uniform vec3  u_camRight;
uniform vec3  u_camUp;
uniform vec3  u_camForward;
uniform float u_focal;
uniform float u_motion;

float hash13(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec3 starfield(vec3 d) {
  vec3 col = vec3(0.0);
  for (int i = 1; i <= 3; i++) {
    float scale = float(i) * 90.0;
    vec3  p    = d * scale;
    vec3  cell = floor(p);
    float h    = hash13(cell);
    float star = smoothstep(0.9935, 1.0, h);
    float tw   = 0.7 + 0.3 * sin(u_time * 1.6 * u_motion + h * 120.0);
    col += vec3(star * tw) / float(i);
  }
  float nebula = hash13(floor(d * 2.3)) * 0.045;
  col += vec3(0.05, 0.035, 0.09) * nebula;
  return col;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;

  vec3 rd = normalize(u_camRight * uv.x
                    + u_camUp    * uv.y
                    + u_camForward * u_focal);

  vec3 pos = u_camPos;
  vec3 dir = rd;

  vec3  accCol   = vec3(0.0);
  float accAlpha = 0.0;
  bool  captured = false;

  float dt = 0.065;
  const int STEPS = 190;

  for (int i = 0; i < STEPS; i++) {
    float r = length(pos);
    if (r < 1.0) { captured = true; break; }
    if (r > 45.0) break;

    vec3  prevPos = pos;
    float r3      = r * r * r;
    vec3  accel   = -1.55 * pos / r3;
    dir += accel * dt;
    pos += dir   * dt;

    if (sign(prevPos.y) != sign(pos.y) && accAlpha < 0.99) {
      float denom = prevPos.y - pos.y;
      float t     = (abs(denom) > 1e-6) ? prevPos.y / denom : 0.0;
      vec3  hitp  = mix(prevPos, pos, t);
      float rad   = length(hitp.xz);

      if (rad > 1.6 && rad < 9.0) {
        float band = smoothstep(1.6, 2.3, rad)
                   * smoothstep(9.0, 6.0, rad);
        float temp = clamp(1.0 - (rad - 1.6) / (9.0 - 1.6), 0.0, 1.0);

        vec3 hot  = vec3(1.0, 0.96, 0.78);
        vec3 mid  = vec3(1.0, 0.55, 0.16);
        vec3 cool = vec3(0.65, 0.14, 0.32);
        vec3 dcol = mix(cool, mix(mid, hot, temp), temp);

        float ang    = atan(hitp.z, hitp.x);
        float tSlice = floor(u_time * u_motion * 0.6);
        float n1 = hash13(vec3(ang * 4.0, rad * 3.0, tSlice));
        float n2 = hash13(vec3(ang * 9.0 + 3.1, rad * 6.0, tSlice - 1.0));
        dcol *= (0.5 + 0.9 * mix(n1, n2, 0.5));

        vec3  tangent  = normalize(vec3(-hitp.z, 0.0, hitp.x));
        float approach = dot(tangent, normalize(u_camPos - hitp));
        dcol *= (0.5 + 0.9 * max(approach, 0.0));

        float localAlpha = band * 0.55;
        accCol   += dcol * localAlpha * (1.0 - accAlpha);
        accAlpha += localAlpha * (1.0 - accAlpha);
      }
    }
  }

  vec3 finalColor;
  if (captured) {
    finalColor = accCol;
  } else {
    vec3 bg    = starfield(normalize(dir));
    finalColor = accCol + bg * (1.0 - accAlpha);
  }

  finalColor = finalColor / (finalColor + vec3(1.0));
  finalColor = pow(finalColor, vec3(0.85));

  fragColor = vec4(finalColor, 1.0);
}`;

/* ================================================================== */

export function AICore({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);
  const mode = usePerformanceMode();

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || mode === "static") return;

    const gl = canvas.getContext("webgl2", {
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    /* ---- compile helper ---- */
    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl!.getShaderInfoLog(s));
      }
      return s;
    }

    const vs = compile(gl.VERTEX_SHADER, VERT_SRC);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG_SRC);
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    /* ---- uniform locations ---- */
    const u: Record<string, WebGLUniformLocation | null> = {};
    [
      "u_resolution", "u_time", "u_camPos", "u_camRight",
      "u_camUp", "u_camForward", "u_focal", "u_motion",
    ].forEach((name) => {
      u[name] = gl!.getUniformLocation(program, name);
    });

    /* ---- camera state ---- */
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let theta = 0.9;
    const phi = 1.25;
    const radius = 12.0;
    const autoRotateSpeed = reducedMotion ? 0.0 : 0.028;
    const motionScale = reducedMotion ? 0.25 : 1.0;

    /* ---- resize handling ---- */
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const scale = mode === "reduced" ? 0.5 : 0.75;
      const w = Math.floor(canvas!.clientWidth * dpr * scale);
      const h = Math.floor(canvas!.clientHeight * dpr * scale);
      if (w > 0 && h > 0 && (canvas!.width !== w || canvas!.height !== h)) {
        canvas!.width = w;
        canvas!.height = h;
        gl!.viewport(0, 0, w, h);
      }
    }

    resize();
    const resizeObs = new ResizeObserver(resize);
    resizeObs.observe(canvas);

    /* ---- render loop ---- */
    const startTime = performance.now();

    function draw() {
      const t = (performance.now() - startTime) / 1000;

      theta += autoRotateSpeed * 0.016;

      /* subtle mouse parallax */
      const mx = mouseRef.current.x * 0.3;
      const my = mouseRef.current.y * 0.15;
      const camPhi = phi + my;
      const camTheta = theta + mx;

      const cpSin = Math.sin(camPhi);
      const cpCos = Math.cos(camPhi);
      const ctSin = Math.sin(camTheta);
      const ctCos = Math.cos(camTheta);

      const cx = radius * cpSin * ctCos;
      const cy = radius * cpCos;
      const cz = radius * cpSin * ctSin;

      /* forward = normalize(target - camPos), target = origin */
      const fl = Math.hypot(cx, cy, cz) || 1;
      const fwdX = -cx / fl;
      const fwdY = -cy / fl;
      const fwdZ = -cz / fl;

      /* right = normalize(cross(fwd, worldUp=[0,1,0])) */
      // cross([fx,fy,fz],[0,1,0]) = [fy*0 - fz*1, fz*0 - fx*0, fx*1 - fy*0]
      //                           = [-fz, 0, fx]
      let rxRaw = -fwdZ;
      let ryRaw = 0;
      let rzRaw = fwdX;
      const rl = Math.hypot(rxRaw, ryRaw, rzRaw) || 1;
      const rightX = rxRaw / rl;
      const rightY = ryRaw / rl;
      const rightZ = rzRaw / rl;

      /* up = cross(right, fwd) */
      const upX = rightY * fwdZ - rightZ * fwdY;
      const upY = rightZ * fwdX - rightX * fwdZ;
      const upZ = rightX * fwdY - rightY * fwdX;

      gl!.uniform2f(u.u_resolution, canvas!.width, canvas!.height);
      gl!.uniform1f(u.u_time, t);
      gl!.uniform1f(u.u_motion, motionScale);
      gl!.uniform3f(u.u_camPos, cx, cy, cz);
      gl!.uniform3f(u.u_camRight, rightX, rightY, rightZ);
      gl!.uniform3f(u.u_camUp, upX, upY, upZ);
      gl!.uniform3f(u.u_camForward, fwdX, fwdY, fwdZ);
      gl!.uniform1f(u.u_focal, 1.4);

      gl!.drawArrays(gl!.TRIANGLES, 0, 3);

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    /* ---- cleanup ---- */
    return () => {
      cancelAnimationFrame(animRef.current);
      resizeObs.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteVertexArray(vao);
    };
  }, [mode]);

  /* ---- static fallback ---- */
  if (mode === "static") {
    return (
      <div className={className} aria-hidden="true">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="h-48 w-48 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(255,160,60,0.15) 0%, transparent 70%)",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={className} onMouseMove={handleMouse} aria-hidden="true">
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
