"use client";

import { motion } from "framer-motion";
import { showcaseProjects } from "@/data/projects-showcase";
import { Badge } from "@/components/ui/badge";
import { ProjectCard3D } from "@/components/project-card-3d";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

export function ProjectsSection() {
  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.3em] text-cyan/50">
        Sector · Project Worlds
      </div>
      <Badge className="mb-4">Projects</Badge>
      <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="font-space text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl">
            Floating Worlds
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">
            Each project represents a real outcome — from robotics hardware to research papers to production web apps.
          </p>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        style={{ perspective: 1200 }}
      >
        {showcaseProjects.map((project) => (
          <motion.div key={project.title} variants={item} className="h-full">
            <ProjectCard3D project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
