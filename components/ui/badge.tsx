import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-[#4fd1ff]/20 bg-[#4fd1ff]/8 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-[#4fd1ff]/80 backdrop-blur font-mono",
        className
      )}
      {...props}
    />
  );
}
