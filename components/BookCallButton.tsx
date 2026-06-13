"use client";

import type { ReactNode } from "react";
import { BOOK_CALL_URL } from "@/lib/site";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

type BookCallButtonProps = {
  label?: string;
  className?: string;
  variant?: "primary" | "ghost" | "nav";
};

export function BookCallButton({
  label = "Book a call",
  className = "",
  variant = "ghost",
}: BookCallButtonProps) {
  const url = process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || BOOK_CALL_URL;

  if (variant === "primary" || variant === "nav") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center bg-signal px-5 py-3 font-jetbrains text-[12px] uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-signal-dim ${focusRing} ${className}`}
      >
        {label}
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center border border-line px-5 py-3 font-jetbrains text-[12px] uppercase tracking-[0.2em] text-bone transition-colors duration-300 hover:border-mute ${focusRing} ${className}`}
    >
      {label}
    </a>
  );
}

type BookCallLinkProps = {
  children: ReactNode;
  className?: string;
};

export function BookCallLink({ children, className = "" }: BookCallLinkProps) {
  const url = process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || BOOK_CALL_URL;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`link-underline font-jetbrains text-xs uppercase tracking-[0.2em] text-mute transition-colors hover:text-bone ${className}`}
    >
      {children}
    </a>
  );
}
