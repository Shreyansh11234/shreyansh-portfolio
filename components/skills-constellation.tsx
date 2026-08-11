"use client";

import { useRef, useMemo, useState, Suspense, useCallback } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { skillGroups } from "@/data/skills";
import { Badge } from "@/components/ui/badge";
import { usePerformanceMode } from "@/lib/use-performance-mode";
import { useScrollProgress } from "@/lib/scroll-context";

type SkillNode = {
  id: string;
  label: string;
  group: string;
  position: THREE.Vector3;
  color: string;
};

const GROUP_COLORS: Record<string, string> = {
  AI: "#ffb86c",
  Robotics: "#e7a95e",
  Programming: "#ffa040",
  "Embedded Systems": "#ff8a3c",
  Physics: "#ff8a7a",
  "Web Development": "#ffc880",
  Tools: "#c4a882"
};

function buildSkillNodes(): SkillNode[] {
  const nodes: SkillNode[] = [];
  const groups = skillGroups.length;
  skillGroups.forEach((group, gi) => {
    const angle = (gi / groups) * Math.PI * 2;
    const radius = 3.5;
    nodes.push({
      id: group.label,
      label: group.label,
      group: group.label,
      position: new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.6,
        (Math.random() - 0.5) * 1.5
      ),
      color: GROUP_COLORS[group.label] ?? "#ffa040"
    });
  });
  return nodes;
}

function ConstellationMesh({
  nodes,
  hovered,
  onHover
}: {
  nodes: SkillNode[];
  hovered: string | null;
  onHover: (id: string | null) => void;
}) {
  const group = useRef<THREE.Group>(null!);
  const scrollProgress = useScrollProgress();

  const lines = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        positions.push(
          nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
          nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
        );
      }
    }
    return new Float32Array(positions);
  }, [nodes]);

  const textures = useLoader(THREE.TextureLoader, [
    "/images/skills/skill_1.png",
    "/images/skills/skill_2.png",
    "/images/skills/skill_3.png",
    "/images/skills/skill_4.png",
    "/images/skills/skill_5.png",
    "/images/skills/skill_6.png",
  ]);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.08 + scrollProgress * 0.5;
      group.current.position.z = scrollProgress * 2;
    }
  });

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#ffa040"
          transparent
          opacity={hovered ? 0.25 : 0.1}
        />
      </lineSegments>
      {nodes.map((node, index) => {
        const isHovered = hovered === node.id;
        const texture = textures[index % textures.length];
        return (
          <sprite
            key={node.id}
            position={node.position}
            onPointerOver={() => onHover(node.id)}
            onPointerOut={() => onHover(null)}
            scale={isHovered ? [1.5, 1.5, 1.5] : [0.8, 0.8, 0.8]}
          >
            <spriteMaterial
              map={texture}
              color={node.color}
              transparent
              opacity={hovered && !isHovered ? 0.2 : 0.9}
            />
          </sprite>
        );
      })}
    </group>
  );
}

function ConstellationCanvas({
  nodes,
  hovered,
  onHover
}: {
  nodes: SkillNode[];
  hovered: string | null;
  onHover: (id: string | null) => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.25]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 7], fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={1} />
      <ConstellationMesh nodes={nodes} hovered={hovered} onHover={onHover} />
    </Canvas>
  );
}

export function SkillsConstellation() {
  const mode = usePerformanceMode();
  const nodes = useMemo(() => buildSkillNodes(), []);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const activeGroup = skillGroups.find((g) => g.label === (selected ?? hovered));

  const handleSelect = useCallback((id: string) => {
    setSelected((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section id="skills" className="relative overflow-hidden mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img src="/images/circuit_bg.png" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-[0.07]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050302]/80 via-transparent to-[#050302]/80" />
      </div>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.3em] text-cyan/50">
        System · Skill Matrix
      </div>
      <Badge className="mb-4">Skills</Badge>
      <h2 className="font-space text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl">
        AI Constellation
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">
        Each node represents a domain of expertise. Hover to illuminate connections, click to explore.
      </p>

      {mode === "static" || mode === "reduced" ? (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <button
              key={group.label}
              type="button"
              onClick={() => handleSelect(group.label)}
              className={`rounded-2xl border p-5 text-left backdrop-blur-xl transition ${
                selected === group.label
                  ? "border-cyan/40 bg-cyan/10"
                  : "border-white/8 bg-white/[0.03] hover:border-white/15"
              }`}
            >
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan/60">{group.label}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Badge key={item} className="border-white/10 bg-white/[0.04] text-white/70">
                    {item}
                  </Badge>
                ))}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative h-[420px] overflow-hidden rounded-3xl border border-white/8 bg-black/20">
            <Suspense fallback={null}>
              <ConstellationCanvas
                nodes={nodes}
                hovered={hovered}
                onHover={setHovered}
              />
            </Suspense>
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
              {nodes.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => handleSelect(n.id)}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`rounded-full px-3 py-1 font-mono text-[11px] transition ${
                    selected === n.id || hovered === n.id
                      ? "bg-white/10 text-white"
                      : "text-white/40 hover:text-white/70"
                  }`}
                  style={{ color: hovered === n.id ? n.color : undefined }}
                >
                  {n.label}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel flex flex-col justify-center rounded-3xl p-6">
            {activeGroup ? (
              <>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan/50">
                  Node Active
                </p>
                <h3 className="mt-2 font-space text-2xl font-semibold text-white">{activeGroup.label}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {activeGroup.items.map((item) => (
                    <Badge key={item} className="border-white/12 bg-white/[0.05] text-white/75">
                      {item}
                    </Badge>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan/50">
                  Awaiting Input
                </p>
                <p className="mt-3 text-sm leading-7 text-white/50">
                  Hover over a constellation node or select a domain to view its skill architecture.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
