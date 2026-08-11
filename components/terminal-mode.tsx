"use client";

import { useState } from "react";
import { Terminal, X } from "lucide-react";

export function TerminalMode({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [lines] = useState([
    "> loading identity... complete",
    "> robotics credentials... verified",
    "> research initiative... active",
    "> cosmos obsession... persistent",
    "> launch status: ready"
  ]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[55] bg-[#050302]/90 p-4 backdrop-blur-md">
      <div className="mx-auto mt-20 max-w-3xl overflow-hidden rounded-3xl border border-[#ffa040]/15 bg-[#050302] shadow-[0_0_40px_rgba(255,160,60,0.06)]">
        <div className="flex items-center justify-between border-b border-[#ffa040]/10 px-4 py-3 text-sm text-white/65">
          <span className="inline-flex items-center gap-2">
            <Terminal className="h-4 w-4 text-[#ffa040]" /> <span className="font-mono text-[#ffa040]/80">Terminal Mode</span>
          </span>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-white/8 text-white/50 hover:text-[#ffa040] transition">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-2 px-4 py-6 font-mono text-sm text-[#ffa040]/80">
          {lines.map((line) => (
            <div key={line} className="flex items-start gap-2">
              <span className="text-[#ffa040]/60">&gt;</span>
              <span>{line.slice(2)}</span>
              <span className="inline-block h-4 w-[2px] bg-[#ffa040] animate-blink" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
