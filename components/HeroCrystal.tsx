"use client";

import { useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import * as THREE from "three";

type HeroCrystalProps = {
  active?: boolean;
  sectionRef: RefObject<HTMLElement | null>;
};

const SIGNAL = new THREE.Color("#43D085");

/**
 * A faceted, refractive crystal that sits dead-center as the hero centerpiece.
 * It idle-floats, tilts toward the pointer, and the camera dollies in / the
 * crystal spins as the visitor scrolls through the hero — an igloo-style
 * "the 3D is the page" moment. Reflections come from an in-scene lightformer
 * environment (no external HDR fetch), so it works fully offline.
 */
function Crystal({
  active,
  sectionRef,
}: {
  active: boolean;
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { camera, pointer } = useThree();

  // Displayed values eased toward targets for smoothness.
  const scroll = useRef(0);
  const camZ = useRef(6);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.35, 0), []);
  const coreGeometry = useMemo(
    () => new THREE.IcosahedronGeometry(0.5, 0),
    [],
  );

  const scrollTarget = () => {
    const el = sectionRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const denom = rect.height || window.innerHeight;
    return Math.min(Math.max(-rect.top / denom, 0), 1);
  };

  useFrame((_, delta) => {
    if (!active) return;
    const dt = Math.min(delta, 0.05);

    // Ease scroll progress + camera dolly (fly-through).
    scroll.current += (scrollTarget() - scroll.current) * 0.08;
    const targetZ = 6 - scroll.current * 3.1; // dolly from 6 -> ~2.9
    camZ.current += (targetZ - camZ.current) * 0.08;
    camera.position.z = camZ.current;
    camera.position.y = scroll.current * 0.6;
    camera.lookAt(0, 0, 0);

    const g = groupRef.current;
    if (g) {
      // Continuous slow spin, accelerated by scroll.
      g.rotation.y += dt * (0.25 + scroll.current * 1.4);
      // Tilt toward the pointer.
      g.rotation.x += (pointer.y * 0.35 - g.rotation.x) * 0.05;
      g.rotation.z += (-pointer.x * 0.2 - g.rotation.z) * 0.05;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y -= dt * 0.6;
      coreRef.current.rotation.x += dt * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[1.7, 0, 0]}>
      <Float
        speed={active ? 1.4 : 0}
        rotationIntensity={0.4}
        floatIntensity={0.7}
      >
        <mesh ref={meshRef} geometry={geometry}>
          <MeshTransmissionMaterial
            transmission={1}
            thickness={0.9}
            roughness={0.05}
            ior={1.55}
            chromaticAberration={0.4}
            anisotropy={0.25}
            distortion={0.3}
            distortionScale={0.4}
            temporalDistortion={0.12}
            color={"#eef8f2"}
            attenuationColor={"#8fe9bf"}
            attenuationDistance={6}
            background={new THREE.Color("#0A0E0C")}
          />
        </mesh>

        {/* Glowing inner core reads as the light source inside the gem. */}
        <mesh ref={coreRef} geometry={coreGeometry}>
          <meshBasicMaterial color={SIGNAL} toneMapped={false} />
        </mesh>
      </Float>
    </group>
  );
}

/**
 * In-scene lighting rig: bright lightformers give the crystal crisp specular
 * edges and something green to refract, with no external HDR dependency.
 */
function Rig() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 4]} intensity={1.1} />
      <Environment resolution={256}>
        <group rotation={[0, 0, 0]}>
          <Lightformer
            form="rect"
            intensity={3}
            color="#ffffff"
            position={[0, 3, 3]}
            scale={[6, 4, 1]}
          />
          <Lightformer
            form="rect"
            intensity={2.4}
            color="#43D085"
            position={[-4, -1, 2]}
            scale={[5, 5, 1]}
          />
          <Lightformer
            form="circle"
            intensity={2}
            color="#8fe9bf"
            position={[4, 2, -3]}
            scale={[4, 4, 1]}
          />
          <Lightformer
            form="rect"
            intensity={1.4}
            color="#ffffff"
            position={[0, -4, -2]}
            scale={[8, 4, 1]}
          />
        </group>
      </Environment>
    </>
  );
}

export default function HeroCrystal({
  active = true,
  sectionRef,
}: HeroCrystalProps) {
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const running = active && !reduced;

  return (
    <Canvas
      className="h-full w-full"
      camera={{ position: [0, 0, 6], fov: 42, near: 0.1, far: 100 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      frameloop={running ? "always" : "demand"}
    >
      <Rig />
      <Crystal active={running} sectionRef={sectionRef} />
    </Canvas>
  );
}
