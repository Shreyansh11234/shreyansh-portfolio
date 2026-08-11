"use client";

import { useEffect, useState } from "react";

const LOADING_STEPS = [
  "Initializing neural interface...",
  "Calibrating starfield sensors...",
  "Loading orbital mechanics...",
  "Establishing data link...",
  "System ready.",
];

export function LoadingScreen() {
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStep((v) => {
        if (v >= LOADING_STEPS.length - 1) {
          clearInterval(id);
          return v;
        }
        return v + 1;
      });
    }, 300);
    const timeout = setTimeout(() => setReady(true), 1800);
    return () => {
      clearInterval(id);
      clearTimeout(timeout);
    };
  }, []);

  if (ready) return null;

  return (
    <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-[#050302]">
      <div className="relative">
        <div className="h-16 w-16 animate-spin rounded-full border-2 border-amber-400/20 border-t-amber-400" />
        <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-2 border-amber-400/10 border-b-amber-400" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
      </div>
      <div className="mt-8 space-y-2 text-center">
        {LOADING_STEPS.slice(0, step + 1).map((s, i) => (
          <p
            key={s}
            className={`font-mono text-xs tracking-[0.15em] transition-opacity duration-300 ${
              i === step ? "text-amber-300/90" : "text-white/20"
            }`}
          >
            {i === step && <span className="mr-2 text-amber-400">&gt;</span>}
            {s}
            {i === step && <span className="ml-1 inline-block h-3 w-[2px] bg-amber-400 animate-blink" />}
          </p>
        ))}
      </div>
    </div>
  );
}
