"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const milestones = [
  {
    year: "Class IX",
    text: "Started showing a strong jump in academic growth and a deeper pull toward physics, engineering, and technical creativity."
  },
  {
    year: "Class X",
    text: "Improved to 90%, proving consistency and the ability to scale performance across demanding priorities."
  },
  {
    year: "Now",
    text: "Building in robotics, AI, web development, and independent physics research while preparing seriously for JEE."
  }
];

export function AboutStory() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Badge className="mb-4">Story</Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            A documentary-style introduction.<span className="terminal-cursor" />
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65">
            I am not trying to look like a generic developer. This portfolio is built to show a rare mix of robotics,
            original research, software engineering, and a real obsession with the universe.
          </p>
        </div>

        <div className="grid gap-4">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08 }}
              className="rounded-3xl border border-white/8 bg-white/[0.03] p-5 backdrop-blur-xl hud-corner"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-[#4fd1ff]/60">{m.year}</p>
              <p className="mt-3 text-base leading-7 text-white/75">{m.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
