import { skillGroups } from "@/data/skills";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function SkillsGrid() {
  return (
    <section id="skills" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Badge className="mb-4">Skills</Badge>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        No progress bars. Just intelligent skill architecture.<span className="terminal-cursor" />
      </h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group) => (
          <Card key={group.label}>
            <CardContent className="p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-[#4fd1ff]/60 font-mono">{group.label}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Badge key={item} className="border-white/12 bg-white/[0.04] text-white/75">
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
