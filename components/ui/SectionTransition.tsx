"use client";

import { useInView } from "@/lib/use-in-view";

/**
 * Thin choreographed seam placed between sections. When it scrolls into view a
 * signal-green highlight sweeps across, tying the page together as one
 * continuous scene. Purely decorative and static under reduced motion.
 */
export function SectionTransition() {
  const { ref, inView } = useInView<HTMLDivElement>({
    rootMargin: "-20% 0px -20% 0px",
    threshold: 0,
  });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`section-seam ${inView ? "is-in" : ""}`}
    />
  );
}
