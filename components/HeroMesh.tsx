"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

const SEGMENTS = 120;
const PLANE_W = 52;
const PLANE_D = 110;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseStrength;

  varying float vHeight;
  varying vec2 vUv;
  varying float vMouseDist;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Centered, scale-independent coordinates (~[-1, 1])
    vec2 c = (uv - 0.5) * 2.0;
    float t = uTime;

    // Layered sin/cos terrain (amplitudes give clear relief at rest)
    float w = 0.0;
    w += sin(c.x * 3.0 + t * 0.8) * 0.7;
    w += cos(c.y * 2.4 - t * 0.6) * 0.7;
    w += sin((c.x + c.y) * 2.0 + t * 0.5) * 0.45;
    w += cos((c.x - c.y) * 1.6 - t * 0.4) * 0.35;

    // Gaussian ripple pulled toward the pointer (uv space)
    float d = distance(uv, uMouse);
    vMouseDist = d;
    float g = exp(-d * d * 40.0) * uMouseStrength;
    w += sin(d * 60.0 - t * 5.0) * g * 0.9; // expanding rings
    w += g * 1.6;                           // lift toward the pointer

    pos.z += w; // displace along the plane normal
    vHeight = w;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;

  uniform vec2 uMouse;
  uniform float uMouseStrength;

  varying float vHeight;
  varying vec2 vUv;
  varying float vMouseDist;

  void main() {
    vec3 signal = vec3(0.620, 1.000, 0.357); // #9EFF5B
    vec3 bone = vec3(0.910, 0.929, 0.914);   // #E8EDE9

    // Height-driven relief: crests brighter than troughs (ambient, no pointer).
    float relief = clamp(vHeight * 0.42 + 0.5, 0.0, 1.0);

    // Pointer proximity -> green bloom accent on top of the bone base.
    float prox = exp(-vMouseDist * vMouseDist * 30.0) * uMouseStrength;
    prox = clamp(prox, 0.0, 1.0);

    // Resting color is bone (markedly brighter on crests); green only near pointer.
    vec3 col = bone * (0.88 + relief * 0.55);
    col = mix(col, signal, smoothstep(0.05, 0.6, prox));

    // Subtle left/right border fade only.
    float sideFade =
      smoothstep(0.0, 0.05, vUv.x) * smoothstep(0.0, 0.05, 1.0 - vUv.x);

    // Keep the grid strong deep into the scene; soft fade only near the horizon.
    float depth = mix(1.0, 0.72, smoothstep(0.82, 1.0, vUv.y));

    float baseAlpha = 0.48 + relief * 0.32;
    float alpha = (baseAlpha + prox * 0.55) * sideFade * depth;
    alpha = clamp(alpha, 0.0, 0.98);

    gl_FragColor = vec4(col, alpha);
  }
`;

function Terrain({ reduced }: { reduced: boolean }) {
  const target = useRef(new THREE.Vector2(0.5, 0.5));
  const current = useRef(new THREE.Vector2(0.5, 0.5));
  const strengthTarget = useRef(0);
  const strength = useRef(0);

  const geometry = useMemo(
    () => new THREE.PlaneGeometry(PLANE_W, PLANE_D, SEGMENTS, SEGMENTS),
    [],
  );

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        wireframe: true,
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uMouseStrength: { value: 0 },
        },
        vertexShader,
        fragmentShader,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((_, delta) => {
    // Clamp delta so a backgrounded tab does not jump the animation.
    const dt = Math.min(delta, 0.05);
    if (!reduced) {
      material.uniforms.uTime.value += dt;
      current.current.lerp(target.current, 0.08);
      strength.current = THREE.MathUtils.lerp(
        strength.current,
        strengthTarget.current,
        0.06,
      );
    }
    material.uniforms.uMouse.value.copy(current.current);
    material.uniforms.uMouseStrength.value = strength.current;
  });

  const handleMove = (event: ThreeEvent<PointerEvent>) => {
    if (reduced || !event.uv) return;
    target.current.set(event.uv.x, event.uv.y);
    strengthTarget.current = 1;
  };

  const handleOut = () => {
    strengthTarget.current = 0;
  };

  return (
    <mesh
      geometry={geometry}
      material={material}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2.2, -28]}
      onPointerMove={handleMove}
      onPointerOut={handleOut}
    />
  );
}

export default function HeroMesh() {
  // ssr:false means this only renders on the client, so matchMedia is safe here.
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  return (
    <Canvas
      className="h-full w-full"
      camera={{ position: [0, 3.2, 9], fov: 58, near: 0.1, far: 200 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
      onCreated={({ camera }) => camera.lookAt(0, -1.2, -18)}
    >
      <Terrain reduced={reduced} />
    </Canvas>
  );
}
