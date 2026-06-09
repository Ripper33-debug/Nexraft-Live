"use client";

import type { ReactNode } from "react";

function getBookingUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
  return url || null;
}

type BookCallButtonProps = {
  label?: string;
  className?: string;
  variant?: "primary" | "default" | "nav";
};

export function BookCallButton({
  label = "Book a call",
  className = "",
  variant = "default",
}: BookCallButtonProps) {
  const url = getBookingUrl();

  const classes =
    variant === "primary"
      ? `hero-cta-primary btn-submit ${className}`
      : variant === "nav"
        ? `btn-nav-cta ${className}`
        : `btn-submit ${className}`;

  if (!url) {
    return (
      <p className="font-mono text-[10px] text-muted" role="status">
        Booking link not configured yet.
      </p>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      data-cursor-hover
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
  const url = getBookingUrl();

  if (!url) {
    return (
      <span className={`font-mono text-[10px] text-muted ${className}`} role="status">
        {children}
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`magnetic-link inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${className}`}
      data-cursor-hover
    >
      {children}
    </a>
  );
}
