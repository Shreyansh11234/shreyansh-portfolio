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
      <Badge className="mb-4">{eyebrow}</Badge>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}<span className="terminal-cursor" />
      </h2>
      <p className="mt-4 text-sm leading-7 text-white/65 sm:text-base">{description}</p>
    </div>
  );
}
