export type ShowcaseProject = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
};

export const showcaseProjects: ShowcaseProject[] = [
  {
    title: "Emergent Time Hypothesis",
    description:
      "An independent physics research paper exploring the mathematical foundations of time as an emergent property of dimensional interactions.",
    tech: ["LaTeX", "Physics", "Mathematics", "Research Writing"],
    github: "https://github.com/Shreyansh11234",
  },
  {
    title: "Competition Robot — Technoxian",
    description:
      "A competition-grade robot designed for Technoxian International Robotics Championship, handling embedded logic, mechanics, and real-time strategy.",
    tech: ["Arduino", "ESP32", "C++", "Mechanics"],
    github: "https://github.com/Shreyansh11234",
  },
  {
    title: "State-Level Exhibition Robot",
    description:
      "Built from scratch with original mechanical structure, custom control logic, and live-judging performance at the state exhibition.",
    tech: ["Embedded Systems", "CAD", "Electronics", "C++"],
    github: "https://github.com/Shreyansh11234",
  },
  {
    title: "Premium Portfolio Platform",
    description:
      "A cinematic, research-grade web identity with strong storytelling, motion design, and premium UI engineering using modern web technologies.",
    tech: ["Next.js", "Tailwind", "Framer Motion", "Three.js"],
    github: "https://github.com/Shreyansh11234",
    demo: "https://shreyansh.dev",
  },
  {
    title: "AI Documentation Workflows",
    description:
      "Exploring AI-driven automation for documentation, presentation generation, and structured technical writing pipelines.",
    tech: ["Python", "AI", "Automation", "Markdown"],
    github: "https://github.com/Shreyansh11234",
  },
  {
    title: "IoT Prototype Systems",
    description:
      "Embedded IoT prototypes combining sensors, wireless communication, and firmware for real-world environmental monitoring scenarios.",
    tech: ["ESP32", "Arduino", "IoT", "Firmware"],
    github: "https://github.com/Shreyansh11234",
  },
];
