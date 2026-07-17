"use client";

import { useEffect, useRef, useState } from "react";

const STATEMENT =
  "We don't just build websites. We build the infrastructure that runs your business — fast, reliable, and fully yours.";

const WORDS = STATEMENT.split(" ");

/**
 * Pinned scroll-storytelling statement. As the visitor scrolls through the
 * over-tall outer container, the sticky inner text lights up word-by-word.
 * When reduced motion is preferred the full statement is shown lit and static.
 */
export function Manifesto() {
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

  // Map scroll progress across the words, finishing the reveal a touch early
  // so the last words aren't stuck dim at the very bottom of the pin.
  const lit = progress * (WORDS.length + 3);

  return (
    <section
      ref={outerRef}
      aria-label="What we build"
      className="relative bg-ink"
      style={reduced ? undefined : { height: "260vh" }}
    >
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1180px] px-7">
          <p className="mb-8 font-jetbrains text-[11px] uppercase leading-none tracking-[0.2em] text-signal/80">
            Our approach
          </p>
          <p className="max-w-[16ch] font-display text-4xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl md:max-w-[18ch] md:text-6xl lg:text-7xl">
            {WORDS.map((word, i) => {
              const t = Math.max(0, Math.min(1, lit - i));
              const opacity = 0.12 + t * 0.88;
              return (
                <span
                  key={`${word}-${i}`}
                  style={{ opacity }}
                  className="text-bone transition-opacity duration-200"
                >
                  {word}
                  {i < WORDS.length - 1 ? " " : ""}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
