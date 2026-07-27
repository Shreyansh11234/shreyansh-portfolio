"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X, Github, Feather, Globe, Orbit, Cpu, BookOpen } from "lucide-react";

const commands = [
  { label: "Home", href: "#home", icon: Globe },
  { label: "About", href: "#about", icon: Feather },
  { label: "Achievements", href: "#achievements", icon: Orbit },
  { label: "Research", href: "#eth", icon: BookOpen },
  { label: "GitHub", href: "#github", icon: Github },
  { label: "Robotics", href: "#robotics", icon: Cpu }
];

export function CommandPalette({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const filtered = useMemo(
    () => commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm">
      <div className="mx-auto mt-24 w-[min(92vw,680px)] rounded-3xl border border-white/10 bg-[#070b18] p-4 shadow-glow">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
          <Search className="h-4 w-4 text-white/45" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sections or type a command..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
          />
          <button onClick={onClose} className="rounded-full p-1 text-white/45 hover:bg-white/8 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 grid gap-2">
          {filtered.map((command) => {
            const Icon = command.icon;
            return (
              <a
                key={command.label}
                href={command.href}
                onClick={onClose}
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/75 transition hover:bg-white/[0.06]"
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-white/45" />
                  {command.label}
                </span>
                <span className="text-xs text-white/30">{command.href}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
