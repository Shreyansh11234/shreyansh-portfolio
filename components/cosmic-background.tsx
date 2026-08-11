"use client";

import { useRef, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "@/lib/scroll-context";
import { usePerformanceMode } from "@/lib/use-performance-mode";

function NebulaLayer() {
  const scrollProgress = useScrollProgress();
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshBasicMaterial;
      ref.current.rotation.z = scrollProgress * 0.3;
      mat.opacity = 0.08 + scrollProgress * 0.04;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, -40]}>
      <planeGeometry args={[120, 120]} />
      <meshBasicMaterial
        color="#7a2a3d"
        transparent
        opacity={0.08}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function DeepStars({
  mouse,
  count
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  count: number;
}) {
  const ref = useRef<THREE.Points>(null!);
  const scrollProgress = useScrollProgress();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 300;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 300;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 200 - 50;
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.006;
      ref.current.rotation.x += (mouse.current.y * 0.00008 - ref.current.rotation.x) * 0.02;
      ref.current.position.z = scrollProgress * 15;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.35}
        color="#ffe6d8"
        transparent
        opacity={0.55}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function DistantGlows() {
  const scrollProgress = useScrollProgress();
  const group = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.002;
      group.current.position.z = scrollProgress * 8;
    }
  });

  const glows = useMemo(
    () =>
      Array.from({ length: 5 }, () => ({
        x: (Math.random() - 0.5) * 80,
        y: (Math.random() - 0.5) * 60,
        z: -60 - Math.random() * 40,
        color: Math.random() > 0.5 ? "#ffa040" : "#a63050",
        size: 8 + Math.random() * 12
      })),
    []
  );

  return (
    <group ref={group}>
      {glows.map((g, i) => (
        <mesh key={i} position={[g.x, g.y, g.z]}>
          <sphereGeometry args={[g.size, 16, 16]} />
          <meshBasicMaterial color={g.color} transparent opacity={0.03} />
        </mesh>
      ))}
    </group>
  );
}

function NeuralLinks({ visible }: { visible: boolean }) {
  const count = visible ? 40 : 0;
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
      ref.current.rotation.y += delta * 0.004;
    }
  });

  if (count === 0) return null;

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[allPos, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#d47f5a" transparent opacity={0.035} />
    </lineSegments>
  );
}

function CosmicCanvas({
  mode,
  mouse
}: {
  mode: string;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  return (
    <Canvas
      dpr={[1, mode === "full" ? 1.5 : 1]}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 80], fov: 60 }}
      style={{ opacity: mode === "static" ? 0.25 : 0.55 }}
    >
      <DeepStars mouse={mouse} count={mode === "full" ? 2000 : 700} />
      <NeuralLinks visible={mode === "full"} />
      <DistantGlows />
      {mode === "full" && <NebulaLayer />}
    </Canvas>
  );
}

export function CosmicBackground() {
  const mouse = useRef({ x: 0, y: 0 });
  const mode = usePerformanceMode();

  const handleMouse = useCallback((e: MouseEvent) => {
    mouse.current = {
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2
    };
  }, []);

  useEffect(() => {
    if (mode === "static") return;
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [handleMouse, mode]);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, rgba(255, 140, 50, 0.05) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(180, 60, 100, 0.03) 0%, transparent 45%), radial-gradient(ellipse at 50% 50%, #130906 0%, #050302 100%)"
      }}
    >
      <CosmicCanvas mode={mode} mouse={mouse} />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(255, 160, 60, 0.03) 0%, transparent 60%)"
        }}
      />
    </div>
  );
}
