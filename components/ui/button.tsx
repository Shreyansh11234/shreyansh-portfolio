import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    "bg-white text-black hover:translate-y-[-1px] hover:shadow-[0_0_35px_rgba(255,160,60,.22)]",
  secondary:
    "bg-[#ffa040]/8 text-[#ffa040]/80 border border-[#ffa040]/15 hover:bg-[#ffa040]/15",
  ghost: "bg-transparent text-white hover:bg-[#ffa040]/10 hover:text-[#ffa040]",
  outline: "bg-transparent text-white border border-white/15 hover:bg-[#ffa040]/10 hover:border-[#ffa040]/30"
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "h-11 px-5",
  sm: "h-9 px-3.5 text-sm",
  lg: "h-12 px-6 text-base",
  icon: "h-10 w-10 p-0"
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#ffa040]/30 disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
