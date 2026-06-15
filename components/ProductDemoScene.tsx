"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { Group } from "three";

export type Finish = "matte" | "gloss";

function ProductModel({ color, finish }: { color: string; finish: Finish }) {
  const group = useRef<Group>(null);
  const gloss = finish === "gloss";
  const metalness = gloss ? 0.9 : 0.25;
  const roughness = gloss ? 0.12 : 0.6;

  return (
    <group ref={group} position={[0, -0.15, 0]}>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[1.6, 0.55, 1.05]} />
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.95, 1.05, 0.35, 24]} />
        <meshStandardMaterial
          color="#9EFF5B"
          metalness={0.4}
          roughness={0.45}
          emissive="#9EFF5B"
          emissiveIntensity={0.08}
        />
      </mesh>
      <mesh position={[0, -0.45, 0]}>
        <boxGeometry args={[1.9, 0.2, 1.35]} />
        <meshStandardMaterial color="#566159" metalness={0.65} roughness={0.28} />
      </mesh>
    </group>
  );
}

type ProductDemoSceneProps = {
  active?: boolean;
  color: string;
  finish: Finish;
};

export default function ProductDemoScene({
  active = true,
  color,
  finish,
}: ProductDemoSceneProps) {
  return (
    <Canvas
      className="h-full w-full touch-none"
      camera={{ position: [2.4, 1.6, 2.8], fov: 42 }}
      dpr={[1, 1.25]}
      gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      frameloop={active ? "always" : "demand"}
      onCreated={({ camera }) => camera.lookAt(0, 0.1, 0)}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 3]} intensity={1.1} />
      <ProductModel color={color} finish={finish} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.85}
        rotateSpeed={0.65}
      />
    </Canvas>
  );
}
