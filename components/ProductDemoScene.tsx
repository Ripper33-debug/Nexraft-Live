"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { Group } from "three";

export type Finish = "matte" | "gloss";
export type ShelterLayout = "compact" | "field";

type FabricProps = {
  color: string;
  finish: Finish;
};

function fabricMaterial({ color, finish }: FabricProps) {
  const gloss = finish === "gloss";
  return {
    color,
    metalness: gloss ? 0.35 : 0.04,
    roughness: gloss ? 0.18 : 0.82,
  };
}

function ShelterModule({
  color,
  finish,
  width = 1.8,
  offsetX = 0,
}: FabricProps & { width?: number; offsetX?: number }) {
  const fabric = fabricMaterial({ color, finish });
  const frame = { color: "#566159", metalness: 0.72, roughness: 0.32 };
  const deck = { color: "#1E2723", metalness: 0.55, roughness: 0.45 };
  const depth = 1.15;
  const wallH = 0.72;
  const roofRise = 0.42;

  return (
    <group position={[offsetX, 0, 0]}>
      {/* Deck */}
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[width, 0.08, depth + 0.12]} />
        <meshStandardMaterial {...deck} />
      </mesh>

      {/* Frame legs */}
      {[
        [-width / 2 + 0.08, depth / 2 - 0.06],
        [width / 2 - 0.08, depth / 2 - 0.06],
        [-width / 2 + 0.08, -depth / 2 + 0.06],
        [width / 2 - 0.08, -depth / 2 + 0.06],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.38, z]}>
          <boxGeometry args={[0.05, 0.72, 0.05]} />
          <meshStandardMaterial {...frame} />
        </mesh>
      ))}

      {/* Side walls */}
      <mesh position={[-width / 2 + 0.03, 0.42, 0]}>
        <boxGeometry args={[0.04, wallH, depth]} />
        <meshStandardMaterial {...fabric} />
      </mesh>
      <mesh position={[width / 2 - 0.03, 0.42, 0]}>
        <boxGeometry args={[0.04, wallH, depth]} />
        <meshStandardMaterial {...fabric} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 0.42, -depth / 2 + 0.03]}>
        <boxGeometry args={[width - 0.08, wallH, 0.04]} />
        <meshStandardMaterial {...fabric} />
      </mesh>

      {/* Front door panel (slightly open) */}
      <group position={[-width / 2 + 0.04, 0.42, depth / 2 - 0.03]}>
        <mesh rotation={[0, 0.28, 0]} position={[width * 0.22, 0, 0]}>
          <boxGeometry args={[width * 0.44, wallH * 0.92, 0.035]} />
          <meshStandardMaterial {...fabric} />
        </mesh>
      </group>

      {/* Roof panels */}
      <mesh
        position={[-width * 0.18, 0.78 + roofRise * 0.35, 0]}
        rotation={[0, 0, 0.52]}
      >
        <boxGeometry args={[width * 0.58, 0.04, depth + 0.18]} />
        <meshStandardMaterial {...fabric} />
      </mesh>
      <mesh
        position={[width * 0.18, 0.78 + roofRise * 0.35, 0]}
        rotation={[0, 0, -0.52]}
      >
        <boxGeometry args={[width * 0.58, 0.04, depth + 0.18]} />
        <meshStandardMaterial {...fabric} />
      </mesh>

      {/* Ridge beam */}
      <mesh position={[0, 0.78 + roofRise * 0.72, 0]}>
        <boxGeometry args={[0.06, 0.06, depth + 0.1]} />
        <meshStandardMaterial {...frame} />
      </mesh>
    </group>
  );
}

function ShelterModel({
  color,
  finish,
  layout,
}: FabricProps & { layout: ShelterLayout }) {
  const group = useRef<Group>(null);

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      <ShelterModule color={color} finish={finish} width={1.85} offsetX={0} />
      {layout === "field" ? (
        <ShelterModule
          color={color}
          finish={finish}
          width={1.35}
          offsetX={1.55}
        />
      ) : null}
    </group>
  );
}

type ProductDemoSceneProps = {
  active?: boolean;
  color: string;
  finish: Finish;
  layout: ShelterLayout;
};

export default function ProductDemoScene({
  active = true,
  color,
  finish,
  layout,
}: ProductDemoSceneProps) {
  const camX = layout === "field" ? 3.4 : 2.6;

  return (
    <Canvas
      className="h-full w-full touch-none"
      camera={{ position: [camX, 1.55, 2.85], fov: 42 }}
      dpr={[1, 1.25]}
      gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      frameloop={active ? "always" : "demand"}
      onCreated={({ camera }) => camera.lookAt(layout === "field" ? 0.75 : 0, 0.35, 0)}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 7, 4]} intensity={1.15} />
      <directionalLight position={[-3, 4, -2]} intensity={0.35} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#0A0E0C" />
      </mesh>
      <ShelterModel color={color} finish={finish} layout={layout} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 4.5}
        maxPolarAngle={Math.PI / 1.9}
        rotateSpeed={0.6}
        target={layout === "field" ? [0.75, 0.35, 0] : [0, 0.35, 0]}
      />
    </Canvas>
  );
}
