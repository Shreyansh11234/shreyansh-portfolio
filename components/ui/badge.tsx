import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-[#ffa040]/20 bg-[#ffa040]/8 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-[#ffa040]/80 backdrop-blur font-mono",
        className
      )}
      {...props}
    />
  );
}
