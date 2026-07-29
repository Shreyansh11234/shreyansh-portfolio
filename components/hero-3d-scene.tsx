"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const NODE_DEFS = [
  { name: "Robotics", color: 0x6ee7c9, cls: "teal", section: "#robotics" },
  { name: "AI", color: 0xb79bff, cls: "purple", section: "#skills" },
  { name: "Physics", color: 0xffb454, cls: "amber", section: "#eth" },
  { name: "Code", color: 0xff8a7a, cls: "coral", section: "#github" },
] as const;

export function Hero3DScene() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const labelsRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const container = containerRef.current;
    const labelsEl = labelsRef.current;
    if (!container || !labelsEl) return;

    const W = container.clientWidth;
    const H = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 1000);
    camera.position.set(0, 0, 26);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Starfield
    const starCount = 1400;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 200;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 200;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 200 - 20;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.4, transparent: true, opacity: 0.7 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Core planet
    const coreGeo = new THREE.IcosahedronGeometry(5, 1);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x0d1b2e, transparent: true, opacity: 0.9 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Wireframe overlay
    const wireGeo = new THREE.IcosahedronGeometry(5.05, 1);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x4fd1ff, wireframe: true, transparent: true, opacity: 0.35 });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wire);

    // Orbit ring
    const ringGeo = new THREE.RingGeometry(11.9, 12, 128);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x4fd1ff, transparent: true, opacity: 0.12, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.4;
    scene.add(ring);

    // Orbiting nodes
    type NodeObj = {
      mesh: THREE.Mesh;
      glow: THREE.Mesh;
      label: HTMLDivElement;
      angle: number;
      radius: number;
      section: string;
    };

    const nodes: NodeObj[] = [];
    const R = 12;

    NODE_DEFS.forEach((def, i) => {
      const angle = (i / NODE_DEFS.length) * Math.PI * 2;
      const geo = new THREE.SphereGeometry(0.9, 24, 24);
      const mat = new THREE.MeshBasicMaterial({ color: def.color });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);

      const glowGeo = new THREE.SphereGeometry(1.4, 24, 24);
      const glowMat = new THREE.MeshBasicMaterial({ color: def.color, transparent: true, opacity: 0.15 });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      mesh.add(glow);

      const label = document.createElement("div");
      label.className = `node-label ${def.cls}`;
      label.textContent = def.name;
      label.onclick = () => {
        const el = document.querySelector(def.section);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      };
      labelsRef.current.appendChild(label);

      nodes.push({ mesh, glow, label, angle, radius: R, section: def.section });
    });

    // Neural link lines
    const linkLines = nodes.map(() => {
      const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
      const lineMat = new THREE.LineBasicMaterial({ color: 0x4fd1ff, transparent: true, opacity: 0.18 });
      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);
      return line;
    });

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    const handleMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse);

    // Project 3D to 2D screen
    function project(pos: THREE.Vector3) {
      const v = pos.clone().project(camera);
      return {
        x: (v.x * 0.5 + 0.5) * container.clientWidth,
        y: (-v.y * 0.5 + 0.5) * container.clientHeight,
      };
    }

    // Animation loop
    let t = 0;
    let animId = 0;

    function animate() {
      animId = requestAnimationFrame(animate);
      t += 0.01;

      core.rotation.y += 0.0025;
      wire.rotation.y += 0.0025;
      wire.rotation.x += 0.0008;
      stars.rotation.y += 0.00015;

      nodes.forEach((n, i) => {
        const a = n.angle + t * 0.25;
        const x = Math.cos(a) * n.radius;
        const z = Math.sin(a) * n.radius * 0.4;
        const y = Math.sin(a * 0.7) * 1.5;
        n.mesh.position.set(x, y, z);

        linkLines[i].geometry.setFromPoints([new THREE.Vector3(0, 0, 0), n.mesh.position.clone()]);
        linkLines[i].geometry.attributes.position.needsUpdate = true;

        const screen = project(n.mesh.position);
        n.label.style.left = screen.x + "px";
        n.label.style.top = screen.y + "px";
        n.label.style.opacity = n.mesh.position.z < -2 ? "0.25" : "1";
      });

      camera.position.x += (mouseX * 3 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      // Remove labels
      nodes.forEach((n) => {
        if (labelsEl.contains(n.label)) {
          labelsEl.removeChild(n.label);
        }
      });
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />
      <div
        ref={labelsRef}
        className="absolute inset-0 z-10 pointer-events-none"
        aria-hidden="true"
      />
      <style>{`
        .node-label {
          position: absolute;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          font-weight: 500;
          color: #f4f6fb;
          background: rgba(10, 14, 24, 0.55);
          border: 0.5px solid rgba(255,255,255,0.12);
          padding: 6px 14px;
          border-radius: 20px;
          pointer-events: auto;
          cursor: pointer;
          transform: translate(-50%, -50%);
          transition: border-color 0.2s, background 0.2s;
          backdrop-filter: blur(4px);
          white-space: nowrap;
          user-select: none;
        }
        .node-label:hover {
          border-color: rgba(255,255,255,0.35);
          background: rgba(20, 26, 40, 0.75);
        }
        .node-label.teal { color: #6ee7c9; }
        .node-label.purple { color: #b79bff; }
        .node-label.amber { color: #ffb454; }
        .node-label.coral { color: #ff8a7a; }
      `}</style>
    </>
  );
}

export function Hero3DSceneMobile() {
  return null;
}
