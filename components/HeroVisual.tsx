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
  const [choreoReady, setChoreoReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const lg = window.matchMedia("(min-width: 1024px)").matches;
    setUseWebGL(lg && !reduced);

    const onReady = () => setChoreoReady(true);

    const root = document.documentElement;
    if (
      root.classList.contains("boot-complete") &&
      !root.classList.contains("boot-choreo")
    ) {
      onReady();
      return;
    }

    window.addEventListener("nexraft:boot-complete", onReady, { once: true });
    return () =>
      window.removeEventListener("nexraft:boot-complete", onReady);
  }, []);

  return (
    <div
      className={`hero-fig-enter relative w-full min-w-0 max-w-md ${
        choreoReady ? "is-choreo-ready" : ""
      }`}
      aria-hidden="true"
    >
      <p className="absolute -top-1 right-0 z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-muted/60">
        Scale 1:1
      </p>

      <div className="relative">
        <p className="absolute left-3 top-3 z-10 font-mono text-[10px] text-muted">
          FIG.01
        </p>
        {useWebGL ? <HeroFigMesh active={choreoReady} /> : <HeroFigFallback />}
        <p className="mt-2 font-mono text-[10px] text-muted/80">
          mesh / deploy / render
        </p>
      </div>

      <div
        className={`hero-pipeline-enter mt-5 border-t border-border pt-4 ${
          choreoReady ? "is-choreo-ready" : ""
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
                  className={`pipeline-bar h-px bg-accent ${
                    choreoReady ? "is-choreo-ready" : ""
                  }`}
                  style={
                    {
                      "--target": `${bar.pct}%`,
                      "--delay": `${0.08 + i * 0.12}s`,
                    } as CSSProperties
                  }
                />
              </div>
              <span className="w-10 text-right font-mono text-[10px] tabular-nums text-muted">
                {choreoReady ? (
                  <CountUp
                    key={bar.label}
                    value={bar.pct}
                    suffix="%"
                    duration={700 + i * 120}
                    delay={80 + i * 120}
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
