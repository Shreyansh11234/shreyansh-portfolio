import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock } from "lucide-react";

const items = [
  { title: "Research Overview", text: "Original investigation into the nature of time through mathematical reasoning and physics literature review." },
  { title: "Motivation", text: "A desire to work through an unresolved question instead of only reading about it." },
  { title: "Core Questions", text: "What is time? Is it emergent? Can a consistent mathematical model be built?" },
  { title: "Current Progress", text: "Reading, comparing literature, and building the proof structure in parallel." },
  { title: "Future Publication", text: "Planned as a formal research paper after the draft reaches a stable shape." }
];

export function ETHResearch() {
  return (
    <section id="eth" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <div className="space-y-6">
          <Badge>Emergent Time Hypothesis</Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            A research-grade section for an original theory.<span className="terminal-cursor" />
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-white/65">
            The portfolio should treat ETH like a real investigation: evolving notes, milestones, mathematical development,
            and a publication path that respects scientific discipline.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <Card key={item.title}>
                <CardContent className="p-5">
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/60">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-[#ffa040]/50 font-mono">Research Lab</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">ETH Progress Map</h3>
              </div>
              <Clock className="h-5 w-5 text-[#ffb454]" />
            </div>

            <div className="mt-6 space-y-4">
              {[
                ["Literature Review", "In progress"],
                ["Mathematical Model", "Building"],
                ["Proof Structure", "Expanding"],
                ["Draft Paper", "Not yet submitted"],
                ["Peer Review Prep", "Future stage"]
              ].map(([a, b], index) => (
                <div key={a} className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ffa040]/10 bg-[#ffa040]/8 text-sm text-[#ffa040]/70">
                    {index + 1}
                  </div>
                  <div className="flex-1 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3">
                    <p className="text-sm font-medium text-white">{a}</p>
                    <p className="text-xs text-white/45">{b}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-dashed border-[#ffa040]/10 bg-white/[0.02] p-5">
              <p className="text-sm font-medium text-white">Research notes</p>
              <p className="mt-2 text-sm leading-7 text-white/60">
                Keep a written record of observations, equations, diagrams, open questions, and revisions.
              </p>
            </div>

            <Link href="/research" className="mt-6 inline-flex items-center gap-2 text-sm text-[#ffb454] hover:text-[#ffc877]">
              Open full research page <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
