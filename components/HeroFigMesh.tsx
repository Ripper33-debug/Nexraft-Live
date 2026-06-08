"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type HeroFigMeshProps = {
  active?: boolean;
};

export default function HeroFigMesh({ active = true }: HeroFigMeshProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const width = container.clientWidth;
    const height = Math.max(container.clientHeight, 280);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.z = 3.8;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1.15, 1);
    const edges = new THREE.EdgesGeometry(geometry);

    const wire = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({
        color: 0x3ddc84,
        transparent: true,
        opacity: 0.72,
      }),
    );

    const edgesInner = new THREE.EdgesGeometry(geometry);
    const inner = new THREE.LineSegments(
      edgesInner,
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.12,
      }),
    );
    inner.scale.setScalar(0.92);

    const group = new THREE.Group();
    group.add(wire);
    group.add(inner);
    scene.add(group);

    const mouse = { x: 0, y: 0 };
    const rotation = { x: 0, y: 0, z: 0 };
    const target = { x: 0, y: 0 };
    let scaleCurrent = 0.86;
    let visible = true;
    let animId = 0;
    let lastFrame = 0;
    const startTime = performance.now();
    const frameInterval = 1000 / 30;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    observer.observe(container);

    const animate = (now: number) => {
      animId = requestAnimationFrame(animate);
      if (!visible || now - lastFrame < frameInterval) return;
      lastFrame = now;

      const elapsed = (now - startTime) / 1000;

      if (!reduced) {
        target.x = mouse.y * 0.22;
        target.y = mouse.x * 0.28;

        rotation.x += (target.x - rotation.x) * 0.07;
        rotation.y += (target.y - rotation.y) * 0.07;
        rotation.z += 0.0018;

        group.rotation.x = rotation.x;
        group.rotation.y = rotation.y + elapsed * 0.18;
        group.rotation.z = rotation.z;

        const pulse = 0.58 + Math.sin(elapsed * 2.4) * 0.17;
        wire.material.opacity = pulse;
        inner.material.opacity = 0.08 + Math.sin(elapsed * 2.4 + 0.6) * 0.05;
      }

      const scaleTarget = active ? 1 : 0.86;
      scaleCurrent += (scaleTarget - scaleCurrent) * 0.06;
      group.scale.setScalar(scaleCurrent);

      renderer.render(scene, camera);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    animId = requestAnimationFrame(animate);

    const onResize = () => {
      const w = container.clientWidth;
      const h = Math.max(container.clientHeight, 280);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      edges.dispose();
      edgesInner.dispose();
      (wire.material as THREE.Material).dispose();
      (inner.material as THREE.Material).dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [active]);

  return (
    <div
      ref={containerRef}
      className="fig-canvas h-[min(26vw,22rem)] w-full max-w-md border border-border"
      aria-hidden="true"
    />
  );
}
