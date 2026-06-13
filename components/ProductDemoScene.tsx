"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { Group } from "three";

function ProductModel() {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.22;
    }
  });

  return (
    <group ref={group} position={[0, -0.15, 0]}>
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[1.6, 0.55, 1.05]} />
        <meshStandardMaterial
          color="#E8EDE9"
          metalness={0.55}
          roughness={0.32}
        />
      </mesh>
      <mesh position={[0, -0.05, 0]} castShadow>
        <cylinderGeometry args={[0.95, 1.05, 0.35, 32]} />
        <meshStandardMaterial
          color="#9EFF5B"
          metalness={0.4}
          roughness={0.45}
          emissive="#9EFF5B"
          emissiveIntensity={0.08}
        />
      </mesh>
      <mesh position={[0, -0.45, 0]} castShadow>
        <boxGeometry args={[1.9, 0.2, 1.35]} />
        <meshStandardMaterial
          color="#566159"
          metalness={0.65}
          roughness={0.28}
        />
      </mesh>
    </group>
  );
}

export default function ProductDemoScene() {
  return (
    <Canvas
      className="h-full w-full touch-none"
      camera={{ position: [2.4, 1.6, 2.8], fov: 42 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
      onCreated={({ camera }) => camera.lookAt(0, 0.1, 0)}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 3]} intensity={1.1} />
      <directionalLight position={[-3, 2, -2]} intensity={0.35} />
      <ProductModel />
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
