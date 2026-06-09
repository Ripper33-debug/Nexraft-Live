"use client";

import { useEffect, useState } from "react";
import { SECTIONS } from "@/lib/sections";

export function SectionRail() {
  const [active, setActive] = useState("home");

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
      { rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.3, 0.6] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="section-rail pointer-events-none fixed top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3"
      aria-label="Section index"
    >
      {SECTIONS.map((section) => {
        const isActive = active === section.id;
        return (
          <a
            key={section.id}
            href={section.href}
            className={`pointer-events-auto group flex items-center gap-3 transition-opacity duration-300 ${
              isActive ? "opacity-100" : "opacity-35 hover:opacity-70"
            }`}
            aria-current={isActive ? "location" : undefined}
            aria-label={`${section.index} ${section.label}`}
            data-cursor-hover
          >
            <span
              className={`h-px transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isActive
                  ? "w-8 bg-accent"
                  : "w-4 bg-muted group-hover:w-6 group-hover:bg-foreground"
              }`}
            />
            <span className="font-mono text-[10px] tabular-nums tracking-widest text-muted">
              {section.index}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
