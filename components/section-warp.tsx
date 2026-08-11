"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { useScrollProgress } from "@/lib/scroll-context";

function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return prefersReduced;
}

export function SectionWarp({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const scrollProgress = useScrollProgress();

  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, y: 40 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 0.1, 0.22, 1] }}
      style={{
        transform: reduced ? undefined : `translateZ(${scrollProgress * -2}px)`
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
