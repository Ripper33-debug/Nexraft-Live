"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  { text: "DESIGNED TO", dir: -1, accent: false },
  { text: "LOOK EXPENSIVE.", dir: 1, accent: false },
  { text: "BUILT TO", dir: -1, accent: false },
  { text: "OUTPERFORM.", dir: 1, accent: true },
];

/**
 * Full-viewport kinetic typography moment. As the visitor scrolls through the
 * over-tall pinned container, each oversized line masks up from the baseline and
 * slides in from an alternating side, then drifts as scroll continues. Reduced
 * motion shows the lines settled and static.
 */
export function KineticStatement() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      setReduced(true);
      setProgress(1);
      return;
    }

    let rafId = 0;
    const update = () => {
      rafId = 0;
      const outer = outerRef.current;
      if (!outer) return;
      const rect = outer.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      if (distance <= 0) {
        setProgress(1);
        return;
      }
      const scrolled = Math.min(Math.max(-rect.top, 0), distance);
      setProgress(scrolled / distance);
    };
    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={outerRef}
      aria-label="Designed to look expensive. Built to outperform."
      className="relative bg-ink"
      style={reduced ? undefined : { height: "230vh" }}
    >
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1400px] px-7">
          <p className="mb-8 font-jetbrains text-[11px] uppercase leading-none tracking-[0.2em] text-signal/80">
            Why Nexraft
          </p>
          <div
            aria-hidden="true"
            className="font-display font-semibold uppercase leading-[0.92] tracking-[-0.04em]"
            style={{ fontSize: "clamp(2.4rem, 11vw, 10rem)" }}
          >
            {LINES.map((line, i) => {
              // Stagger each line across scroll progress; finish a touch early.
              const t = reduced
                ? 1
                : Math.max(0, Math.min(1, progress * (LINES.length + 1) - i));
              const enterX = line.dir * (1 - t) * 14;
              const driftX = reduced ? 0 : line.dir * (progress - 0.5) * 4;
              const y = (1 - t) * 110;
              return (
                <div key={line.text} className="overflow-hidden">
                  <span
                    className={`inline-block will-change-transform ${
                      line.accent ? "text-signal" : "text-bone"
                    }`}
                    style={{
                      transform: `translate(${enterX + driftX}%, ${y}%)`,
                      opacity: 0.08 + t * 0.92,
                    }}
                  >
                    {line.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
