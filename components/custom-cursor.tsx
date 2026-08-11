"use client";

import { useEffect, useRef, useState } from "react";
import { useIsTouchDevice } from "@/lib/use-performance-mode";

type CursorState = "default" | "ring" | "view" | "link";

export function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const [state, setState] = useState<CursorState>("default");
  const raf = useRef(0);

  useEffect(() => {
    if (isTouch) return;

    document.body.style.cursor = "none";

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.18);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.18);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0) translate(-50%, -50%)`;
      }

      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const interactive = el.closest("a, button, [data-cursor]");
      if (!interactive) {
        setState("default");
        return;
      }
      const cursor = interactive.getAttribute("data-cursor");
      if (cursor === "view") setState("view");
      else if (cursor === "link" || interactive.tagName === "A") setState("link");
      else setState("ring");
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);

    return () => {
      document.body.style.cursor = "";
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [isTouch]);

  if (isTouch) return null;

  const ringSize = state === "view" ? 64 : state === "ring" || state === "link" ? 44 : 28;
  const ringOpacity = state === "default" ? 0.35 : 0.6;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block rounded-full border transition-all duration-300 ease-out"
        style={{
          width: ringSize,
          height: ringSize,
          borderColor: `rgba(255, 160, 60, ${ringOpacity})`,
          background: state === "view" ? "rgba(255, 160, 60, 0.05)" : "transparent"
        }}
      >
        {state === "view" && (
          <span
            ref={labelRef}
            className="absolute inset-0 flex items-center justify-center font-mono text-[9px] uppercase tracking-[0.2em] text-cyan/80"
          >
            View
          </span>
        )}
      </div>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[101] hidden md:block h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(255,160,60,0.8)]"
      />
    </>
  );
}
