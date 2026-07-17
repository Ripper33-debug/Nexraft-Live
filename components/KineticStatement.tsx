"use client";

import { useRef } from "react";
import { useScrollScene } from "@/lib/use-scroll-scene";

const LINES = [
  { text: "DESIGNED TO", dir: -1, accent: false },
  { text: "LOOK EXPENSIVE.", dir: 1, accent: false },
  { text: "BUILT TO", dir: -1, accent: false },
  { text: "OUTPERFORM.", dir: 1, accent: true },
];

/**
 * Full-viewport kinetic typography moment. As the visitor scrolls through the
 * over-tall pinned container, each oversized line masks up from the baseline,
 * slides in from an alternating side, then drifts and skews with scroll
 * velocity. Transforms are written straight to the DOM from an eased rAF loop
 * for smoothness. Reduced motion shows the lines settled and static.
 */
export function KineticStatement() {
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);

  const sceneRef = useScrollScene<HTMLElement>((progress, velocity) => {
    const skew = Math.max(-7, Math.min(7, velocity * 240));
    for (let i = 0; i < LINES.length; i++) {
      const el = lineRefs.current[i];
      if (!el) continue;
      const line = LINES[i];
      const t = Math.max(0, Math.min(1, progress * (LINES.length + 1) - i));
      const enterX = line.dir * (1 - t) * 14;
      const driftX = line.dir * (progress - 0.5) * 4;
      const y = (1 - t) * 110;
      el.style.transform = `translate(${enterX + driftX}%, ${y}%) skewX(${skew}deg)`;
      el.style.opacity = String(0.08 + t * 0.92);
    }
    if (glowRef.current) {
      glowRef.current.style.transform = `translate3d(${(progress - 0.5) * 22}%, ${(progress - 0.5) * 12}%, 0)`;
      glowRef.current.style.opacity = String(0.25 + Math.sin(progress * Math.PI) * 0.35);
    }
  });

  return (
    <section
      ref={sceneRef}
      aria-label="Designed to look expensive. Built to outperform."
      className="relative overflow-hidden bg-ink"
      style={{ height: "230vh" }}
    >
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden">
        <div
          ref={glowRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(67,208,133,0.18), transparent 68%)",
            filter: "blur(40px)",
            opacity: 0.25,
          }}
        />
        <div className="relative mx-auto w-full max-w-[1400px] px-7">
          <p className="mb-8 font-jetbrains text-[11px] uppercase leading-none tracking-[0.2em] text-signal/80">
            Why Nexraft
          </p>
          <div
            aria-hidden="true"
            className="font-display font-semibold uppercase leading-[0.92] tracking-[-0.04em]"
            style={{ fontSize: "clamp(2.4rem, 11vw, 10rem)" }}
          >
            {LINES.map((line, i) => (
              <div key={line.text} className="overflow-hidden">
                <span
                  ref={(el) => {
                    lineRefs.current[i] = el;
                  }}
                  className={`inline-block will-change-transform ${
                    line.accent ? "text-signal" : "text-bone"
                  }`}
                  style={{ transform: "translateY(110%)", opacity: 0.08 }}
                >
                  {line.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
