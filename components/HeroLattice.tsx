"use client";

import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";

type Props = {
  /** Render loop runs only while the hero is on screen. */
  active: boolean;
  sectionRef: RefObject<HTMLElement | null>;
};

/**
 * Scroll-driven WebGL backbone for the hero: an engineered particle lattice
 * flowing beneath a refractive "raft" monolith that shatters into the grid as
 * the visitor scrolls away. Replaces HeroCrystal. Colors are read from the
 * CSS custom properties (--color-signal / --color-bone / --color-ink) so the
 * ember/forest theme switch recolors the GL scene automatically.
 *
 * Conventions match the rest of the codebase: a single rAF loop, style/uniform
 * writes outside React, paused when `active` is false, torn down on unmount.
 */
export default function HeroLattice({ active, sectionRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const css = getComputedStyle(document.documentElement);
    const readColor = (name: string, fallback: string) => {
      const v = css.getPropertyValue(name).trim();
      return new THREE.Color(v || fallback);
    };
    const signal = readColor("--color-signal", "#43d085");
    const bone = readColor("--color-bone", "#e8ede9");
    const ink = readColor("--color-ink", "#0a0e0c");

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(ink.getHex(), 0.055);
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 1.2, 8);

    const uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uColorA: { value: bone },
      uColorB: { value: signal },
    };

    // --- particle lattice ---------------------------------------------------
    const COUNT = 9000;
    const grid = Math.ceil(Math.sqrt(COUNT));
    const pos = new Float32Array(COUNT * 3);
    const seed = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i += 1) {
      pos[i * 3] = ((i % grid) / grid - 0.5) * 42;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = (Math.floor(i / grid) / grid - 0.5) * 42;
      seed[i] = Math.random();
    }
    const latticeGeo = new THREE.BufferGeometry();
    latticeGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    latticeGeo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));

    const latticeMat = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        uniform float uTime; uniform float uScroll;
        attribute float aSeed; varying float vGlow;
        float n(vec2 p){ return sin(p.x)*cos(p.y); }
        void main(){
          vec3 p = position;
          float t = uTime*.35;
          float amp = 0.7 + uScroll*2.6;
          p.y += n(p.xz*.28 + t) * amp;
          p.y += n(p.xz*.75 - t*1.4) * amp*.35;
          p.y += sin(p.x*.12 + t*.7) * amp*.5;
          float ang = uScroll * .9;
          float c = cos(ang), s = sin(ang);
          p.xz = mat2(c,-s,s,c) * p.xz;
          vGlow = smoothstep(0.0, 2.2, p.y + 1.0) * (0.35 + aSeed*.65);
          vec4 mv = modelViewMatrix * vec4(p,1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = clamp((1.4 + aSeed*2.2) * (7.7 / -mv.z), 1.0, 4.5);
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uColorA; uniform vec3 uColorB; uniform float uScroll;
        varying float vGlow;
        void main(){
          vec2 uv = gl_PointCoord - .5;
          float d = length(uv);
          if(d > .5) discard;
          float a = smoothstep(.5,.05,d);
          vec3 col = mix(uColorA, uColorB, clamp(vGlow*.85 + uScroll*.3, 0.0, 1.0));
          gl_FragColor = vec4(col, a * (0.16 + vGlow*.5));
        }`,
    });
    const lattice = new THREE.Points(latticeGeo, latticeMat);
    scene.add(lattice);

    // --- refractive monolith ------------------------------------------------
    const monoGeo = new THREE.IcosahedronGeometry(2.1, 5);
    const monoMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: uniforms.uTime,
        uScroll: uniforms.uScroll,
        uSignal: { value: signal },
        uBone: { value: bone },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        uniform float uTime; uniform float uScroll;
        varying vec3 vN; varying vec3 vP; varying float vShatter;
        float hash(vec3 p){ return fract(sin(dot(p, vec3(127.1,311.7,74.7)))*43758.5453); }
        void main(){
          vec3 p = position;
          vec3 n = normal;
          float t = uTime;
          float ripple = sin(p.y*4.0 + t*1.2)*cos(p.x*3.0 - t*.8)*0.08
                       + sin(p.z*6.0 - t*1.7)*0.04;
          float sh = smoothstep(0.08, 0.85, uScroll);
          float rnd = hash(floor(position*3.0));
          p += n * (ripple + sh * (1.5 + rnd*4.5));
          p += (vec3(rnd, hash(position.zyx), hash(position.yxz)) - .5) * sh * 3.5;
          vShatter = sh;
          vN = normalize(normalMatrix * n);
          vec4 mv = modelViewMatrix * vec4(p,1.0);
          vP = mv.xyz;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: /* glsl */ `
        uniform float uTime; uniform vec3 uSignal; uniform vec3 uBone;
        varying vec3 vN; varying vec3 vP; varying float vShatter;
        void main(){
          vec3 V = normalize(-vP);
          vec3 N = normalize(vN);
          float fres = pow(1.0 - abs(dot(N,V)), 2.5);
          float band = sin(vP.y*9.0 + vP.x*5.0 + uTime*1.4)*.5+.5;
          vec3 col = mix(vec3(0.06,0.06,0.08), uBone, fres);
          col += uSignal * band * fres * 1.6;
          col += uSignal * pow(fres, 4.0) * 1.2;
          float alpha = (0.12 + fres*.85) * (1.0 - vShatter*.9);
          gl_FragColor = vec4(col, alpha);
        }`,
    });
    const mono = new THREE.Mesh(monoGeo, monoMat);
    mono.position.set(2.9, 1.6, -1.5);
    scene.add(mono);

    // --- sizing -------------------------------------------------------------
    const size = () => {
      const w = section.clientWidth;
      const h = section.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(section);

    // --- pointer ------------------------------------------------------------
    let mx = 0;
    let my = 0;
    const onPointer = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    // --- render loop --------------------------------------------------------
    const clock = new THREE.Clock();
    let shownScroll = 0;
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!activeRef.current) return;
      const t = clock.getElapsedTime();
      const rect = section.getBoundingClientRect();
      // 0 while the hero is fully in view, 1 once it has scrolled away.
      const target = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
      shownScroll += (target - shownScroll) * 0.06;

      uniforms.uTime.value = t;
      uniforms.uScroll.value = shownScroll;

      camera.position.y = 1.2 + shownScroll * -2.4 + Math.sin(t * 0.3) * 0.06;
      camera.position.z = 8 - shownScroll * 3.2;
      camera.position.x += (mx * 1.2 - camera.position.x) * 0.04;
      camera.lookAt(0, shownScroll * -1.2 + my * -0.6, 0);

      mono.rotation.y = t * 0.15 + mx * 0.7;
      mono.rotation.x = Math.sin(t * 0.2) * 0.15 + my * 0.5;
      mono.position.y = 1.6 + Math.sin(t * 0.5) * 0.2 - shownScroll * 3.0;
      mono.scale.setScalar(1 + shownScroll * 0.6);

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      ro.disconnect();
      latticeGeo.dispose();
      latticeMat.dispose();
      monoGeo.dispose();
      monoMat.dispose();
      renderer.dispose();
    };
  }, [sectionRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
