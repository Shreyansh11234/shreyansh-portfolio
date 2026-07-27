import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Orbit, Atom, Telescope, BlackHole } from "lucide-react";

const interests = [
  { icon: Telescope, title: "Astronomy", desc: "A lifelong fascination with stars, galaxies, and observation." },
  { icon: BlackHole, title: "Cosmology", desc: "Big-picture questions about the origin and structure of reality." },
  { icon: Orbit, title: "Space Exploration", desc: "Where engineering becomes a way to reach beyond Earth." },
  { icon: Atom, title: "Quantum Thinking", desc: "A deep interest in the rules that bend intuition." }
];

export function BeyondEngineering() {
  return (
    <section id="beyond-engineering" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(96,141,255,.22),transparent_25%),radial-gradient(circle_at_90%_20%,rgba(151,92,255,.18),transparent_28%),rgba(255,255,255,.03)] p-8 backdrop-blur-xl">
        <Badge className="mb-4">Beyond Engineering</Badge>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">An elegant space for the things that keep me awake at night.</h2>
            <p className="mt-5 text-sm leading-7 text-white/65">
              This section turns astronomy and cosmology into a visual identity, because those interests are not side notes —
              they are part of the portfolio's core personality.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {interests.map((item) => (
              <Card key={item.title} className="border-white/10 bg-white/[0.04]">
                <CardContent className="p-5">
                  <item.icon className="h-5 w-5 text-[#8ab0ff]" />
                  <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/60">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
