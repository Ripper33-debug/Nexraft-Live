"use client";

import { useRef, type ReactNode } from "react";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  magnetic?: boolean;
};

export function MagneticButton({
  href,
  children,
  className = "",
  external = true,
  magnetic = true,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!magnetic) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  };

  return (
    <a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseMove={magnetic ? handleMove : undefined}
      onMouseLeave={magnetic ? handleLeave : undefined}
      className={`inline-flex items-center justify-center bg-signal px-5 py-3 text-sm font-medium text-ink transition-[background-color,transform] duration-300 ease-[cubic-bezier(.16,1,.3,1)] hover:bg-signal-dim ${focusRing} ${className}`}
    >
      {children}
    </a>
  );
}
