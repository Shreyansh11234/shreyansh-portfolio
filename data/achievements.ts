export type Achievement = {
  year: string;
  title: string;
  level: "International" | "National" | "State" | "Interschool" | "Research" | "Robotics" | "Software";
  award: string;
  description: string;
  impact: string;
};

export const achievements: Achievement[] = [
  {
    year: "2024",
    title: "Technoxian International Robotics Championship",
    level: "International",
    award: "Top 4 Globally",
    description:
      "Represented the school on a global robotics stage and helped deliver a competition robot that performed under international pressure.",
    impact: "Proved capability at a world-class level in robotics, teamwork, and execution."
  },
  {
    year: "2024",
    title: "INSPIRE Awards MANAK",
    level: "National",
    award: "National Recognition",
    description:
      "Recognized for student innovation and scientific thinking among the country's emerging young innovators.",
    impact: "Strengthened credibility as an inventor and research-minded builder."
  },
  {
    year: "2024",
    title: "State-Level Robotics Exhibition",
    level: "State",
    award: "3rd Place",
    description:
      "Built a robot from scratch with original mechanical design and embedded control logic for live judging.",
    impact: "Showed independent design ownership across hardware and software."
  },
  {
    year: "2024",
    title: "Interschool Robotics and Coding Events",
    level: "Interschool",
    award: "Multiple First Places",
    description:
      "Won across robotics, coding, science, and innovation events hosted by schools and engineering colleges.",
    impact: "Built a consistent winning record across formats and problem types."
  },
  {
    year: "2025",
    title: "Emergent Time Hypothesis",
    level: "Research",
    award: "Original Research in Progress",
    description:
      "Independent physics research exploring the nature of time, dimensions, and mathematical structure.",
    impact: "Positions the portfolio as an active research initiative, not just a student resume."
  },
  {
    year: "2025",
    title: "Competition Engineering",
    level: "Robotics",
    award: "Robot Build + Strategy Lead",
    description:
      "Handled design decisions, embedded systems, and competition strategy under real event pressure.",
    impact: "Demonstrated leadership inside an engineering team."
  },
  {
    year: "2025",
    title: "Next.js & AI Projects",
    level: "Software",
    award: "Production-Style Builds",
    description:
      "Built full-stack web experiences and explored AI-driven workflows for real documentation and presentation.",
    impact: "Shows a strong software layer that complements the robotics identity."
  }
];
