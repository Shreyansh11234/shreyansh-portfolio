"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { AboutStory } from "@/components/about-story";
import { AchievementsTimeline } from "@/components/achievements-timeline";
import { BeyondEngineering } from "@/components/beyond-engineering";
import { ETHResearch } from "@/components/eth-research";
import { ProjectsGrid } from "@/components/projects-grid";
import { RoboticsShowcase } from "@/components/robotics-showcase";
import { SkillsGrid } from "@/components/skills-grid";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { GitHubShowcase } from "@/components/github-showcase";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { CommandPalette } from "@/components/command-palette";
import { TerminalMode } from "@/components/terminal-mode";

export function HomeShell() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(true);
      }
      if (e.key.toLowerCase() === "t" && e.altKey) {
        e.preventDefault();
        setTerminalOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main className="min-h-screen bg-transparent text-white">
      <SiteHeader onOpenPalette={() => setPaletteOpen(true)} />
      <Hero />
      <AboutStory />
      <AchievementsTimeline />
      <BeyondEngineering />
      <ETHResearch />
      <ProjectsGrid />
      <RoboticsShowcase />
      <SkillsGrid />
      <ExperienceTimeline />
      <GitHubShowcase />
      <ContactSection />
      <Footer />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <TerminalMode open={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </main>
  );
}
