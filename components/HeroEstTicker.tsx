"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { BOOT_KEY } from "@/lib/boot";

const TEXT = "WEB \u00b7 HOSTING \u00b7 3D \u2014 EST. 2024";

type HeroEstTickerProps = {
  className?: string;
};

export function HeroEstTicker({ className = "" }: HeroEstTickerProps) {
  const [display, setDisplay] = useState(TEXT);

  useLayoutEffect(() => {
    if (document.documentElement.classList.contains("boot-pending")) {
      setDisplay("");
    }
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) return;

    try {
      if (sessionStorage.getItem(BOOT_KEY) === "1") {
        setDisplay(TEXT);
        return;
      }
    } catch {
      /* private browsing */
    }

    const start = () => {
      setDisplay("");
      let i = 0;
      const step = () => {
        i += 1;
        setDisplay(TEXT.slice(0, i));
        if (i < TEXT.length) {
          window.setTimeout(step, 28);
        }
      };
      window.setTimeout(step, 120);
    };

    const root = document.documentElement;
    if (
      root.classList.contains("boot-complete") &&
      root.classList.contains("boot-choreo")
    ) {
      start();
      return;
    }

    if (
      root.classList.contains("boot-complete") &&
      !root.classList.contains("boot-choreo")
    ) {
      setDisplay(TEXT);
      return;
    }

    const onBoot = () => start();
    window.addEventListener("nexraft:boot-complete", onBoot, { once: true });
    return () => window.removeEventListener("nexraft:boot-complete", onBoot);
  }, []);

  return (
    <p
      className={`hero-est-ticker font-mono text-[10px] uppercase tracking-[0.2em] text-muted ${className}`}
      aria-label={TEXT}
    >
      <span aria-hidden="true">{display}</span>
      {display.length < TEXT.length && (
        <span className="hero-est-caret" aria-hidden="true" />
      )}
    </p>
  );
}
