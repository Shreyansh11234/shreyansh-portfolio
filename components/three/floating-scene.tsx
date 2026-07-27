"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Sparkles, Environment } from "@react-three/drei";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";

function Orb({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.18;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.26;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 2]} />
      <meshStandardMaterial color={color} roughness={0.25} metalness={0.65} emissive={color} emissiveIntensity={0.1} />
    </mesh>
  );
}

export function FloatingScene() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 80, damping: 18 });
  const springY = useSpring(my, { stiffness: 80, damping: 18 });

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - rect.left - rect.width / 2) / 18);
        my.set((e.clientY - rect.top - rect.height / 2) / 18);
      }}
      style={{ x: springX, y: springY }}
      className="absolute inset-0"
    >
      <Canvas camera={{ position: [0, 0, 7.4], fov: 42 }} dpr={[1, 1.6]}>
        <fog attach="fog" args={["#050816", 10, 22]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 5, 4]} intensity={2} color="#9bc2ff" />
        <pointLight position={[-3, -2, 2]} intensity={35} color="#8f5cff" />
        <Float speed={1.35} rotationIntensity={1.5} floatIntensity={2.4}>
          <Orb position={[-1.9, 0.5, 0]} scale={1.35} color="#6ca6ff" />
        </Float>
        <Float speed={1.9} rotationIntensity={1.2} floatIntensity={2.1}>
          <Orb position={[1.7, -0.6, 0]} scale={0.92} color="#9962ff" />
        </Float>
        <Float speed={1.3} rotationIntensity={1.1} floatIntensity={1.6}>
          <Orb position={[0.15, 1.55, -0.2]} scale={0.55} color="#ffffff" />
        </Float>
        <Stars radius={50} depth={28} count={2500} factor={4} fade speed={0.6} />
        <Sparkles count={90} scale={[9, 6, 4]} size={2} speed={0.32} color="#78a6ff" />
        <Environment preset="night" />
      </Canvas>
    </motion.div>
  );
}
