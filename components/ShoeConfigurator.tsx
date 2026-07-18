"use client";

import { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls, RoundedBox } from "@react-three/drei";

type PartKey = "sole" | "midsole" | "upper" | "laces" | "accent";

const PART_LABELS: Record<PartKey, string> = {
  sole: "Sole",
  midsole: "Midsole",
  upper: "Upper",
  laces: "Laces",
  accent: "Accent",
};

const DEFAULTS: Record<PartKey, string> = {
  sole: "#FF4D1C",
  midsole: "#F2EFE6",
  upper: "#E8EDE9",
  laces: "#0B0B0E",
  accent: "#0B0B0E",
};

const PALETTE = [
  "#E8EDE9", // bone
  "#F2EFE6", // sail
  "#0B0B0E", // ink
  "#FF4D1C", // signal orange
  "#43D085", // mint
  "#2B5BD7", // royal
  "#D7263D", // red
  "#C9A86A", // tan
  "#5A6B5F", // olive
  "#7D8491", // steel
];

function Shoe({ colors }: { colors: Record<PartKey, string> }) {
  return (
    <group rotation={[0, -0.6, 0]} position={[0, -0.55, 0]}>
      {/* outsole */}
      <RoundedBox args={[3.4, 0.3, 1.35]} radius={0.13} position={[0, 0.15, 0]}>
        <meshStandardMaterial color={colors.sole} roughness={0.9} />
      </RoundedBox>
      {/* midsole foam */}
      <RoundedBox args={[3.5, 0.36, 1.42]} radius={0.16} position={[0, 0.46, 0]}>
        <meshStandardMaterial color={colors.midsole} roughness={0.75} />
      </RoundedBox>
      {/* upper body */}
      <mesh position={[-0.28, 0.98, 0]} scale={[1.6, 0.62, 0.67]}>
        <sphereGeometry args={[1, 48, 32]} />
        <meshStandardMaterial color={colors.upper} roughness={0.85} />
      </mesh>
      {/* toe cap */}
      <mesh position={[1.08, 0.8, 0]} scale={[0.72, 0.42, 0.6]}>
        <sphereGeometry args={[1, 48, 32]} />
        <meshStandardMaterial color={colors.accent} roughness={0.6} />
      </mesh>
      {/* heel counter */}
      <mesh position={[-1.4, 1.0, 0]} scale={[0.48, 0.58, 0.6]}>
        <sphereGeometry args={[1, 48, 32]} />
        <meshStandardMaterial color={colors.accent} roughness={0.6} />
      </mesh>
      {/* side stripes */}
      {[0.62, -0.62].map((z) => (
        <RoundedBox
          key={z}
          args={[1.5, 0.16, 0.06]}
          radius={0.03}
          position={[-0.35, 0.92, z]}
          rotation={[0, 0, -0.12]}
        >
          <meshStandardMaterial color={colors.accent} roughness={0.5} />
        </RoundedBox>
      ))}
      {/* ankle collar */}
      <mesh position={[-0.82, 1.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.42, 0.14, 20, 40]} />
        <meshStandardMaterial color={colors.upper} roughness={0.9} />
      </mesh>
      {/* tongue */}
      <RoundedBox
        args={[1.0, 0.16, 0.5]}
        radius={0.07}
        position={[0.42, 1.28, 0]}
        rotation={[0, 0, 0.55]}
      >
        <meshStandardMaterial color={colors.upper} roughness={0.9} />
      </RoundedBox>
      {/* laces */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[0.78 - i * 0.34, 1.06 + i * 0.13, 0]}
          rotation={[Math.PI / 2, 0, 0.1]}
        >
          <cylinderGeometry args={[0.04, 0.04, 0.74, 16]} />
          <meshStandardMaterial color={colors.laces} roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

export function ShoeConfigurator() {
  const [mounted, setMounted] = useState(false);
  const [colors, setColors] = useState<Record<PartKey, string>>(DEFAULTS);

  useEffect(() => setMounted(true), []);

  const parts = useMemo(() => Object.keys(PART_LABELS) as PartKey[], []);

  const shuffle = () => {
    const pick = () => PALETTE[Math.floor(Math.random() * PALETTE.length)];
    setColors({
      sole: pick(),
      midsole: pick(),
      upper: pick(),
      laces: pick(),
      accent: pick(),
    });
  };

  return (
    <div className="border border-line bg-ink2">
      <div className="relative h-[380px] md:h-[460px]">
        {mounted ? (
          <Canvas
            camera={{ position: [0.4, 1.7, 5.4], fov: 34 }}
            dpr={[1, 1.75]}
          >
            <ambientLight intensity={0.55} />
            <directionalLight position={[4, 6, 4]} intensity={1.4} />
            <directionalLight position={[-5, 3, -4]} intensity={0.5} />
            <Shoe colors={colors} />
            <ContactShadows
              position={[0, -0.56, 0]}
              opacity={0.5}
              scale={9}
              blur={2.4}
              far={2.5}
            />
            <OrbitControls
              autoRotate
              autoRotateSpeed={1.1}
              enablePan={false}
              minDistance={3.4}
              maxDistance={8}
              minPolarAngle={0.6}
              maxPolarAngle={1.7}
            />
          </Canvas>
        ) : (
          <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-widest text-faint">
            Loading 3D…
          </div>
        )}
        <p className="pointer-events-none absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-widest text-faint">
          Drag to rotate · Scroll to zoom
        </p>
      </div>

      <div className="border-t border-line p-5 md:p-6">
        <div className="flex flex-col gap-4">
          {parts.map((part) => (
            <div
              key={part}
              className="flex flex-wrap items-center gap-3 border-b border-line pb-4 last:border-b-0 last:pb-0"
            >
              <span className="w-20 font-mono text-[11px] uppercase tracking-widest text-mute">
                {PART_LABELS[part]}
              </span>
              <div className="flex flex-wrap gap-2">
                {PALETTE.map((hex) => {
                  const active = colors[part] === hex;
                  return (
                    <button
                      key={hex}
                      type="button"
                      aria-label={`${PART_LABELS[part]} color ${hex}`}
                      aria-pressed={active}
                      onClick={() =>
                        setColors((c) => ({ ...c, [part]: hex }))
                      }
                      className={`h-6 w-6 rounded-full border transition-transform ${
                        active
                          ? "scale-110 border-bone outline outline-1 outline-offset-2 outline-signal"
                          : "border-line hover:scale-110"
                      }`}
                      style={{ backgroundColor: hex }}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={shuffle}
            className="border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-bone transition-colors hover:border-signal hover:text-signal"
          >
            Shuffle colorway
          </button>
          <button
            type="button"
            onClick={() => setColors(DEFAULTS)}
            className="border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-mute transition-colors hover:text-bone"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
