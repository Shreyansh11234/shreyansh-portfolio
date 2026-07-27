"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

export function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [pathname]);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
}
