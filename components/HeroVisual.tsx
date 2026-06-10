"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { HeroFigFallback } from "@/components/HeroFigFallback";
import { HeroFigTelemetry } from "@/components/HeroFigTelemetry";
import type { FigTelemetry } from "@/components/HeroFigR3F";

const HeroFigR3F = dynamic(() => import("@/components/HeroFigR3F"), {
  ssr: false,
  loading: () => <HeroFigFallback loading />,
});

const pipeline = ["Build", "Deploy", "Monitor"] as const;

const defaultTelemetry: FigTelemetry = {
  rotY: 0,
  cursorX: 0,
  cursorY: 0,
  vertCount: 891,
  faceCount: 1600,
};

export function HeroVisual() {
  const [useWebGL, setUseWebGL] = useState(false);
  const [choreoReady, setChoreoReady] = useState(false);
  const [telemetry, setTelemetry] = useState(defaultTelemetry);

  const onTelemetry = useCallback((data: FigTelemetry) => {
    setTelemetry(data);
  }, []);

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
      className={`hero-fig-enter relative w-full min-w-0 max-w-lg ${
        choreoReady ? "is-choreo-ready" : ""
      }`}
      aria-hidden="true"
    >
      <div className="hero-fig-frame">
        <span className="hero-fig-corner hero-fig-corner-tl" />
        <span className="hero-fig-corner hero-fig-corner-tr" />
        <span className="hero-fig-corner hero-fig-corner-bl" />
        <span className="hero-fig-corner hero-fig-corner-br" />

        <div className="hero-fig-header">
          <div className="flex items-center gap-2">
            <span className="hero-fig-live" />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              FIG.01
            </p>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted/60">
            R3F / WebGL2
          </p>
        </div>

        <div className="hero-fig-stage relative">
          {useWebGL ? (
            <HeroFigR3F active={choreoReady} onTelemetry={onTelemetry} />
          ) : (
            <HeroFigFallback />
          )}
          {useWebGL && (
            <HeroFigTelemetry
              rotY={telemetry.rotY}
              cursorX={telemetry.cursorX}
              cursorY={telemetry.cursorY}
              vertCount={telemetry.vertCount}
              faceCount={telemetry.faceCount}
            />
          )}
          <div className="hero-fig-scan" />
        </div>

        <p className="mt-3 font-mono text-[10px] text-muted/80">
          mesh / deploy / render
        </p>
      </div>

      <div
        className={`hero-pipeline-enter mt-5 border-t border-border pt-4 ${
          choreoReady ? "is-choreo-ready" : ""
        }`}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Pipeline
        </p>
        <ul className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
          {pipeline.map((label, i) => (
            <li key={label} className="flex items-center gap-2">
              {i > 0 && (
                <span className="text-muted/40" aria-hidden="true">
                  /
                </span>
              )}
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
