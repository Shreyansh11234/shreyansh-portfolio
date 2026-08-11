"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import dynamic from "next/dynamic";
import { TypingHeadline } from "@/components/typing-headline";
import { MagneticButton } from "@/components/magnetic-button";
import { site } from "@/lib/site";
import { useScrollProgress } from "@/lib/scroll-context";

const AICore = dynamic(() => import("@/components/ai-core").then((m) => m.AICore), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-transparent" />
});

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-screen" />;

  const opacity = Math.max(0, 1 - scrollProgress * 3);
  const translateY = scrollProgress * -80;

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <AICore className="absolute inset-0 z-0" />

      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(5, 3, 2, 0.7) 100%)"
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-36 z-10 pointer-events-none bg-gradient-to-t from-[#050302] via-[#050302]/70 to-transparent"
      />

      <motion.div
        style={{ opacity, y: translateY }}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 pointer-events-none"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mb-5 font-mono text-[11px] uppercase tracking-[0.35em] text-cyan/70"
        >
          AI · Robotics · Software
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-center font-space text-[clamp(2rem,7vw,4.5rem)] font-bold uppercase leading-[1.05] tracking-tight text-white"
        >
          {site.name.split(" ").slice(0, -1).join(" ")}
          <span className="block bg-gradient-to-r from-cyan via-white to-purple bg-clip-text text-transparent">
            {site.name.split(" ").slice(-1)[0]}
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-3 text-center font-mono text-[clamp(0.85rem,2vw,1.1rem)] uppercase tracking-[0.15em] text-white/50"
        >
          <TypingHeadline />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-5 max-w-md text-center text-sm leading-7 text-white/50"
        >
          Building at the intersection of intelligent systems, robotics, and the physical universe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 pointer-events-auto"
        >
          <MagneticButton
            href="#projects"
            className="h-11 rounded-full bg-white px-6 text-sm font-semibold text-black shadow-[0_0_30px_rgba(255,160,60,0.2)] hover:shadow-[0_0_40px_rgba(255,160,60,0.35)]"
            data-cursor="link"
          >
            Explore Work
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="h-11 rounded-full border border-white/15 bg-white/5 px-6 text-sm font-medium text-white/80 backdrop-blur-sm hover:bg-white/10"
            data-cursor="link"
          >
            Contact
          </MagneticButton>
          <MagneticButton
            href="/resume/Shreyansh_Portfolio_v2.docx"
            download="Shreyansh_Portfolio_v2.docx"
            className="hidden h-11 rounded-full border border-white/10 px-5 text-sm text-white/50 hover:text-white/70 sm:inline-flex"
            data-cursor="link"
          >
            <Download className="h-4 w-4" />
            Resume
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1 }}
        style={{ opacity }}
        className="absolute bottom-20 left-1/2 z-20 hidden -translate-x-1/2 md:block [@media(max-height:750px)]:hidden"
      >
        <div className="flex gap-3">
          {[
            ["Top 4", "Technoxian Global"],
            ["MANAK", "National Award"],
            ["ETH", "Active Research"],
            ["Next.js", "Production Builds"]
          ].map(([a, b]) => (
            <div
              key={a}
              className="glass-panel rounded-2xl px-4 py-3 text-center"
            >
              <p className="font-space text-lg font-semibold text-white">{a}</p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-white/40">{b}</p>
            </div>
          ))}
        </div>
      </motion.div>



      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/25 animate-scroll-hint">
          Scroll to journey ↓
        </p>
      </motion.div>
    </section>
  );
}
