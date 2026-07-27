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
    <div className="fixed inset-0 z-[55] bg-black/80 p-4 backdrop-blur-md">
      <div className="mx-auto mt-20 max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#02040a] shadow-glow">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-sm text-white/65">
          <span className="inline-flex items-center gap-2">
            <Terminal className="h-4 w-4" /> Terminal Mode
          </span>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-white/8">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-2 px-4 py-6 font-mono text-sm text-[#9bb8ff]">
          {lines.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
