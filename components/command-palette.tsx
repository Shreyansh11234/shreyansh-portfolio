"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X, Github, Feather, Globe, Orbit, Cpu, BookOpen, FolderKanban, Mail } from "lucide-react";

const commands = [
  { label: "Home", href: "#home", icon: Globe },
  { label: "About", href: "#about", icon: Feather },
  { label: "Achievements", href: "#achievements", icon: Orbit },
  { label: "Research", href: "#eth", icon: BookOpen },
  { label: "Robotics", href: "#robotics", icon: Cpu },
  { label: "Projects", href: "#projects", icon: FolderKanban },
  { label: "GitHub", href: "#github", icon: Github },
  { label: "Contact", href: "#contact", icon: Mail }
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
    <div className="fixed inset-0 z-50 bg-[#05070d]/80 backdrop-blur-sm">
      <div className="mx-auto mt-24 w-[min(92vw,680px)] rounded-3xl border border-[#4fd1ff]/15 bg-[#050d1a] p-4 shadow-[0_0_40px_rgba(79,209,255,0.06)]">
        <div className="flex items-center gap-3 rounded-2xl border border-[#4fd1ff]/10 bg-[#4fd1ff]/5 px-4 py-3">
          <Search className="h-4 w-4 text-[#4fd1ff]/60" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sections or type a command..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
          />
          <button onClick={onClose} className="rounded-full p-1 text-white/45 hover:bg-white/8 hover:text-[#4fd1ff] transition">
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
                className="flex items-center justify-between rounded-2xl border border-[#4fd1ff]/8 bg-[#4fd1ff]/3 px-4 py-3 text-sm text-white/75 transition hover:bg-[#4fd1ff]/8"
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-[#4fd1ff]/60" />
                  {command.label}
                </span>
                <span className="text-xs font-mono text-[#4fd1ff]/30">{command.href}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
