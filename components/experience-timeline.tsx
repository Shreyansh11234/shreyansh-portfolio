"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

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
    <section id="experience" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.3em] text-cyan/50">
        Trajectory · Mission Log
      </div>
      <Badge className="mb-4">Experience</Badge>
      <h2 className="font-space text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl">
        Orbital Timeline
      </h2>

      <div className="relative mt-12">
        <div className="absolute left-6 top-0 hidden h-full w-px md:left-1/2 md:block">
          <div className="h-full w-full bg-gradient-to-b from-cyan/40 via-purple/20 to-transparent" />
        </div>

        <div className="space-y-8">
          {experiences.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: idx * 0.12 }}
              className={`relative grid gap-6 md:grid-cols-2 ${
                idx % 2 === 1 ? "md:[&>*:first-child]:order-2 md:[&>*:first-child]:text-right" : ""
              }`}
            >
              <div className="hidden md:block" />

              <div className="relative md:max-w-md">
                <div className="absolute -left-[1.65rem] top-6 hidden h-3 w-3 rounded-full border-2 border-cyan/50 bg-cyan/30 shadow-[0_0_12px_rgba(255,160,60,0.5)] md:left-auto md:right-auto md:top-8 md:-translate-x-1/2 md:translate-y-0 md:mx-auto md:block md:left-1/2" />

                <div className="glass-panel ml-10 rounded-2xl p-6 md:ml-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-cyan/50">{item.period}</p>
                  <h3 className="mt-3 font-space text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/55">{item.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
