"use client";

import { motion } from "framer-motion";
import { showcaseProjects } from "@/data/projects-showcase";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Github } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Badge className="mb-4">Projects</Badge>
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Builds that speak louder than words.<span className="terminal-cursor" />
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">
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
      >
        {showcaseProjects.map((project) => (
          <motion.div key={project.title} variants={item}>
            <Card className="group h-full">
              <CardContent className="flex h-full flex-col p-6">
                <div className="flex-1 space-y-4">
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  <p className="text-sm leading-7 text-white/60">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <Badge key={t} className="border-white/12 bg-white/[0.04] text-white/75">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex gap-3 pt-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm text-white/75 transition hover:bg-white/8"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm text-white/75 transition hover:bg-white/8"
                      aria-label={`View live demo of ${project.title}`}
                    >
                      Live Demo <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
