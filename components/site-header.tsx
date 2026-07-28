"use client";

import Link from "next/link";
import { Menu, Command } from "lucide-react";
import { useState } from "react";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
export function SiteHeader({
  onOpenPalette
}: {
  onOpenPalette: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/6 bg-black/45 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="#home" className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-sm font-semibold text-white shadow-glow">
            S
          </span>
          <div>
            <p className="text-sm font-medium text-white">{site.shortName}</p>
            <p className="text-xs text-white/45">Robotics • Research • Cosmos</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-white/65 transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={onOpenPalette} className="hidden sm:inline-flex">
            <Command className="h-4 w-4" />
            Ctrl K
          </Button>
          <Button variant="ghost" size="icon" className="xl:hidden" onClick={() => setOpen((v) => !v)} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/8 px-4 py-4 sm:px-6 xl:hidden">
          <div className="grid grid-cols-2 gap-3">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
