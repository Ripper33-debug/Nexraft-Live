"use client";

import { useRef, type ReactNode } from "react";

type SpotlightCardProps = {
  className?: string;
  contentClassName?: string;
  tilt?: boolean;
  children: ReactNode;
};

export function SpotlightCard({
  className = "",
  contentClassName = "",
  tilt = false,
  children,
}: SpotlightCardProps) {
  const ref = useRef<HTMLElement>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);

    if (tilt && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg)`;
    }
  }

  function handlePointerLeave() {
    const el = ref.current;
    if (el && tilt) el.style.transform = "";
  }

  return (
    <article
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`spotlight-card ${tilt ? "transition-transform duration-300 [transform-style:preserve-3d]" : ""} ${className}`.trim()}
    >
      <span aria-hidden="true" className="spotlight-card-fill" />
      <span aria-hidden="true" className="spotlight-card-edge" />
      <div className={`relative z-[1] ${contentClassName}`.trim()}>{children}</div>
    </article>
  );
}
