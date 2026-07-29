"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Hero3DScene } from "@/components/hero-3d-scene";
import { TypingHeadline } from "@/components/typing-headline";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="h-screen" />;

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden"
      style={{ background: "#05070d" }}
    >
      {/* Full-bleed 3D scene */}
      <Hero3DScene />

      {/* Eyebrow */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-[13px] tracking-[0.15em] uppercase text-[#4fd1ff] mb-[18px]"
        >
          robotics · ai · physics · code
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center text-[clamp(32px,6vw,64px)] font-bold leading-[1.1] text-[#f4f6fb]"
        >
          Hi, I&apos;m <span className="bg-gradient-to-r from-[#4fd1ff] to-[#ffb454] bg-clip-text text-transparent">Shreyansh</span>
          <span className="block text-[clamp(20px,3.5vw,40px)] font-semibold text-white/70">
            <TypingHeadline />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-4 max-w-[480px] text-center text-base text-[#8a93a8] px-4"
        >
          Building at the intersection of intelligent systems and the physical world.
        </motion.p>

        {/* CTA Buttons — only on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 pointer-events-auto"
        >
          <a
            href="#eth"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-black transition hover:translate-y-[-1px] hover:shadow-[0_0_35px_rgba(79,209,255,.25)]"
          >
            View Research
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="/resume/Shreyansh_Portfolio_v2.docx"
            download
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 text-sm font-medium text-white/80 transition hover:bg-white/10"
          >
            Download Resume
            <Download className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      {/* Stats grid — bottom area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="absolute bottom-24 left-1/2 z-20 -translate-x-1/2 hidden md:block"
      >
        <div className="flex gap-4">
          {[
            ["Top 4", "Globally at Technoxian"],
            ["MANAK", "National recognition"],
            ["ETH", "Active research"],
            ["Next.js", "Production builds"]
          ].map(([a, b]) => (
            <div
              key={a}
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 backdrop-blur-xl"
            >
              <p className="text-xl font-semibold text-white">{a}</p>
              <p className="mt-0.5 text-xs leading-5 text-white/55">{b}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 font-mono text-xs tracking-[0.1em] text-[#5c6478] animate-bob"
      >
        scroll to explore ↓
      </motion.p>

      <style>{`
        @keyframes bob {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
        .animate-bob {
          animation: bob 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
