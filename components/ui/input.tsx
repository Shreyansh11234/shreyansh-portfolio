import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder:text-white/35 outline-none ring-0 backdrop-blur-xl transition focus:border-white/20 focus:bg-white/[0.06]",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
