"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { SECTIONS } from "@/lib/sections";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean,
    ) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled
          ? "border-border bg-surface/95 backdrop-blur-sm"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="grid-editorial py-4 md:items-center md:py-5">
        <div className="col-span-12 flex items-center justify-between md:col-span-3 md:block">
          <Logo height={26} priority />
          <Link
            href="/pay"
            className="link-underline font-mono text-xs uppercase tracking-widest text-accent md:hidden"
            data-cursor-hover
          >
            Pay Bill
          </Link>
        </div>

        <nav
          className="nav-scroll col-span-12 -mx-[clamp(1.25rem,4vw,3rem)] flex items-center gap-8 overflow-x-auto border-t border-border px-[clamp(1.25rem,4vw,3rem)] py-3 md:col-span-6 md:mx-0 md:justify-end md:border-t-0 md:px-0 md:py-0"
          aria-label="Primary"
        >
          {SECTIONS.map((item) => {
            const isActive = active === item.id;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`link-underline shrink-0 font-mono text-xs uppercase tracking-widest transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
                aria-current={isActive ? "page" : undefined}
                data-cursor-hover
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:col-span-3 md:flex md:items-center md:justify-end">
          <Link
            href="/pay"
            className="link-underline font-mono text-xs uppercase tracking-widest text-accent"
            data-cursor-hover
          >
            Pay Bill
          </Link>
        </div>
      </div>
    </header>
  );
}
