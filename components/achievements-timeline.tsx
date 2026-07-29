import { achievements } from "@/data/achievements";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function AchievementsTimeline() {
  return (
    <section id="achievements" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <Badge className="mb-4">Achievements</Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            A timeline of proof.<span className="terminal-cursor" />
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-white/55">
          International results, national recognition, state-level wins, and independent research — all shown as a single narrative.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-[#4fd1ff]/30 via-[#4fd1ff]/10 to-transparent md:left-1/2" />
        <div className="grid gap-6">
          {achievements.map((item, idx) => (
            <div key={item.title} className={`relative grid gap-6 md:grid-cols-2 ${idx % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div className="flex items-center md:justify-end">
                <div className="absolute left-0 h-3 w-3 rounded-full border border-[#4fd1ff]/30 bg-[#4fd1ff] shadow-[0_0_8px_rgba(79,209,255,0.4)] md:left-1/2 md:-translate-x-1/2" />
                <div className="ml-10 md:ml-0 md:max-w-md md:text-right">
                  <p className="text-xs uppercase tracking-[0.4em] text-[#4fd1ff]/50">{item.year} • {item.level}</p>
                  <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/65">{item.description}</p>
                </div>
              </div>

              <Card className="md:max-w-md">
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-white">Award</p>
                    <Badge>{item.award}</Badge>
                  </div>
                  <p className="text-sm leading-7 text-white/62">{item.impact}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
