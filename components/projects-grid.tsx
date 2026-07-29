"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Github } from "lucide-react";

export function ProjectsGrid() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Badge className="mb-4">Projects</Badge>
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Projects that speak for themselves.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">
            Each project is a self-contained story — the idea, the build, the outcome.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="group h-full">
              <CardContent className="flex h-full flex-col p-6">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">{project.description}</p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <Badge key={t} className="border-white/12 bg-white/[0.04] text-white/75">
                      {t}
                    </Badge>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm text-white/75 transition hover:bg-white/8 hover:border-[#ffa550]/30"
                  >
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm text-white/75 transition hover:bg-white/8 hover:border-[#ffa550]/30"
                    >
                      Live Demo <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
