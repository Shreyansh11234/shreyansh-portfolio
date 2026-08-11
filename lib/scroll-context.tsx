"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode
} from "react";

type ScrollContextValue = {
  progress: number;
  activeSection: string;
  lenis: unknown | null;
};

const ScrollContext = createContext<ScrollContextValue>({
  progress: 0,
  activeSection: "home",
  lenis: null
});

const SECTION_IDS = [
  "home",
  "about",
  "achievements",
  "beyond-engineering",
  "eth",
  "robotics",
  "projects",
  "skills",
  "experience",
  "github",
  "contact"
];

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const lenisRef = useRef<unknown>(null);

  const updateActiveSection = useCallback(() => {
    const offset = window.innerHeight * 0.35;
    let current = "home";

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top <= offset) current = id;
    }

    setActiveSection(current);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      updateActiveSection();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [updateActiveSection]);

  return (
    <ScrollContext.Provider value={{ progress, activeSection, lenis: lenisRef.current }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollProgress() {
  return useContext(ScrollContext).progress;
}

export function useActiveSection() {
  return useContext(ScrollContext).activeSection;
}
