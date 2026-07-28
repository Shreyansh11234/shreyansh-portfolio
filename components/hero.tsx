"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { CosmicCodeScene } from "@/components/cosmic-code-scene";
import { TypingHeadline } from "@/components/typing-headline";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-16 sm:pt-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(143,176,255,0.18),transparent_30%),radial-gradient(circle_at_78%_24%,rgba(255,165,80,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.055),transparent)]" />
      <div className="absolute inset-0 -z-10 bg-[url('/nebula.svg')] bg-cover bg-center opacity-35 mix-blend-screen" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8 lg:pb-24">
        <div className="relative z-20 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-white/55 backdrop-blur-xl"
          >
            Cosmic code lab
          </motion.div>

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
            building where software, machines, and the universe meet.
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

        <CosmicCodeScene />
      </div>
    </section>
  );
}
