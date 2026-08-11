"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Badge } from "@/components/ui/badge";

const NeuralNetworkScene = dynamic(
  () => import("@/components/neural-network-scene").then((m) => m.NeuralNetworkScene),
  { ssr: false }
);

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
    <section id="about" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <NeuralNetworkScene className="absolute inset-0 -z-10 opacity-40" />

      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="glass-panel rounded-3xl p-8">
          <div className="mb-6 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan/50">
            <span>System</span>
            <span className="text-white/20">·</span>
            <span>Profile</span>
            <span className="ml-auto flex items-center gap-1.5 text-emerald-400/80">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active
            </span>
          </div>

          <Badge className="mb-4">About</Badge>
          <h2 className="font-space text-3xl font-semibold uppercase tracking-tight text-white sm:text-4xl">
            Neural Profile
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">
            I am not trying to look like a generic developer. This portfolio is built to show a rare mix of robotics,
            original research, software engineering, and a real obsession with the universe.
          </p>
          <p className="mt-4 font-mono text-xs text-white/35">
            {">"} Class XI Student · JEE Aspirant · India
          </p>
        </div>

        <div className="grid gap-4">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="glass-panel rounded-2xl p-5 hover:border-cyan/30 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-cyan/50">{m.year}</p>
              <p className="mt-3 text-sm leading-7 text-white/70">{m.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
