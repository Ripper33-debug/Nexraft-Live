"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookCallButton } from "@/components/BookCallButton";
import { Logo } from "@/components/Logo";
import { SECTIONS } from "@/lib/sections";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    // Sentinel spanning the top 24px of the page; header gains its surface
    // once it scrolls out of view.
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText =
      "position:absolute;top:0;left:0;width:1px;height:24px;pointer-events:none;opacity:0;";
    document.body.prepend(sentinel);

    const observer = new IntersectionObserver(([entry]) => {
      setScrolled(!entry.isIntersecting);
    });
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
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
      <div className="grid-editorial min-w-0 py-4 md:items-center md:py-5">
        <div className="col-span-12 min-w-0 md:col-span-3">
          <Logo height={22} priority />
        </div>

        <nav
          className="nav-scroll col-span-12 -mx-[clamp(1.25rem,4vw,3rem)] flex items-center gap-6 overflow-x-auto border-t border-border px-[clamp(1.25rem,4vw,3rem)] py-3 md:col-span-9 md:mx-0 md:justify-end md:gap-8 md:border-t-0 md:px-0 md:py-0"
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
          <BookCallButton label="Book a call" variant="nav" />
        </nav>
      </div>
    </header>
  );
}
