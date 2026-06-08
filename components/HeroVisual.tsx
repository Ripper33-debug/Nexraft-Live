"use client";

import { useEffect, useRef, useState } from "react";

export function HeroVisual() {
  const ref = useRef<SVGSVGElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [coords, setCoords] = useState({ x: 0, y: 0 });

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

      setOffset({ x: nx * 18, y: ny * 14 });
      setCoords({
        x: Math.round(((e.clientX - rect.left) / rect.width) * 1000),
        y: Math.round(((e.clientY - rect.top) / rect.height) * 1000),
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="relative hidden lg:block" aria-hidden="true">
      <div className="absolute -right-4 top-0 font-mono text-[10px] tabular-nums text-muted/50">
        x{coords.x} y{coords.y}
      </div>

      <svg
        ref={ref}
        viewBox="0 0 400 400"
        className="h-[min(28vw,22rem)] w-full max-w-md text-border"
        fill="none"
      >
        <g
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <rect
            x="40"
            y="40"
            width="320"
            height="320"
            stroke="currentColor"
            strokeWidth="1"
          />
          <line x1="40" y1="200" x2="360" y2="200" stroke="currentColor" />
          <line x1="200" y1="40" x2="200" y2="360" stroke="currentColor" />
          <line x1="40" y1="120" x2="360" y2="280" stroke="currentColor" />
          <line x1="40" y1="280" x2="360" y2="120" stroke="currentColor" />

          <circle cx="200" cy="200" r="6" fill="#3ddc84" />
          <circle cx="120" cy="120" r="4" fill="#ffffff" fillOpacity="0.6" />
          <circle cx="280" cy="120" r="4" fill="#ffffff" fillOpacity="0.6" />
          <circle cx="120" cy="280" r="4" fill="#ffffff" fillOpacity="0.6" />
          <circle cx="280" cy="280" r="4" fill="#ffffff" fillOpacity="0.6" />

          <path
            d="M120 120 L200 200 L280 120"
            stroke="#3ddc84"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <path
            d="M120 280 L200 200 L280 280"
            stroke="#3ddc84"
            strokeWidth="1"
            strokeOpacity="0.35"
          />

          <text
            x="48"
            y="58"
            fill="#c7d2cb"
            fontSize="10"
            fontFamily="var(--font-geist-mono)"
          >
            FIG.01
          </text>
          <text
            x="48"
            y="380"
            fill="#c7d2cb"
            fontSize="10"
            fontFamily="var(--font-geist-mono)"
          >
            mesh / deploy / render
          </text>
        </g>
      </svg>

      <div className="mt-6 border-t border-border pt-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Pipeline status
        </p>
        <div className="mt-3 space-y-2">
          {[
            { label: "Build", pct: 100 },
            { label: "Deploy", pct: 100 },
            { label: "Monitor", pct: 97 },
          ].map((bar) => (
            <div key={bar.label} className="flex items-center gap-3">
              <span className="w-14 font-mono text-[10px] text-muted">
                {bar.label}
              </span>
              <div className="h-px flex-1 bg-border">
                <div
                  className="h-px bg-accent transition-all duration-1000"
                  style={{ width: `${bar.pct}%` }}
                />
              </div>
              <span className="w-8 font-mono text-[10px] tabular-nums text-muted">
                {bar.pct}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
