"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { BOOK_CALL_URL } from "@/lib/site";

const NAV_LINKS = [
  { label: "Services", href: "/#do" },
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
] as const;

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 40;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const surface = scrolled || open;

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
        surface
          ? "border-line bg-[rgba(10,14,12,0.72)] backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1180px] items-center justify-between px-7">
        <Logo height={26} priority linkClassName={focusRing} />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 min-[860px]:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm text-mute transition-colors duration-300 hover:text-bone ${focusRing}`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={BOOK_CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center bg-signal px-4 py-2.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-signal-dim ${focusRing}`}
          >
            Book a call
          </a>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          className={`text-sm text-mute transition-colors duration-300 hover:text-bone min-[860px]:hidden ${focusRing}`}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        inert={!open}
        className={`mobile-menu-shell grid min-[860px]:hidden ${
          open ? "mobile-menu-open" : ""
        }`}
      >
        <div className="overflow-hidden border-t border-line bg-[rgba(10,14,12,0.96)] backdrop-blur-md">
          <nav
            aria-label="Primary"
            className="mobile-menu-panel mx-auto flex max-w-[1180px] flex-col px-7 py-4"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`border-b border-line py-4 text-base text-mute transition-colors duration-300 hover:text-bone ${focusRing}`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={BOOK_CALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className={`mt-4 inline-flex w-full items-center justify-center bg-signal px-4 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:bg-signal-dim ${focusRing}`}
            >
              Book a call
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
