"use client";

/* Model: "Materials Variants Shoe" © Shopify, CC BY 4.0,
   via the Khronos glTF-Sample-Assets library. */

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls, useGLTF } from "@react-three/drei";
import type { Group, Mesh } from "three";

const MODEL = "/models/shoe.glb";

type VariantDef = { name: string };

/* eslint-disable @typescript-eslint/no-explicit-any */
function getVariants(gltf: any): VariantDef[] {
  try {
    return gltf.parser.json.extensions.KHR_materials_variants.variants;
  } catch {
    return [];
  }
}

function ShoeModel({ variant }: { variant: number }) {
  const gltf = useGLTF(MODEL) as any;
  const meshRef = useRef<Mesh | null>(null);
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    let found: Mesh | null = null;
    gltf.scene.traverse((o: any) => {
      if (o.isMesh && !found) found = o;
    });
    meshRef.current = found;
  }, [gltf]);

  useEffect(() => {
    const parser = gltf.parser;
    try {
      const mappings =
        parser.json.meshes[0].primitives[0].extensions.KHR_materials_variants
          .mappings;
      const m = mappings.find((mm: any) => mm.variants.includes(variant));
      if (m && meshRef.current) {
        parser.getDependency("material", m.material).then((mat: any) => {
          if (meshRef.current) {
            meshRef.current.material = mat;
            mat.needsUpdate = true;
          }
        });
      }
    } catch {
      /* variants unavailable — keep default material */
    }
  }, [variant, gltf]);

  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} scale={1.55} rotation={[0, 0.5, 0]} />
    </group>
  );
}

useGLTF.preload(MODEL);

export function ShoeConfigurator() {
  const [mounted, setMounted] = useState(false);
  const [variant, setVariant] = useState(0);
  const [variants, setVariants] = useState<VariantDef[]>([]);

  useEffect(() => setMounted(true), []);

  return (
    <div className="border border-line bg-ink2">
      <div className="relative h-[380px] md:h-[480px]">
        {mounted ? (
          <Canvas
            camera={{ position: [0.3, 0.9, 4.4], fov: 32 }}
            dpr={[1, 1.75]}
            onCreated={({ gl }) => void gl}
          >
            <ambientLight intensity={0.9} />
            <hemisphereLight intensity={0.5} color="#fff4ec" groundColor="#1a1a20" />
            <directionalLight position={[4, 6, 4]} intensity={1.7} />
            <directionalLight position={[-5, 3, -4]} intensity={0.7} color="#ffe0d0" />
            <VariantProbe onVariants={setVariants} />
            <ShoeModel variant={variant} />
            <ContactShadows
              position={[0, -0.82, 0]}
              opacity={0.55}
              scale={8}
              blur={2.2}
              far={2.2}
            />
            <OrbitControls
              autoRotate
              autoRotateSpeed={1.1}
              enablePan={false}
              minDistance={2.6}
              maxDistance={7}
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
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-widest text-mute">
            Colorway
          </span>
          <div className="flex flex-wrap gap-2">
            {(variants.length
              ? variants
              : [{ name: "midnight" }, { name: "beach" }, { name: "street" }]
            ).map((v, idx) => {
              const active = variant === idx;
              return (
                <button
                  key={v.name}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setVariant(idx)}
                  className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                    active
                      ? "border-signal text-signal"
                      : "border-line text-mute hover:border-bone hover:text-bone"
                  }`}
                >
                  {v.name}
                </button>
              );
            })}
          </div>
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-faint">
          Model: Shopify · CC BY 4.0 · Khronos glTF samples
        </p>
      </div>
    </div>
  );
}

function VariantProbe({
  onVariants,
}: {
  onVariants: (v: VariantDef[]) => void;
}) {
  const gltf = useGLTF(MODEL);
  useEffect(() => {
    onVariants(getVariants(gltf));
  }, [gltf, onVariants]);
  return null;
}
