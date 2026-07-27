import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const cards = [
  ["Competition Timeline", "A clean narrative of events, categories, and outcomes."],
  ["Build Logs", "Photos, CAD renders, circuit diagrams, and hardware notes."],
  ["Strategic Thinking", "How robot decisions were made under pressure."],
  ["Awards", "International, national, state, and interschool recognition."]
];

export function RoboticsShowcase() {
  return (
    <section id="robotics" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Badge className="mb-4">Robotics</Badge>
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Robotics as a competition identity.</h2>
          <p className="mt-5 text-sm leading-7 text-white/65">
            This section should feel like a professional engineering showcase rather than a gallery of trophies.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map(([title, text]) => (
            <Card key={title}>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/60">{text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
