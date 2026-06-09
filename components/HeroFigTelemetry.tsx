"use client";

type HeroFigTelemetryProps = {
  rotY: number;
  cursorX: number;
  cursorY: number;
  vertCount: number;
  faceCount: number;
};

export function HeroFigTelemetry({
  rotY,
  cursorX,
  cursorY,
  vertCount,
  faceCount,
}: HeroFigTelemetryProps) {
  return (
    <div className="hero-fig-telemetry" aria-hidden="true">
      <div className="hero-fig-telemetry-row">
        <span>VERT</span>
        <span className="tabular-nums">{vertCount}</span>
      </div>
      <div className="hero-fig-telemetry-row">
        <span>FACE</span>
        <span className="tabular-nums">{faceCount}</span>
      </div>
      <div className="hero-fig-telemetry-row">
        <span>ROT.Y</span>
        <span className="tabular-nums">{rotY.toFixed(2)}</span>
      </div>
      <div className="hero-fig-telemetry-row">
        <span>PTR</span>
        <span className="tabular-nums">
          {cursorX.toFixed(2)},{cursorY.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
