"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePerformanceMode } from "@/lib/use-performance-mode";

function NetworkGraph({ nodeCount }: { nodeCount: number }) {
  const group = useRef<THREE.Group>(null!);

  const { nodes, linePositions } = useMemo(() => {
    const nodeList: THREE.Vector3[] = [];
    const cols = Math.ceil(Math.sqrt(nodeCount));
    for (let i = 0; i < nodeCount; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      nodeList.push(
        new THREE.Vector3(
          (col - cols / 2) * 1.8 + (Math.random() - 0.5) * 0.5,
          (row - cols / 2) * 1.2 + (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 2
        )
      );
    }

    const lines: number[] = [];
    for (let i = 0; i < nodeList.length; i++) {
      for (let j = i + 1; j < nodeList.length; j++) {
        if (nodeList[i].distanceTo(nodeList[j]) < 2.8) {
          lines.push(
            nodeList[i].x, nodeList[i].y, nodeList[i].z,
            nodeList[j].x, nodeList[j].y, nodeList[j].z
          );
        }
      }
    }
    return { nodes: nodeList, linePositions: new Float32Array(lines) };
  }, [nodeCount]);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.15;
    }
  });

  return (
    <group ref={group}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#6b8cff" transparent opacity={0.6} />
        </mesh>
      ))}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#ffa040" transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
}

function FlowParticles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#ffb86c" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export function NeuralNetworkScene({ className }: { className?: string }) {
  const mode = usePerformanceMode();

  if (mode === "static") return null;

  const nodeCount = mode === "full" ? 20 : 12;
  const particleCount = mode === "full" ? 80 : 30;

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={[1, 1]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        camera={{ position: [0, 0, 8], fov: 50 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <NetworkGraph nodeCount={nodeCount} />
          <FlowParticles count={particleCount} />
        </Suspense>
      </Canvas>
    </div>
  );
}
