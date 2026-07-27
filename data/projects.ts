export type Project = {
  name: string;
  type: string;
  problem: string;
  solution: string;
  outcome: string;
  stack: string[];
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    name: "Emergent Time Hypothesis",
    type: "Research Initiative",
    problem:
      "Modern explanations of time still leave open questions about origin, emergence, and mathematical structure.",
    solution:
      "A self-initiated research paper that develops reasoning, equations, and a disciplined framework around time and dimensions.",
    outcome:
      "Positions the work as a genuine scientific exploration with a publication-minded workflow.",
    stack: ["Physics", "Mathematics", "Research Writing", "LaTeX"]
  },
  {
    name: "Technoxian Competition Robot",
    type: "Robotics System",
    problem:
      "Build a robot that can survive competition pressure, mechanical stress, and strategy changes.",
    solution:
      "Designed hardware, embedded logic, and competition tactics as one coordinated system.",
    outcome:
      "Achieved Top 4 globally at Technoxian International Robotics Championship.",
    stack: ["Arduino", "ESP32", "C++", "Mechanics"]
  },
  {
    name: "State-Level Exhibition Robot",
    type: "Innovation Prototype",
    problem:
      "Create an original robot that stands out in both mechanics and live performance.",
    solution:
      "Built from scratch with original structure, control logic, and event-ready presentation.",
    outcome:
      "Won 3rd place at the state level.",
    stack: ["Embedded Systems", "CAD", "Electronics", "C++"]
  },
  {
    name: "Premium Portfolio Platform",
    type: "Web Experience",
    problem:
      "Most student portfolios feel generic and fail to communicate depth.",
    solution:
      "A cinematic, research-grade web identity with strong storytelling, motion, and premium UI.",
    outcome:
      "Transforms achievements into a brand that feels world-class.",
    stack: ["Next.js", "Tailwind", "Framer Motion", "Three.js"]
  }
];
