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

const KNOT_RADIUS = 0.66;
const KNOT_TUBE = 0.22;
const KNOT_P = 2;
const KNOT_Q = 3;
const TRACER_COUNT = 3;
const KNOT_U_MAX = KNOT_P * Math.PI * 2;

/* Center curve of the torus knot - used to fly tracers along the structure */
function knotPoint(u: number, out: THREE.Vector3): THREE.Vector3 {
  const cu = Math.cos(u);
  const su = Math.sin(u);
  const quOverP = (KNOT_Q / KNOT_P) * u;
  const cs = Math.cos(quOverP);
  out.set(
    KNOT_RADIUS * (2 + cs) * 0.5 * cu,
    KNOT_RADIUS * (2 + cs) * su * 0.5,
    KNOT_RADIUS * Math.sin(quOverP) * 0.5,
  );
  return out;
}

function circleGeometry(radius: number, segments = 96): THREE.BufferGeometry {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
  }
  return new THREE.BufferGeometry().setFromPoints(pts);
}

function makeScanMaterial(baseOpacity: number, boost: number) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#3de08a") },
      uBright: { value: new THREE.Color("#cdffe4") },
      uBase: { value: baseOpacity },
      uBoost: { value: boost },
    },
    vertexShader: /* glsl */ `
      varying float vWorldY;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldY = wp.y;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform vec3 uColor;
      uniform vec3 uBright;
      uniform float uBase;
      uniform float uBoost;
      varying float vWorldY;
      void main() {
        float scanY = sin(uTime * 0.55) * 1.05;
        float band = 1.0 - smoothstep(0.0, 0.4, abs(vWorldY - scanY));
        vec3 col = mix(uColor, uBright, band);
        float alpha = uBase + band * uBoost;
        gl_FragColor = vec4(col, alpha);
      }
    `,
  });
}

function FigMesh({
  active,
  onTelemetry,
}: {
  active: boolean;
  onTelemetry?: (data: FigTelemetry) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);
  const ringARef = useRef<THREE.Group>(null);
  const ringBRef = useRef<THREE.Group>(null);
  const tracerRefs = useRef<(THREE.Mesh | null)[]>([]);
  const pointsMatRef = useRef<THREE.PointsMaterial>(null);
  const [hovered, setHovered] = useState(false);
  const pointer = useRef({ x: 0, y: 0 });
  const scanT = useRef(0);
  const tmpVec = useRef(new THREE.Vector3());

  const {
    knotWireGeo,
    knotPointsGeo,
    coreWireGeo,
    vertCount,
    faceCount,
    scanMat,
    coreMat,
    ringGeoA,
    ringGeoB,
  } = useMemo(() => {
    const knot = new THREE.TorusKnotGeometry(KNOT_RADIUS, KNOT_TUBE, 80, 10);
    const faces = knot.index
      ? knot.index.count / 3
      : knot.attributes.position.count / 3;

    const core = new THREE.IcosahedronGeometry(0.3, 1);

    return {
      knotWireGeo: new THREE.WireframeGeometry(knot),
      knotPointsGeo: knot,
      coreWireGeo: new THREE.WireframeGeometry(core),
      vertCount: knot.attributes.position.count,
      faceCount: Math.floor(faces),
      scanMat: makeScanMaterial(0.26, 0.6),
      coreMat: makeScanMaterial(0.5, 0.45),
      ringGeoA: circleGeometry(1.3),
      ringGeoB: circleGeometry(1.14),
    };
  }, []);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group || !active) return;

    const speedMul = hovered ? 1.9 : 1;
    scanT.current += delta * speedMul;

    scanMat.uniforms.uTime.value = scanT.current;
    coreMat.uniforms.uTime.value = scanT.current;

    group.rotation.y += delta * 0.22 * speedMul;
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

    if (spinRef.current) {
      spinRef.current.rotation.x += delta * 0.07 * speedMul;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * 0.55 * speedMul;
      coreRef.current.rotation.z += delta * 0.2 * speedMul;
    }

    if (ringARef.current) ringARef.current.rotation.y += delta * 0.26 * speedMul;
    if (ringBRef.current) ringBRef.current.rotation.y -= delta * 0.18 * speedMul;

    if (pointsMatRef.current) {
      pointsMatRef.current.size =
        0.02 + (Math.sin(scanT.current * 2.2) + 1) * 0.004;
    }

    for (let i = 0; i < TRACER_COUNT; i++) {
      const tracer = tracerRefs.current[i];
      if (!tracer) continue;
      const u =
        (scanT.current * 0.34 + (i * KNOT_U_MAX) / TRACER_COUNT) % KNOT_U_MAX;
      tracer.position.copy(knotPoint(u, tmpVec.current));
      const pulse = 0.8 + Math.sin(scanT.current * 3 + i * 2.1) * 0.2;
      tracer.scale.setScalar(pulse);
    }

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
      {/* Main structure - torus knot wireframe with scan shader */}
      <group ref={spinRef}>
        <lineSegments geometry={knotWireGeo} material={scanMat} />
        <points geometry={knotPointsGeo}>
          <pointsMaterial
            ref={pointsMatRef}
            color="#3de08a"
            size={0.02}
            transparent
            opacity={0.3}
            depthWrite={false}
            sizeAttenuation
          />
        </points>

        {/* Data tracers flying along the knot */}
        {Array.from({ length: TRACER_COUNT }).map((_, i) => (
          <mesh
            key={i}
            ref={(el) => {
              tracerRefs.current[i] = el;
            }}
          >
            <sphereGeometry args={[0.028, 12, 12]} />
            <meshBasicMaterial
              color="#cdffe4"
              transparent
              opacity={0.95}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* Counter-rotating core */}
      <group ref={coreRef}>
        <lineSegments geometry={coreWireGeo} material={coreMat} />
        <mesh>
          <sphereGeometry args={[0.045, 10, 10]} />
          <meshBasicMaterial
            color="#cdffe4"
            transparent
            opacity={0.9}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* Gyroscope rings */}
      <group rotation={[1.18, 0, 0.18]}>
        <group ref={ringARef}>
          <lineLoop geometry={ringGeoA}>
            <lineBasicMaterial
              color="#3de08a"
              transparent
              opacity={0.3}
              depthWrite={false}
            />
          </lineLoop>
        </group>
      </group>
      <group rotation={[-0.5, 0, -0.85]}>
        <group ref={ringBRef}>
          <lineLoop geometry={ringGeoB}>
            <lineBasicMaterial
              color="#3de08a"
              transparent
              opacity={0.2}
              depthWrite={false}
            />
          </lineLoop>
        </group>
      </group>
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
        camera={{ position: [0, 0, 3.65], fov: 40 }}
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
