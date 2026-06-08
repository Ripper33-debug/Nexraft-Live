"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type FigTelemetry = {
  rotY: number;
  cursorX: number;
  cursorY: number;
};

type HeroFigMeshProps = {
  active?: boolean;
  onTelemetry?: (data: FigTelemetry) => void;
};

export default function HeroFigMesh({
  active = true,
  onTelemetry,
}: HeroFigMeshProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const width = container.clientWidth;
    const height = Math.max(container.clientHeight, 300);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 3.6;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1.2, 1);
    const edges = new THREE.EdgesGeometry(geometry);

    const wire = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({
        color: 0x3ddc84,
        transparent: true,
        opacity: 0.78,
      }),
    );

    const innerGeo = new THREE.IcosahedronGeometry(1.05, 0);
    const innerEdges = new THREE.EdgesGeometry(innerGeo);
    const inner = new THREE.LineSegments(
      innerEdges,
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.14,
      }),
    );

    const vertices = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        color: 0x3ddc84,
        size: 3,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
      }),
    );

    const group = new THREE.Group();
    group.add(wire);
    group.add(inner);
    group.add(vertices);
    scene.add(group);

    const mouse = { x: 0, y: 0 };
    const rotation = { x: 0, y: 0, z: 0 };
    const target = { x: 0, y: 0 };
    let scaleCurrent = 0.86;
    let visible = true;
    let animId = 0;
    let lastFrame = 0;
    let telemetryTick = 0;
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
      const rotY = rotation.y + elapsed * 0.18;

      if (!reduced) {
        target.x = mouse.y * 0.28;
        target.y = mouse.x * 0.34;

        rotation.x += (target.x - rotation.x) * 0.08;
        rotation.y += (target.y - rotation.y) * 0.08;
        rotation.z += 0.0022;

        group.rotation.x = rotation.x;
        group.rotation.y = rotY;
        group.rotation.z = rotation.z;

        const pulse = 0.62 + Math.sin(elapsed * 2.6) * 0.18;
        wire.material.opacity = pulse;
        inner.material.opacity = 0.1 + Math.sin(elapsed * 2.6 + 0.5) * 0.06;
        vertices.material.opacity = 0.45 + Math.sin(elapsed * 2.6 + 1) * 0.2;
      }

      const scaleTarget = active ? 1 : 0.86;
      scaleCurrent += (scaleTarget - scaleCurrent) * 0.06;
      group.scale.setScalar(scaleCurrent);

      renderer.render(scene, camera);

      telemetryTick += 1;
      if (onTelemetry && telemetryTick % 2 === 0) {
        onTelemetry({
          rotY,
          cursorX: mouse.x,
          cursorY: mouse.y,
        });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    animId = requestAnimationFrame(animate);

    const onResize = () => {
      const w = container.clientWidth;
      const h = Math.max(container.clientHeight, 300);
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
      innerGeo.dispose();
      edges.dispose();
      innerEdges.dispose();
      (wire.material as THREE.Material).dispose();
      (inner.material as THREE.Material).dispose();
      (vertices.material as THREE.Material).dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [active, onTelemetry]);

  return (
    <div
      ref={containerRef}
      className="fig-canvas relative h-[min(28vw,24rem)] w-full"
      aria-hidden="true"
    />
  );
}
