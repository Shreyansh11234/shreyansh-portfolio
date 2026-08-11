import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-[#ffa040]/10 py-8 relative z-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 text-sm text-white/45 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <p className="font-mono text-[10px] tracking-[0.15em] text-[#ffa040]/40">
          <span className="inline-block h-2 w-2 rounded-full bg-[#ffa040]/50 mr-1.5" />
          Orbital Interface v2.0
        </p>
      </div>
    </footer>
  );
}
