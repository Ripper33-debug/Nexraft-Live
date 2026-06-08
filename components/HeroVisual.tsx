"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type CSSProperties } from "react";
import { CountUp } from "@/components/CountUp";
import { HeroFigFallback } from "@/components/HeroFigFallback";

const HeroFigMesh = dynamic(() => import("@/components/HeroFigMesh"), {
  ssr: false,
  loading: () => <HeroFigFallback loading />,
});

const pipeline = [
  { label: "Build", pct: 100 },
  { label: "Deploy", pct: 100 },
  { label: "Monitor", pct: 97 },
] as const;

export function HeroVisual() {
  const [useWebGL, setUseWebGL] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const lg = window.matchMedia("(min-width: 1024px)").matches;
    setUseWebGL(lg && !reduced);
    setAnimate(true);
  }, []);

  return (
    <div className="hero-fig-enter relative w-full max-w-md" aria-hidden="true">
      <p className="absolute -top-1 right-0 z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-muted/60">
        Scale 1:1
      </p>

      <div className="relative">
        <p className="absolute left-3 top-3 z-10 font-mono text-[10px] text-muted">
          FIG.01
        </p>
        {useWebGL ? <HeroFigMesh /> : <HeroFigFallback />}
        <p className="mt-2 font-mono text-[10px] text-muted/80">
          mesh / deploy / render
        </p>
      </div>

      <div
        className={`hero-pipeline-enter mt-5 border-t border-border pt-4 ${
          animate ? "is-ready" : ""
        }`}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Pipeline status
        </p>
        <div className="mt-3 space-y-2">
          {pipeline.map((bar, i) => (
            <div key={bar.label} className="flex items-center gap-3">
              <span className="w-14 font-mono text-[10px] text-muted">
                {bar.label}
              </span>
              <div className="h-px flex-1 bg-border">
                <div
                  className="pipeline-bar hero-load-bar h-px bg-accent"
                  style={
                    {
                      "--target": `${bar.pct}%`,
                      "--delay": `${0.52 + i * 0.1}s`,
                    } as CSSProperties
                  }
                />
              </div>
              <span className="w-10 text-right font-mono text-[10px] tabular-nums text-muted">
                {animate ? (
                  <CountUp
                    key={bar.label}
                    value={bar.pct}
                    suffix="%"
                    duration={900 + i * 100}
                  />
                ) : (
                  "0%"
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
