"use client";

import Link from "next/link";
import { useRef, type ReactNode, type MouseEvent } from "react";

type MagneticLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: "default" | "primary";
};

export function MagneticLink({
  href,
  children,
  className = "",
  strength = "default",
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const pull = strength === "primary" ? 0.32 : 0.15;

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !fine) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    el.style.transform = `translate(${x * pull}px, ${y * (pull + 0.05)}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  return (
    <Link
      ref={ref}
      href={href}
      className={`magnetic-link inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${className} ${
        strength === "primary" ? "magnetic-link-primary" : ""
      }`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor-hover
    >
      {children}
    </Link>
  );
}
