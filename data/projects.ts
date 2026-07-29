export type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    title: "Emergent Time Hypothesis",
    description:
      "A self-initiated physics research paper exploring the nature of time, dimensions, and mathematical structure. Original reasoning with a publication-minded workflow.",
    tech: ["Physics", "Mathematics", "Research Writing", "LaTeX"],
    github: "https://github.com/Shreyansh11234",
    demo: "https://shreyansh.dev/research"
  },
  {
    title: "Technoxian Competition Robot",
    description:
      "Competition robot built to survive mechanical stress, pressure, and strategy changes. Achieved Top 4 globally at Technoxian International Robotics Championship.",
    tech: ["Arduino", "ESP32", "C++", "Mechanics"],
    github: "https://github.com/Shreyansh11234"
  },
  {
    title: "State-Level Exhibition Robot",
    description:
      "Original robot built from scratch with mechanical design and embedded control logic. Won 3rd place at the state-level robotics exhibition.",
    tech: ["Embedded Systems", "CAD", "Electronics", "C++"],
    github: "https://github.com/Shreyansh11234"
  },
  {
    title: "Premium Portfolio Platform",
    description:
      "Cinematic, research-grade web identity with strong storytelling, motion design, and premium UI. Built with modern full-stack tooling.",
    tech: ["Next.js", "Tailwind", "Framer Motion", "Three.js"],
    github: "https://github.com/Shreyansh11234",
    demo: "https://shreyansh.dev"
  },
  {
    title: "AI & Automation Workflows",
    description:
      "Explored AI-driven workflows for documentation, automation, and intelligent tooling integration across projects.",
    tech: ["Python", "TypeScript", "AI APIs", "Automation"],
    github: "https://github.com/Shreyansh11234"
  },
  {
    title: "INSPIRE MANAK Innovation",
    description:
      "Nationally recognized innovation project developed under the INSPIRE Awards MANAK program, showcasing scientific thinking and originality.",
    tech: ["Innovation", "Prototyping", "Scientific Method"],
    github: "https://github.com/Shreyansh11234"
  }
];
