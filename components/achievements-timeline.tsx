"use client";

import { motion } from "framer-motion";
import { achievements } from "@/data/achievements";
import { Badge } from "@/components/ui/badge";

export function AchievementsTimeline() {
  return (
    <section id="achievements" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.3em] text-cyan/50">
            Archive · Milestones
          </div>
          <Badge className="mb-4">Achievements</Badge>
          <h2 className="font-space text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl">
            Proof of Trajectory
          </h2>
        </div>
        <p className="max-w-md text-sm leading-7 text-white/50">
          International results, national recognition, state-level wins, and independent research — all shown as a single narrative.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-cyan/30 via-purple/15 to-transparent md:left-1/2" />

        <div className="space-y-10">
          {achievements.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: idx * 0.06 }}
              className={`relative grid gap-6 md:grid-cols-2 ${
                idx % 2 ? "md:[&>*:first-child]:order-2 md:[&>*:first-child]:text-right" : ""
              }`}
            >
              <div className="relative flex items-center md:justify-end">
                <div className="absolute left-0 h-3 w-3 rounded-full border border-cyan/40 bg-cyan shadow-[0_0_10px_rgba(255,160,60,0.4)] md:left-1/2 md:-translate-x-1/2" />
                <div className="ml-10 md:ml-0 md:max-w-md">
                  <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-cyan/45">
                    {item.year} · {item.level}
                  </p>
                  <h3 className="mt-3 font-space text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/60">{item.description}</p>
                </div>
              </div>

              <div className="glass-panel ml-10 rounded-2xl p-5 md:ml-0 md:max-w-md">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-white">Award</p>
                  <Badge>{item.award}</Badge>
                </div>
                <p className="mt-3 text-sm leading-7 text-white/55">{item.impact}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
