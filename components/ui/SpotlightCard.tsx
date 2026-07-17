"use client";

import { useRef, type ReactNode } from "react";

type SpotlightCardProps = {
  className?: string;
  contentClassName?: string;
  children: ReactNode;
};

export function SpotlightCard({
  className = "",
  contentClassName = "",
  children,
}: SpotlightCardProps) {
  const ref = useRef<HTMLElement>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <article
      ref={ref}
      onPointerMove={handlePointerMove}
      className={`spotlight-card ${className}`.trim()}
    >
      <span aria-hidden="true" className="spotlight-card-fill" />
      <span aria-hidden="true" className="spotlight-card-edge" />
      <div className={`relative z-[1] ${contentClassName}`.trim()}>{children}</div>
    </article>
  );
}
