"use client";

import { useEffect, useRef, useState } from "react";

type HeroFigFallbackProps = {
  loading?: boolean;
};

export function HeroFigFallback({ loading = false }: HeroFigFallbackProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!fine || reduced) return;

    const onMove = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      setOffset({ x: nx * 10, y: ny * 8 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className={`fig-fallback relative h-[min(28vw,24rem)] w-full ${
        loading ? "animate-pulse opacity-40" : ""
      }`}
      aria-hidden="true"
    >
      <svg
        ref={ref}
        viewBox="0 0 400 400"
        className="fig-diagram h-full w-full"
        fill="none"
      >
        <g
          stroke="#3ddc84"
          strokeWidth="0.75"
          strokeOpacity="0.65"
          style={{
            transform: `translate(${offset.x + 200}px, ${offset.y + 200}px)`,
            transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <g transform="translate(-200, -200)">
            <polygon points="200,72 290,130 260,230 140,230 110,130" />
            <polygon points="200,328 290,270 260,170 140,170 110,270" />
            <line x1="200" y1="72" x2="200" y2="328" strokeOpacity="0.45" />
            <line x1="110" y1="130" x2="290" y2="270" strokeOpacity="0.4" />
            <line x1="290" y1="130" x2="110" y2="270" strokeOpacity="0.4" />
            <line x1="140" y1="230" x2="260" y2="170" strokeOpacity="0.35" />
            <line x1="260" y1="230" x2="140" y2="170" strokeOpacity="0.35" />
            <line x1="200" y1="72" x2="260" y2="230" strokeOpacity="0.35" />
            <line x1="200" y1="72" x2="140" y2="230" strokeOpacity="0.35" />
            <line x1="290" y1="130" x2="140" y2="230" strokeOpacity="0.35" />
            <line x1="110" y1="130" x2="260" y2="230" strokeOpacity="0.35" />
            <line x1="200" y1="328" x2="260" y2="170" strokeOpacity="0.35" />
            <line x1="200" y1="328" x2="140" y2="170" strokeOpacity="0.35" />
            <line x1="290" y1="270" x2="140" y2="170" strokeOpacity="0.35" />
            <line x1="110" y1="270" x2="260" y2="170" strokeOpacity="0.35" />
          </g>
        </g>

        <circle
          cx="200"
          cy="200"
          r="2"
          fill="#3ddc84"
          fillOpacity="0.5"
          stroke="none"
        />
      </svg>
    </div>
  );
}
