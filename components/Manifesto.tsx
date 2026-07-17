"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollScene } from "@/lib/use-scroll-scene";

const STATEMENT =
  "We don't just build websites. We build the infrastructure that runs your business — fast, reliable, and fully yours.";

const WORDS = STATEMENT.split(" ");

/**
 * Pinned scroll-storytelling statement. As the visitor scrolls through the
 * over-tall outer container, the sticky inner text lights up word-by-word.
 * Word opacities are written straight to the DOM from an eased rAF loop so the
 * reveal stays smooth. Reduced motion shows the statement lit and static.
 */
export function Manifesto() {
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const sceneRef = useScrollScene<HTMLElement>((progress) => {
    // Map scroll progress across the words, finishing a touch early so the
    // last words aren't stuck dim at the very bottom of the pin.
    const lit = progress * (WORDS.length + 3);
    for (let i = 0; i < WORDS.length; i++) {
      const el = wordRefs.current[i];
      if (!el) continue;
      const t = Math.max(0, Math.min(1, lit - i));
      el.style.opacity = String(0.12 + t * 0.88);
    }
  });

  return (
    <section
      ref={sceneRef}
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
            {WORDS.map((word, i) => (
              <span
                key={`${word}-${i}`}
                ref={(el) => {
                  wordRefs.current[i] = el;
                }}
                style={{ opacity: 0.12 }}
                className="text-bone"
              >
                {word}
                {i < WORDS.length - 1 ? " " : ""}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
