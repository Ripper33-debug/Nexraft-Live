"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type FigTelemetry = {
  rotY: number;
  cursorX: number;
  cursorY: number;
  vertCount: number;
  faceCount: number;
};

type HeroFigR3FProps = {
  active?: boolean;
  onTelemetry?: (data: FigTelemetry) => void;
};

function FigMesh({
  active,
  onTelemetry,
}: {
  active: boolean;
  onTelemetry?: (data: FigTelemetry) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const pointer = useRef({ x: 0, y: 0 });

  const { wireGeo, innerWireGeo, cornerGeo, vertCount, faceCount } = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(1.2, 1);
    const inner = new THREE.IcosahedronGeometry(1.05, 0);
    const corners = new THREE.IcosahedronGeometry(1.2, 0);
    const faces = geometry.index
      ? geometry.index.count / 3
      : geometry.attributes.position.count / 3;

    return {
      wireGeo: new THREE.WireframeGeometry(geometry),
      innerWireGeo: new THREE.WireframeGeometry(inner),
      cornerGeo: corners,
      vertCount: geometry.attributes.position.count,
      faceCount: Math.floor(faces),
    };
  }, []);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group || !active) return;

    const speed = hovered ? 0.55 : 0.28;
    group.rotation.y += delta * speed;
    group.rotation.x = THREE.MathUtils.lerp(
      group.rotation.x,
      pointer.current.y * 0.22,
      0.08,
    );
    group.rotation.z = THREE.MathUtils.lerp(
      group.rotation.z,
      pointer.current.x * 0.08,
      0.08,
    );
    group.position.x = THREE.MathUtils.lerp(
      group.position.x,
      pointer.current.x * 0.12,
      0.06,
    );
    group.position.y = THREE.MathUtils.lerp(
      group.position.y,
      pointer.current.y * 0.1,
      0.06,
    );

    onTelemetry?.({
      rotY: group.rotation.y,
      cursorX: pointer.current.x,
      cursorY: pointer.current.y,
      vertCount,
      faceCount,
    });
  });

  return (
    <group
      ref={groupRef}
      onPointerMove={(e) => {
        pointer.current.x = (e.pointer.x - 0.5) * 2;
        pointer.current.y = (e.pointer.y - 0.5) * 2;
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => {
        setHovered(false);
        pointer.current.x = 0;
        pointer.current.y = 0;
      }}
    >
      <lineSegments geometry={wireGeo}>
        <lineBasicMaterial
          color="#3de08a"
          transparent
          opacity={0.72}
          depthWrite={false}
        />
      </lineSegments>
      <lineSegments geometry={innerWireGeo}>
        <lineBasicMaterial
          color="#e8edea"
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </lineSegments>
      <points geometry={cornerGeo}>
        <pointsMaterial
          color="#3de08a"
          size={0.035}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function HeroFigR3F({
  active = true,
  onTelemetry,
}: HeroFigR3FProps) {
  return (
    <div className="fig-canvas h-full min-h-[280px] w-full">
      <Canvas
        camera={{ position: [0, 0, 3.6], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <FigMesh active={active} onTelemetry={onTelemetry} />
        </Suspense>
      </Canvas>
    </div>
  );
}
