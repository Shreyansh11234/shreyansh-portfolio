"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FloatingScene } from "@/components/three/floating-scene";
import { TypingHeadline } from "@/components/typing-headline";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-16 sm:pt-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(72,124,255,0.18),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(148,84,255,0.12),transparent_25%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent)]" />
      <div className="absolute inset-0 -z-10 bg-[url('/nebula.svg')] bg-cover bg-center opacity-45 mix-blend-screen" />
      <div className="mx-auto grid max-w-7xl gap-14 px-4 pb-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:pb-28">
        <div className="relative z-10 flex flex-col justify-center">
          <Badge className="mb-6 w-fit border-white/15 bg-white/[0.06] text-white/70">
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            Built for MIT / Stanford level signal
          </Badge>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            <span className="block text-white/70">Shreyansh Kumar Rao</span>
            <TypingHeadline />
          </motion.h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/66 sm:text-lg">
            Class XI student, JEE aspirant, robotics competitor, AI builder, and independent physics researcher
            shaping one identity around engineering, astronomy, and original scientific inquiry.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#eth"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-black transition hover:translate-y-[-1px] hover:shadow-[0_0_35px_rgba(80,140,255,.22)]"
            >
              View Research
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/resume/Shreyansh_Portfolio_v2.docx"
              download
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-5 text-sm font-medium text-white transition hover:bg-white/[0.08]"
            >
              Download Resume
              <Download className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Top 4", "Globally at Technoxian"],
              ["MANAK", "National recognition"],
              ["ETH", "Active research"],
              ["Next.js", "Production builds"]
            ].map(([a, b]) => (
              <motion.div
                key={a}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl"
              >
                <p className="text-2xl font-semibold text-white">{a}</p>
                <p className="mt-1 text-xs leading-5 text-white/55">{b}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[540px] lg:min-h-[680px]">
          <FloatingScene />
          <div className="absolute inset-x-8 bottom-8 rounded-[2rem] border border-white/10 bg-black/35 p-5 backdrop-blur-xl shadow-glow">
            <p className="text-xs uppercase tracking-[0.4em] text-white/35">Current Focus</p>
            <p className="mt-2 text-lg font-medium text-white">Robotics • JEE • ETH • Cosmic Research</p>
            <p className="mt-2 text-sm leading-6 text-white/60">
              A student portfolio designed like a launch sequence, not a school project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
