"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroFigMesh() {
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
        opacity: 0.75,
      }),
    );

    const edgesInner = new THREE.EdgesGeometry(geometry);
    const inner = new THREE.LineSegments(
      edgesInner,
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.1,
      }),
    );
    inner.scale.setScalar(0.92);

    const group = new THREE.Group();
    group.add(wire);
    group.add(inner);
    scene.add(group);

    const mouse = { x: 0, y: 0 };
    let visible = true;
    let animId = 0;
    let lastFrame = 0;
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

      if (!reduced) {
        group.rotation.y += 0.0035 + mouse.x * 0.001;
        group.rotation.x += 0.0012 + mouse.y * 0.0008;
      }

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
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fig-canvas h-[min(24vw,20rem)] w-full max-w-md border border-border"
      aria-hidden="true"
    />
  );
}
