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
      className={`fig-fallback relative h-[min(24vw,20rem)] w-full max-w-md border border-border ${
        loading ? "animate-pulse opacity-40" : ""
      }`}
      aria-hidden="true"
    >
      <p className="absolute right-3 top-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted/60">
        Scale 1:1
      </p>

      <svg
        ref={ref}
        viewBox="0 0 400 400"
        className="fig-diagram h-full w-full text-border"
        fill="none"
      >
        <g
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <rect x="40" y="40" width="320" height="320" stroke="currentColor" />
          <line x1="40" y1="200" x2="360" y2="200" stroke="currentColor" />
          <line x1="200" y1="40" x2="200" y2="360" stroke="currentColor" />
          <line
            x1="40"
            y1="120"
            x2="360"
            y2="280"
            stroke="currentColor"
            className="fig-flow-line"
          />
          <line
            x1="40"
            y1="280"
            x2="360"
            y2="120"
            stroke="currentColor"
            className="fig-flow-line"
            style={{ animationDelay: "1.5s" }}
          />

          <circle className="fig-node fig-node-center" cx="200" cy="200" r="6" fill="#3ddc84" />
          <circle className="fig-node" cx="120" cy="120" r="4" fill="#ffffff" fillOpacity="0.6" />
          <circle className="fig-node" cx="280" cy="120" r="4" fill="#ffffff" fillOpacity="0.6" />
          <circle className="fig-node" cx="120" cy="280" r="4" fill="#ffffff" fillOpacity="0.6" />
          <circle className="fig-node" cx="280" cy="280" r="4" fill="#ffffff" fillOpacity="0.6" />

          <path
            d="M120 120 L200 200 L280 120"
            stroke="#3ddc84"
            strokeWidth="1"
            strokeOpacity="0.5"
            className="fig-flow-line"
          />

          <text x="48" y="58" fill="#c7d2cb" fontSize="10" fontFamily="var(--font-geist-mono)">
            FIG.01
          </text>
          <text x="48" y="380" fill="#c7d2cb" fontSize="10" fontFamily="var(--font-geist-mono)">
            mesh / deploy / render
          </text>
        </g>
      </svg>
    </div>
  );
}
