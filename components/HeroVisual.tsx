"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { CountUpOnView } from "@/components/CountUpOnView";

const pipeline = [
  { label: "Build", pct: 100 },
  { label: "Deploy", pct: 100 },
  { label: "Monitor", pct: 97 },
] as const;

export function HeroVisual() {
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

      setOffset({ x: nx * 14, y: ny * 10 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="relative hidden lg:block" aria-hidden="true">
      <p className="absolute right-0 top-0 font-mono text-[10px] uppercase tracking-[0.2em] text-muted/60">
        Scale 1:1
      </p>

      <svg
        ref={ref}
        viewBox="0 0 400 400"
        className="fig-diagram h-[min(24vw,20rem)] w-full max-w-md text-border"
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

      <div className="mt-5 border-t border-border pt-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Pipeline status
        </p>
        <div className="mt-3 space-y-2">
          {pipeline.map((bar) => (
            <div key={bar.label} className="flex items-center gap-3">
              <span className="w-14 font-mono text-[10px] text-muted">
                {bar.label}
              </span>
              <div className="h-px flex-1 bg-border">
                <div
                  className="pipeline-bar h-px bg-accent"
                  style={{ "--target": `${bar.pct}%` } as CSSProperties}
                />
              </div>
              <span className="w-10 text-right font-mono text-[10px] tabular-nums text-muted">
                <CountUpOnView value={bar.pct} suffix="%" duration={1200} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
