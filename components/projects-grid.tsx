import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Github, MonitorSmartphone } from "lucide-react";

export function ProjectsGrid() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Badge className="mb-4">Projects</Badge>
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Launch each project like a product.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">
            Each project is framed with problem, solution, outcome, and the technical stack behind it.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.name} className="group overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-52 overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(101,149,255,.25),transparent_38%),linear-gradient(135deg,rgba(255,255,255,.04),rgba(255,255,255,.01))]">
                <div className="absolute inset-0 bg-stars opacity-30" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/35">{project.type}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{project.name}</h3>
                  </div>
                  <MonitorSmartphone className="h-7 w-7 text-white/70 transition group-hover:scale-110" />
                </div>
              </div>

              <div className="space-y-4 p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/35">Problem</p>
                  <p className="mt-2 text-sm leading-7 text-white/65">{project.problem}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/35">Solution</p>
                  <p className="mt-2 text-sm leading-7 text-white/65">{project.solution}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/35">Outcome</p>
                  <p className="mt-2 text-sm leading-7 text-white/65">{project.outcome}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((stack) => (
                    <Badge key={stack}>{stack}</Badge>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  <a className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm text-white/75 transition hover:bg-white/8" href={project.github ?? "#"} target="_blank" rel="noreferrer">
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                  <a className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm text-white/75 transition hover:bg-white/8" href={project.live ?? "#"} target="_blank" rel="noreferrer">
                    Live Demo <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
