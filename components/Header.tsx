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

const navLinkClass = `nav-link font-jetbrains text-[11px] uppercase tracking-[0.14em] ${focusRing}`;

function NavCta({
  className = "",
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={BOOK_CALL_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`nav-cta ${focusRing} ${className}`.trim()}
    >
      <span className="nav-cta-dot" aria-hidden="true" />
      Book a call
      <span className="nav-cta-arrow" aria-hidden="true">
        {"\u2192"}
      </span>
    </a>
  );
}

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
          ? "border-line bg-[color-mix(in_srgb,var(--color-ink)_94%,transparent)]"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1180px] items-center justify-between px-7">
        <Logo height={26} priority linkClassName={focusRing} />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 min-[860px]:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={navLinkClass}>
              {link.label}
            </Link>
          ))}
          <span
            className="mx-0.5 h-4 w-px shrink-0 bg-line"
            aria-hidden="true"
          />
          <NavCta />
        </nav>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          className={`font-jetbrains text-[11px] uppercase tracking-[0.14em] text-soft transition-colors duration-300 hover:text-bone min-[860px]:hidden ${focusRing}`}
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
        <div className="overflow-hidden border-t border-line bg-[color-mix(in_srgb,var(--color-ink)_98%,transparent)]">
          <nav
            aria-label="Primary"
            className="mobile-menu-panel mx-auto flex max-w-[1180px] flex-col px-7 py-4"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`border-b border-line py-4 font-jetbrains text-[11px] uppercase tracking-[0.14em] text-soft transition-colors duration-300 hover:text-bone ${focusRing}`}
              >
                {link.label}
              </Link>
            ))}
            <NavCta
              className="mt-5 w-full justify-center py-3.5"
              onClick={() => setOpen(false)}
            />
          </nav>
        </div>
      </div>
    </header>
  );
}
