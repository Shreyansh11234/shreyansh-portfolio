"use client";

import { useEffect, useState } from "react";

const words = [
  "Robotics Engineer.",
  "AI Developer.",
  "Physics Researcher.",
  "Cosmology Enthusiast.",
  "Future Mechanical Engineer."
];

export function TypingHeadline() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = words[index];
    const delay = deleting ? 25 : 45;
    const timer = setTimeout(() => {
      if (!deleting) {
        setText(full.slice(0, text.length + 1));
        if (text.length + 1 === full.length) {
          setTimeout(() => setDeleting(true), 1100);
        }
      } else {
        setText(full.slice(0, Math.max(0, text.length - 1)));
        if (text.length <= 1) {
          setDeleting(false);
          setIndex((v) => (v + 1) % words.length);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index]);

  return (
    <span className="block bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
      {text}
      <span className="ml-1 inline-block h-[1em] w-[2px] translate-y-1 bg-white/75" />
    </span>
  );
}
