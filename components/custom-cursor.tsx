"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8fb0ff]/45 bg-[#8fb0ff]/12 blur-[1px] transition-transform duration-75 md:block"
      style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)` }}
    />
  );
}
