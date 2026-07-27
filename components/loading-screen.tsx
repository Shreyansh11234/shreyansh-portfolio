"use client";

import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setReady(true), 700);
    return () => clearTimeout(id);
  }, []);

  if (ready) return null;

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-[#050816]">
      <div className="text-center">
        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-2 border-white/10 border-t-white/80" />
        <p className="mt-5 text-xs uppercase tracking-[0.55em] text-white/35">Initializing Portfolio</p>
      </div>
    </div>
  );
}
