"use client";

import { useEffect, useRef } from "react";

const WORDS = [
  "WEB",
  "HOSTING",
  "3D",
  "AI TOOLS",
  "SEO",
  "MIGRATIONS",
  "GROWTH",
  "INFRASTRUCTURE",
];

/**
 * Scroll-reactive kinetic marquee. Idles at a steady drift, then speeds up and
 * skews with scroll velocity for a manayerbamate-style kinetic feel. Static
 * (no drift, no skew) when the visitor prefers reduced motion.
 */
export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const track = trackRef.current;
    if (!track || reduce.matches) return;

    let rafId = 0;
    let offset = 0;
    let lastScroll = window.scrollY;
    let velocity = 0;
    let half = track.scrollWidth / 2;

    const measure = () => {
      half = track.scrollWidth / 2;
    };
    measure();
    window.addEventListener("resize", measure);

    const loop = () => {
      const current = window.scrollY;
      const delta = current - lastScroll;
      lastScroll = current;
      // Ease the measured scroll delta toward zero for smooth decay.
      velocity += (delta - velocity) * 0.1;

      const base = 0.6; // idle drift (px/frame)
      const boost = velocity * 0.9;
      offset -= base + boost;

      // Wrap seamlessly (track holds two copies of the word list).
      if (offset <= -half) offset += half;
      if (offset > 0) offset -= half;

      const skew = Math.max(-8, Math.min(8, velocity * 0.35));
      track.style.transform = `translate3d(${offset}px, 0, 0) skewX(${skew}deg)`;

      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const sequence = [...WORDS, ...WORDS];

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-line bg-ink py-8 md:py-12"
    >
      <div
        ref={trackRef}
        className="flex w-max flex-nowrap items-center will-change-transform"
      >
        {sequence.map((word, i) => (
          <span key={`${word}-${i}`} className="flex items-center">
            <span
              className="whitespace-nowrap font-display font-semibold leading-none tracking-[-0.04em] text-bone/20"
              style={{ fontSize: "clamp(2.75rem, 8vw, 8rem)" }}
            >
              {word}
            </span>
            <span
              className="inline-block shrink-0 rounded-full bg-signal/60"
              style={{
                width: "clamp(8px, 0.9vw, 14px)",
                height: "clamp(8px, 0.9vw, 14px)",
                marginInline: "clamp(1.5rem, 3vw, 3.5rem)",
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
