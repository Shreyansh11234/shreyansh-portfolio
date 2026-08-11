"use client";

import Link from "next/link";
import { Menu, Command, X } from "lucide-react";
import { useState, useEffect } from "react";
import { site } from "@/lib/site";
import { useActiveSection } from "@/lib/scroll-context";
import { cn } from "@/lib/utils";

const primaryNav = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" }
];

export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => activeSection === href.replace("#", "");

  return (
    <>
      <header
        className={cn(
          "fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 transition-all duration-500",
          scrolled ? "top-3" : "top-5"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl border px-4 py-2.5 backdrop-blur-xl transition-all duration-500 sm:px-6",
            scrolled
              ? "border-white/10 bg-black/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "border-white/6 bg-black/30"
          )}
        >
          <Link href="#home" className="group flex items-center gap-2.5" data-cursor="link">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ffa040]/20 bg-[#050302]/80 overflow-hidden">
              <img src="/images/logo.png" alt="S" className="h-full w-full object-contain p-0.5" />
            </span>
            <span className="hidden font-space text-sm font-medium text-white sm:block">{site.shortName}</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {primaryNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-all duration-300",
                  isActive(item.href)
                    ? "bg-white/8 text-white"
                    : "text-white/45 hover:text-white/75"
                )}
                data-cursor="link"
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute bottom-0.5 left-1/2 h-px w-4 -translate-x-1/2 bg-cyan/60" />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenPalette}
              className="hidden items-center gap-1.5 rounded-full border border-white/8 px-3 py-1.5 font-mono text-[10px] text-white/40 transition hover:border-white/15 hover:text-white/60 sm:inline-flex"
              data-cursor="ring"
            >
              <Command className="h-3 w-3" />
              ⌘K
            </button>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/8 text-white/60 md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              data-cursor="ring"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)}>
          <div
            className="absolute right-4 top-20 w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-white/10 bg-black/80 p-4 backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="grid gap-1">
              {site.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 font-mono text-sm transition",
                    isActive(item.href)
                      ? "bg-cyan/10 text-cyan"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
