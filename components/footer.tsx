import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/8 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 text-sm text-white/45 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <p>Built with Next.js, TypeScript, Tailwind, Framer Motion, Three.js.</p>
      </div>
    </footer>
  );
}
