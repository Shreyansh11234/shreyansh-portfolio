"use client";

import { useEffect, useState } from "react";

export type PerformanceMode = "full" | "reduced" | "static";

export function usePerformanceMode(): PerformanceMode {
  const [mode, setMode] = useState<PerformanceMode>("full");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const cores = navigator.hardwareConcurrency ?? 8;
    const lowPower = cores <= 4;

    if (reduced) setMode("static");
    else if (isMobile || lowPower) setMode("reduced");
    else setMode("full");
  }, []);

  return mode;
}

export function useIsTouchDevice() {
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    setTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);
  return touch;
}
