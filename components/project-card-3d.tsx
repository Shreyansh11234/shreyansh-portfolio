"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Github } from "lucide-react";
import type { ShowcaseProject } from "@/data/projects-showcase";

export function ProjectCard3D({ project }: { project: ShowcaseProject }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      whileHover={{ z: 20 }}
      className="group relative h-full"
      data-cursor="view"
    >
      <div
        className={`relative flex h-full flex-col overflow-hidden rounded-3xl border backdrop-blur-xl transition-all duration-500 ${
          hovered
            ? "border-cyan/25 bg-white/[0.06] shadow-[0_20px_60px_rgba(255,160,60,0.12)]"
            : "border-white/8 bg-white/[0.03]"
        }`}
      >
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,160,60,0.08), transparent 60%)"
          }}
        />

        <div className="relative flex flex-1 flex-col p-6">
          <div className="mb-4 flex items-start justify-between gap-3">
            <h3 className="font-space text-lg font-semibold text-white">{project.title}</h3>
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition ${
                hovered ? "border-cyan/40 bg-cyan/10" : "border-white/10 bg-white/5"
              }`}
            >
              <ArrowUpRight className={`h-4 w-4 transition ${hovered ? "text-cyan" : "text-white/40"}`} />
            </div>
          </div>

          <p className="flex-1 text-sm leading-7 text-white/55">{project.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Badge key={t} className="border-white/10 bg-white/[0.04] text-white/65">
                {t}
              </Badge>
            ))}
          </div>

          <div className="mt-6 flex gap-3 border-t border-white/6 pt-5">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-cyan/30 hover:bg-white/5"
              data-cursor="link"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-cyan/30 hover:bg-white/5"
                data-cursor="link"
              >
                Live Demo <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>

        <div
          className={`absolute -bottom-20 -right-20 h-40 w-40 rounded-full blur-3xl transition-opacity duration-500 ${
            hovered ? "opacity-30" : "opacity-0"
          }`}
          style={{ background: "rgba(255, 160, 60, 0.15)" }}
        />
      </div>
    </motion.div>
  );
}
