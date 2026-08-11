"use client";

import { useEffect, useRef, useMemo, useCallback, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function usePerformanceMode() {
  const [mode, setMode] = useState<"full" | "reduced" | "static">("full");
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const lowPower = (navigator as any).hardwareConcurrency !== undefined && (navigator as any).hardwareConcurrency <= 4;
    if (reduced) setMode("static");
    else if (isMobile && lowPower) setMode("reduced");
    else if (isMobile) setMode("reduced");
    else setMode("full");
  }, []);
  return mode;
}

function Stars({ mouse, count }: { mouse: React.MutableRefObject<{ x: number; y: number }>; count: number }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      const r = 50 + Math.random() * 150;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i] = r * Math.sin(phi) * Math.cos(theta);
      pos[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  const ref = useRef<THREE.Points>(null!);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.008;
      ref.current.rotation.x += delta * 0.003;
      ref.current.rotation.x += (mouse.current.y * 0.0001 - ref.current.rotation.x) * 0.01;
      ref.current.rotation.y += (mouse.current.x * 0.0001 - ref.current.rotation.y) * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.35}
        transparent
        opacity={0.6}
        color="#ffe6d8"
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function NeuralLinks({ visible }: { visible: boolean }) {
  const count = visible ? 60 : 0;
  const allPos = useMemo(() => {
    if (count === 0) return new Float32Array(0);
    const pos = new Float32Array(count * 6);
    for (let i = 0; i < count; i++) {
      const r1 = 30 + Math.random() * 100;
      const t1 = Math.random() * Math.PI * 2;
      const p1 = Math.acos(2 * Math.random() - 1);
      const r2 = 20 + Math.random() * 80;
      const t2 = Math.random() * Math.PI * 2;
      const p2 = Math.acos(2 * Math.random() - 1);
      pos[i * 6] = r1 * Math.sin(p1) * Math.cos(t1);
      pos[i * 6 + 1] = r1 * Math.sin(p1) * Math.sin(t1);
      pos[i * 6 + 2] = r1 * Math.cos(p1);
      pos[i * 6 + 3] = r2 * Math.sin(p2) * Math.cos(t2);
      pos[i * 6 + 4] = r2 * Math.sin(p2) * Math.sin(t2);
      pos[i * 6 + 5] = r2 * Math.cos(p2);
    }
    return pos;
  }, [count]);

  const ref = useRef<THREE.LineSegments>(null!);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.005;
      ref.current.rotation.x += delta * 0.002;
    }
  });

  if (count === 0) return null;

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[allPos, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#ffa040" transparent opacity={0.04} />
    </lineSegments>
  );
}

function CameraController() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.z = 80;
  }, [camera]);
  return null;
}

function StarfieldCanvas({ mode, mouse }: { mode: string; mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  return (
    <Canvas
      dpr={[1, mode === "full" ? 1.5 : 1]}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 80], fov: 60 }}
      style={{ opacity: mode === "static" ? 0.3 : 0.5 }}
    >
      <CameraController />
      <Stars mouse={mouse} count={mode === "full" ? 1800 : 600} />
      <NeuralLinks visible={mode === "full"} />
    </Canvas>
  );
}

export function StarfieldBackground() {
  const mouse = useRef({ x: 0, y: 0 });
  const mode = usePerformanceMode();

  const handleMouse = useCallback((e: MouseEvent) => {
    mouse.current = {
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    };
  }, []);

  useEffect(() => {
    if (mode === "static") return;
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [handleMouse, mode]);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{ background: "radial-gradient(ellipse at 50% 50%, #130906 0%, #050302 100%)" }}
    >
      <StarfieldCanvas mode={mode} mouse={mouse} />
    </div>
  );
}
