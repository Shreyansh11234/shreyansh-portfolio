"use client";

import { useRef, type ReactNode, type MouseEvent, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  download?: string;
  onClick?: () => void;
  strength?: number;
  "data-cursor"?: string;
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "disabled">;

export function MagneticButton({
  children,
  className,
  href,
  download,
  onClick,
  strength = 0.35,
  type = "button",
  disabled,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || disabled) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  const shared = cn(
    "inline-flex items-center justify-center gap-2 transition-transform duration-200 ease-out",
    disabled && "pointer-events-none opacity-50",
    className
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        download={download}
        className={shared}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        data-cursor={props["data-cursor"]}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      className={shared}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor={props["data-cursor"]}
    >
      {children}
    </button>
  );
}
