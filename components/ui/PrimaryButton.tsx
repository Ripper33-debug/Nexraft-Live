"use client";

import type { ReactNode } from "react";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

type PrimaryButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
};

export function PrimaryButton({
  href,
  children,
  className = "",
  external = true,
}: PrimaryButtonProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center justify-center bg-signal px-5 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:bg-signal-dim ${focusRing} ${className}`}
    >
      {children}
    </a>
  );
}

type GhostButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
};

export function GhostButton({
  href,
  children,
  className = "",
  external = false,
}: GhostButtonProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center justify-center border border-line px-5 py-3 text-sm text-bone transition-colors duration-300 hover:border-mute ${focusRing} ${className}`}
    >
      {children}
    </a>
  );
}
