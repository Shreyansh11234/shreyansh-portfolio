import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

export function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Badge className="mb-4 border-white/15 bg-white/[0.06] text-white/70">{eyebrow}</Badge>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-white/65 sm:text-base">{description}</p>
    </div>
  );
}
