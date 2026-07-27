import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const experiences = [
  {
    title: "President, Science & Technology Club",
    period: "Current",
    text: "Leading technical culture and strengthening the bridge between ideas, builds, and competition work."
  },
  {
    title: "Robotics Competition Lead",
    period: "Multiple Events",
    text: "Directed strategy, hardware decisions, and embedded systems under live pressure."
  },
  {
    title: "Independent Researcher",
    period: "Ongoing",
    text: "Working on the Emergent Time Hypothesis as a self-driven physics initiative."
  }
];

export function ExperienceTimeline() {
  return (
    <section id="experience" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Badge className="mb-4">Experience</Badge>
      <div className="grid gap-4 md:grid-cols-3">
        {experiences.map((item) => (
          <Card key={item.title}>
            <CardContent className="p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-white/35">{item.period}</p>
              <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-white/60">{item.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
