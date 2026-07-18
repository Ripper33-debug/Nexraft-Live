"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BOOK_CALL_URL } from "@/lib/site";

/*
 * The rebuilt one-page homepage, ported 1:1 from the static build
 * (nexraft-site/index.html + css/style.css + js/main.js).
 * Markup and animation code are kept verbatim where possible; the only
 * intentional content changes are the 48-hour turnaround copy and real
 * footer/booking links.
 */

const CONTACT_EMAIL = "barry@nexraft.com";
const BOOKING_URL = BOOK_CALL_URL;

export function HomeRebuild() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    document.body.classList.add("nxr-home");
    gsap.registerPlugin(ScrollTrigger);
    // Mobile browsers fire resize when the URL bar collapses; refreshing
    // mid-scroll reverts in-flight reveal tweens and leaves text half-shown.
    ScrollTrigger.config({ ignoreMobileResize: true });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const $ = <T extends Element = HTMLElement>(sel: string) =>
      root.querySelector<T>(sel);
    const $$ = <T extends Element = HTMLElement>(sel: string) =>
      Array.from(root.querySelectorAll<T>(sel));

    const rafIds: number[] = [];
    const intervals = new Set<ReturnType<typeof setInterval>>();
    const winListeners: Array<[string, EventListenerOrEventListenerObject]> = [];
    const on = (type: string, fn: EventListenerOrEventListenerObject) => {
      window.addEventListener(type, fn);
      winListeners.push([type, fn]);
    };

    /* ================= WebGL backbone ================= */
    let scrollProg = 0;
    const canvas = $("#gl") as HTMLCanvasElement;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(innerWidth, innerHeight);
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080b, 0.055);
    const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 100);
    camera.position.set(0, 1.2, 8);

    // particle field — "the raft grid"
    const COUNT = innerWidth < 760 ? 4500 : 9000;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(COUNT * 3);
    const seed = new Float32Array(COUNT);
    const GRID = Math.ceil(Math.sqrt(COUNT));
    for (let i = 0; i < COUNT; i++) {
      const gx = (i % GRID) / GRID - 0.5,
        gz = Math.floor(i / GRID) / GRID - 0.5;
      pos[i * 3] = gx * 42;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = gz * 42;
      seed[i] = Math.random();
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));

    // Component-constructor colors: bypasses three's color management so the
    // shader receives the exact sRGB values the r128 build used.
    const uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uColorA: { value: new THREE.Color(233 / 255, 229 / 255, 219 / 255) },
      uColorB: { value: new THREE.Color(255 / 255, 77 / 255, 28 / 255) },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
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
          gl_PointSize = (1.4 + aSeed*2.2) * (140.0 / -mv.z) * 0.055 * (100.0);
          gl_PointSize = clamp(gl_PointSize, 1.0, 4.5);
        }`,
      fragmentShader: `
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
    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // signature object — refractive "raft" monolith that shatters on scroll
    const monoUniforms = {
      uTime: uniforms.uTime,
      uScroll: uniforms.uScroll,
      uSignal: { value: new THREE.Color(255 / 255, 77 / 255, 28 / 255) },
      uBone: { value: new THREE.Color(233 / 255, 229 / 255, 219 / 255) },
    };
    const monoGeo = new THREE.IcosahedronGeometry(2.1, 5);
    const monoMat = new THREE.ShaderMaterial({
      uniforms: monoUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        uniform float uTime; uniform float uScroll;
        varying vec3 vN; varying vec3 vP; varying float vShatter;
        float hash(vec3 p){ return fract(sin(dot(p, vec3(127.1,311.7,74.7)))*43758.5453); }
        void main(){
          vec3 p = position;
          vec3 n = normal;
          float t = uTime;
          float ripple = sin(p.y*4.0 + t*1.2)*cos(p.x*3.0 - t*.8)*0.08
                       + sin(p.z*6.0 - t*1.7)*0.04;
          float sh = smoothstep(0.04, 0.45, uScroll);
          float rnd = hash(floor(position*3.0));
          p += n * (ripple + sh * (1.5 + rnd*4.5));
          p += (vec3(rnd, hash(position.zyx), hash(position.yxz)) - .5) * sh * 3.5;
          vShatter = sh;
          vN = normalize(normalMatrix * n);
          vec4 mv = modelViewMatrix * vec4(p,1.0);
          vP = mv.xyz;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
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

    const onResize = () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    };
    on("resize", onResize);

    let mx = 0,
      my = 0;
    const onMouse = (e: MouseEvent) => {
      mx = e.clientX / innerWidth - 0.5;
      my = e.clientY / innerHeight - 0.5;
    };
    on("mousemove", onMouse as EventListener);

    const clock = new THREE.Clock();
    let glPaused = false,
      glFrames = 0;
    const tick = () => {
      rafIds[0] = requestAnimationFrame(tick);
      if (glPaused) return; // tab hidden: skip work
      if (reduced && glFrames++ > 3) return; // reduced motion: settle on a static frame
      const t = clock.getElapsedTime();
      uniforms.uTime.value = t;
      uniforms.uScroll.value += (scrollProg - uniforms.uScroll.value) * 0.05;
      const sp = uniforms.uScroll.value;
      camera.position.y = 1.2 + sp * -2.4 + Math.sin(t * 0.3) * 0.06;
      camera.position.z = 8 - sp * 3.2;
      camera.position.x += (mx * 1.2 - camera.position.x) * 0.04;
      camera.lookAt(0, sp * -1.2 + my * -0.6, 0);
      mono.rotation.y = t * 0.15 + mx * 0.7;
      mono.rotation.x = Math.sin(t * 0.2) * 0.15 + my * 0.5;
      mono.position.y = 1.6 + Math.sin(t * 0.5) * 0.2 - sp * 3.0;
      mono.scale.setScalar(1 + sp * 0.6);
      renderer.render(scene, camera);
    };
    tick();

    const onVisibility = () => {
      glPaused = document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    /* ================= GSAP scene (scoped context) ================= */
    // Watchdog registry: every scroll reveal is tracked, and if one is on
    // screen but not advancing (missed trigger, refresh mid-flight, stalled
    // ticker) it gets forced to its finished state so text is never left
    // half-revealed and blurry.
    const watched: Array<{ el: Element; tween: gsap.core.Tween; last: number }> = [];
    const watch = (el: Element, tween: gsap.core.Tween) => {
      watched.push({ el, tween, last: -1 });
      return tween;
    };

    const ctx = gsap.context(() => {
      // global scroll progress drives the scene
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => (scrollProg = self.progress),
      });

      /* ================= preloader = opening scene ================= */
      const pct = { v: 0 };
      const loaderTl = gsap.timeline();
      loaderTl
        .to("#loaderWord", { y: 0, duration: 0.9, ease: "power4.out", delay: 0.15 })
        .to(
          pct,
          {
            v: 100,
            duration: 1.6,
            ease: "power2.inOut",
            onUpdate() {
              const pctEl = $("#loaderPct");
              const fillEl = $("#loaderFill");
              if (pctEl) pctEl.textContent = String(Math.round(pct.v)).padStart(3, "0");
              if (fillEl) (fillEl as HTMLElement).style.transform = `scaleX(${pct.v / 100})`;
            },
          },
          "-=.4",
        )
        .to("#loader", { yPercent: -100, duration: 0.9, ease: "power4.inOut" })
        .set("#loader", { display: "none" })
        .add(heroIn, "-=.55")
        // re-measure triggers once the opening scene has settled
        .call(() => ScrollTrigger.refresh());

      function heroIn() {
        gsap.to(".hero .line > span", {
          yPercent: 0,
          duration: 1.1,
          stagger: 0.09,
          ease: "power4.out",
          onComplete() {
            gsap.set(".hero .line > span", { clearProps: "all" });
          },
        });
        gsap.to(".hero .reveal", {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.3,
          onComplete() {
            $$(".hero .reveal").forEach((el) => el.classList.add("on"));
            gsap.set(".hero .reveal", { clearProps: "all" });
          },
        });
      }
      gsap.set(".hero .line > span", { yPercent: 110 });

      /* ================= scroll reveals ================= */
      $$("section:not(.hero) .reveal, footer .reveal").forEach((el) => {
        watch(
          el,
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            onComplete() {
              // settle into a plain CSS state so the browser re-rasterizes
              // the text sharp (no lingering transform/opacity layers)
              el.classList.add("on");
              gsap.set(el, { clearProps: "all" });
            },
          }),
        );
      });

      /* ================= character-level typography ================= */
      function splitChars(el: Element) {
        const walk = (node: Element) => {
          [...node.childNodes].forEach((child) => {
            if (child.nodeType === 3) {
              const frag = document.createDocumentFragment();
              [...(child.textContent ?? "")].forEach((ch) => {
                if (ch.trim() === "") {
                  frag.appendChild(document.createTextNode(ch));
                } else {
                  const s = document.createElement("span");
                  s.className = "char";
                  s.textContent = ch;
                  frag.appendChild(s);
                }
              });
              node.replaceChild(frag, child);
            } else if (child.nodeType === 1 && (child as Element).tagName !== "BR") {
              walk(child as Element);
            }
          });
        };
        walk(el);
        return el.querySelectorAll(".char");
      }

      // headlines outside hero: per-letter 3D cascade
      $$("section:not(.hero) h2").forEach((h) => {
        if (reduced) return;
        const chars = splitChars(h);
        watch(
          h,
          gsap.from(chars, {
            yPercent: 120,
            opacity: 0,
            rotationX: -50,
            transformOrigin: "center bottom",
            duration: 0.9,
            stagger: 0.02,
            ease: "power4.out",
            scrollTrigger: { trigger: h, start: "top 85%", once: true },
            onComplete() {
              gsap.set(chars, { clearProps: "all" });
            },
          }),
        );
      });

      // kickers: terminal-style scramble decode
      const GLYPHS = "█▓▒░<>/\\|=+*#NEXRAFT01";
      if (!reduced)
        $$(".kicker").forEach((k) => {
          const tn = [...k.childNodes].find((n) => n.nodeType === 3 && n.textContent?.trim());
          if (!tn) return;
          const finalText = tn.textContent ?? "";
          ScrollTrigger.create({
            trigger: k,
            start: "top 92%",
            once: true,
            onEnter() {
              let frame = 0;
              const total = 32;
              const iv = setInterval(() => {
                frame++;
                const prog = frame / total;
                tn.textContent = [...finalText]
                  .map((ch, i) =>
                    i / finalText.length < prog || ch === " "
                      ? ch
                      : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
                  )
                  .join("");
                if (frame >= total) {
                  tn.textContent = finalText;
                  clearInterval(iv);
                  intervals.delete(iv);
                }
              }, 28);
              intervals.add(iv);
            },
          });
        });

      // giant footer logo: hover wave
      const giant = $(".foot-giant");
      if (giant) {
        const giantChars = splitChars(giant);
        if (!reduced)
          giant.addEventListener("mouseenter", () => {
            gsap.fromTo(
              giantChars,
              { y: 0 },
              { y: -20, duration: 0.32, stagger: { each: 0.028 }, ease: "power2.out", yoyo: true, repeat: 1 },
            );
          });
      }

      /* ================= cinematic section transitions ================= */
      // services: pinned horizontal scroll chapter (desktop only)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 901px)", () => {
        const list = $(".svc-list");
        const sec = $("#services");
        if (!list || !sec) return;
        gsap.to(list, {
          x: () => -(list.scrollWidth - sec.clientWidth + 140),
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top top",
            end: "+=1700",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      // case studies: full-bleed wipe reveals
      $$(".work-visual").forEach((v, i) => {
        watch(
          v,
          gsap.from(v, {
            clipPath: i % 2 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: { trigger: v, start: "top 82%", once: true },
            onComplete() {
              gsap.set(v, { clearProps: "clipPath" });
            },
          }),
        );
      });

      // pricing: 3D perspective fly-in
      const grid = $(".price-grid");
      if (grid)
        watch(
          grid,
          gsap.from(".plan", {
            rotationX: 38,
            z: -90,
            transformPerspective: 900,
            transformOrigin: "center bottom",
            duration: 1.2,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: grid, start: "top 82%", once: true },
            onComplete() {
              gsap.set(".plan", { clearProps: "transform,transformPerspective" });
            },
          }),
        );

      /* ================= marquee ================= */
      if (!reduced) {
        gsap.to("#marquee", { xPercent: -50, duration: 26, ease: "none", repeat: -1 });
      }

      /* ================= magnetic buttons ================= */
      $$(".btn").forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
          const ev = e as MouseEvent;
          const r = btn.getBoundingClientRect();
          gsap.to(btn, {
            x: (ev.clientX - r.left - r.width / 2) * 0.25,
            y: (ev.clientY - r.top - r.height / 2) * 0.35,
            duration: 0.4,
          });
        });
        btn.addEventListener("mouseleave", () =>
          gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,.4)" }),
        );
      });
    }, root);

    // Watchdog sweep: if a reveal is in the viewport but its tween hasn't
    // advanced since the last sweep (missed trigger or stalled mid-flight),
    // jump it straight to the finished state. Runs on a plain interval so it
    // works even if the animation ticker itself is what stalled.
    const watchdog = setInterval(() => {
      const vh = window.innerHeight;
      for (const w of watched) {
        const p = w.tween.progress();
        if (p >= 1) continue;
        const r = w.el.getBoundingClientRect();
        const inView = r.top < vh * 0.9 && r.bottom > 0;
        if (inView && p === w.last) w.tween.progress(1);
        w.last = w.tween.progress();
      }
    }, 700);
    intervals.add(watchdog);

    // Archivo Expanded loads late and shifts layout; re-measure all trigger
    // positions once fonts are in so nothing fires from a stale offset.
    let disposed = false;
    document.fonts?.ready.then(() => {
      if (!disposed) ScrollTrigger.refresh();
    });

    /* ================= custom cursor ================= */
    const cursor = $("#cursor");
    const clabel = $("#cursorLabel");
    let cx = innerWidth / 2,
      cy = innerHeight / 2,
      tx = cx,
      ty = cy;
    const onCursorMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    on("mousemove", onCursorMove as EventListener);
    const cloop = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      if (cursor) cursor.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      if (clabel) clabel.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      rafIds[1] = requestAnimationFrame(cloop);
    };
    cloop();
    $$("a, button, [data-hover]").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor?.classList.add("is-hover");
        const label = el.getAttribute("data-cursor");
        if (label && clabel) {
          clabel.textContent = label;
          clabel.style.opacity = "1";
        }
      });
      el.addEventListener("mouseleave", () => {
        cursor?.classList.remove("is-hover");
        if (clabel) clabel.style.opacity = "0";
      });
    });

    /* ================= FAQ accordion (accessible) ================= */
    $$(".faq-item").forEach((item, i) => {
      const q = item.querySelector<HTMLButtonElement>(".faq-q");
      const a = item.querySelector<HTMLElement>(".faq-a");
      if (!q || !a) return;
      a.id = "faq-panel-" + i;
      q.setAttribute("aria-expanded", "false");
      q.setAttribute("aria-controls", a.id);
      q.addEventListener("click", () => {
        const open = item.classList.toggle("open");
        q.setAttribute("aria-expanded", String(open));
        a.style.maxHeight = open ? a.scrollHeight + "px" : "0";
      });
    });

    /* ================= booking + contact form ================= */
    if (BOOKING_URL) {
      $$("a.btn").forEach((a) => {
        if (/book a call/i.test(a.textContent ?? "")) {
          (a as HTMLAnchorElement).href = BOOKING_URL;
          (a as HTMLAnchorElement).target = "_blank";
          (a as HTMLAnchorElement).rel = "noopener";
        }
      });
    }
    const cform = $("#contactForm") as HTMLFormElement | null;
    if (cform) {
      const planSel = $("#f-plan") as HTMLSelectElement;
      planSel.addEventListener("change", () => planSel.classList.add("has"));
      cform.addEventListener("submit", (e) => {
        e.preventDefault();
        const note = cform.querySelector<HTMLElement>(".form-note");
        if (!cform.reportValidity()) return;
        const d = Object.fromEntries(new FormData(cform).entries()) as Record<string, string>;
        const subject = encodeURIComponent(
          `Nexraft inquiry — ${d.name}${d.company ? " (" + d.company + ")" : ""}`,
        );
        const body = encodeURIComponent(
          `Name: ${d.name}\nEmail: ${d.email}\nWebsite: ${d.website || "—"}\nCompany: ${d.company || "—"}\nPlan interest: ${d.plan || "—"}\n\nBrief:\n${d.brief || "—"}`,
        );
        location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
        if (note)
          note.textContent = "Opening your email client — or write us directly at " + CONTACT_EMAIL;
        const sbtn = cform.querySelector<HTMLElement>(".btn");
        if (sbtn) sbtn.textContent = "Sent — talk soon.";
      });
    }

    /* ================= smooth anchor scroll ================= */
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const target = root.querySelector(a.getAttribute("href") ?? "");
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
        }
      });
    });

    return () => {
      disposed = true;
      document.body.classList.remove("nxr-home");
      ctx.revert();
      rafIds.forEach((id) => cancelAnimationFrame(id));
      intervals.forEach((iv) => clearInterval(iv));
      winListeners.forEach(([type, fn]) => window.removeEventListener(type, fn));
      document.removeEventListener("visibilitychange", onVisibility);
      geo.dispose();
      mat.dispose();
      monoGeo.dispose();
      monoMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={rootRef} className="nxr">
      <a className="skip-link" href="#services">
        Skip to content
      </a>

      {/* preloader */}
      <div className="loader" id="loader">
        <div className="loader-logo">
          <span id="loaderWord">
            NEXRAFT<em style={{ color: "var(--signal)", fontStyle: "normal" }}>.</em>
          </span>
        </div>
        <div className="loader-bar">
          <i id="loaderFill" />
        </div>
        <div className="loader-meta">
          <span>EST 2024 — ENGINEERING STUDIO</span>
          <span className="loader-pct" id="loaderPct">
            000
          </span>
        </div>
      </div>

      <canvas id="gl" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="cursor" id="cursor" aria-hidden="true" />
      <div className="cursor-label" id="cursorLabel" aria-hidden="true">
        VIEW
      </div>

      <header>
        <a className="logo" href="#top">
          NEXRAFT<em>.</em>
        </a>
        <nav>
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#process">Process</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
          <a className="btn" href="#contact" data-hover>
            Book a call
          </a>
          <button
            className={`nav-toggle${menuOpen ? " open" : ""}`}
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
            onClick={() => setMenuOpen((v) => !v)}
            data-hover
          >
            <span />
            <span />
          </button>
        </nav>
      </header>

      {/* mobile nav overlay */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`} id="mobileMenu">
        <a href="#services" onClick={() => setMenuOpen(false)}>
          Services
        </a>
        <a href="#work" onClick={() => setMenuOpen(false)}>
          Work
        </a>
        <a href="#process" onClick={() => setMenuOpen(false)}>
          Process
        </a>
        <a href="#pricing" onClick={() => setMenuOpen(false)}>
          Pricing
        </a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>
          Contact
        </a>
      </div>

      <main className="site" id="top">
        {/* HERO */}
        <section className="hero wrap">
          <h1>
            <span className="line">
              <span>
                We build{" "}
                <em className="accent" style={{ fontStyle: "normal" }}>
                  fast
                </em>
              </span>
            </span>
            <span className="line">
              <span>websites, run</span>
            </span>
            <span className="line">
              <span>
                <em className="outline" style={{ fontStyle: "normal" }}>
                  the stack,
                </em>{" "}
                and
              </span>
            </span>
            <span className="line">
              <span>grow your leads.</span>
            </span>
          </h1>
          <div className="hero-foot">
            <div className="hero-stats">
              <div className="stat reveal">
                <div className="v">
                  <b>99.9</b>%
                </div>
                <div className="l">Uptime on stacks we operate</div>
              </div>
              <div className="stat reveal">
                <div className="v">
                  <b>0.8</b>s
                </div>
                <div className="l">Typical edge TTFB after migration</div>
              </div>
              <div className="stat reveal">
                <div className="v">
                  <b>48</b>h
                </div>
                <div className="l">Small-fix turnaround on Starter</div>
              </div>
            </div>
            <div className="scroll-hint reveal">
              <i /> Scroll — build once, then care or growth every month
            </div>
          </div>
        </section>

        {/* marquee */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track" id="marquee">
            <span>Custom builds</span>
            <span>Managed hosting</span>
            <span>Migrations</span>
            <span>SEO &amp; Growth</span>
            <span>3D product viewers</span>
            <span>AI automation</span>
            <span>Next.js</span>
            <span>TypeScript</span>
            <span>Custom builds</span>
            <span>Managed hosting</span>
            <span>Migrations</span>
            <span>SEO &amp; Growth</span>
            <span>3D product viewers</span>
            <span>AI automation</span>
            <span>Next.js</span>
            <span>TypeScript</span>
          </div>
        </div>

        {/* SERVICES */}
        <section id="services" className="wrap">
          <div className="kicker reveal">
            <span className="num">01</span> Services — four disciplines, one stack
          </div>
          <h2 className="reveal">
            Built to convert,
            <br />
            <span className="outline">not just look good.</span>
          </h2>
          <div className="svc-list" style={{ marginTop: "3.5rem" }}>
            <div className="svc reveal" data-hover>
              <span className="idx">/01</span>
              <h3>
                Web <small>Build</small>
              </h3>
              <p>
                Fast, custom sites and apps built to convert. Next.js, custom CMS, TypeScript. We
                handle WordPress and Squarespace migrations end to end.
              </p>
              <span className="tag">Fixed-rate build</span>
            </div>
            <div className="svc reveal" data-hover>
              <span className="idx">/02</span>
              <h3>
                Hosting <small>Care</small>
              </h3>
              <p>
                Managed edge infrastructure — CDN, SSL, backups, monitoring and uptime guarantees.
                We run the stack so you never think about it.
              </p>
              <span className="tag">Monthly</span>
            </div>
            <div className="svc reveal" data-hover>
              <span className="idx">/03</span>
              <h3>
                Growth <small>Add-on</small>
              </h3>
              <p>
                SEO, Google Business Profile optimization, review workflows, and AI automation aimed
                at one thing: more qualified leads.
              </p>
              <span className="tag">From $750/mo</span>
            </div>
            <div className="svc reveal" data-hover>
              <span className="idx">/04</span>
              <h3>
                3D &amp; AI <small>Add-ons</small>
              </h3>
              <p>
                Browser-native 3D product viewers and custom copilots and automations scoped to your
                data. The same tech powering this page.
              </p>
              <span className="tag">Scoped per project</span>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="wrap">
          <div className="kicker reveal">
            <span className="num">02</span> Team — founder-led
          </div>
          <h2 className="reveal">
            A small team.
            <br />
            <span className="accent">Direct access.</span>
          </h2>
          <div className="team-grid" style={{ marginTop: "3.5rem" }}>
            <div className="founder reveal">
              <div className="role">Founder — CEO</div>
              <h3>Barry Castelli</h3>
              <p>
                Every build, migration and deploy goes through the founder. You talk to the person
                who owns the outcome.
              </p>
              <a href="mailto:barry@nexraft.com" data-hover>
                barry@nexraft.com
              </a>
            </div>
            <div className="founder reveal">
              <div className="role">Engineering</div>
              <h3>Michael Farina</h3>
              <p>Development across builds, migrations and the managed stack.</p>
              <a href="mailto:michael@nexraft.com" data-hover>
                michael@nexraft.com
              </a>
            </div>
            <div className="founder reveal">
              <div className="role">Account Manager</div>
              <h3>Ryan Gersz</h3>
              <p>Your day-to-day contact from kickoff through every monthly iteration.</p>
              <a href="mailto:ryan@nexraft.com" data-hover>
                ryan@nexraft.com
              </a>
            </div>
            <div className="founder reveal">
              <div className="role">Account Manager</div>
              <h3>Jason Pierre-Louis</h3>
              <p>
                Keeps scope, timelines and requests moving — one point of contact, no ticket queues.
              </p>
              <a href="mailto:jason@nexraft.com" data-hover>
                jason@nexraft.com
              </a>
            </div>
            <div className="founder reveal">
              <div className="role">Account Manager</div>
              <h3>Barry Birch</h3>
              <p>Owns client communication and makes sure monthly edit hours turn into results.</p>
              <a href="mailto:barrybirch@nexraft.com" data-hover>
                barrybirch@nexraft.com
              </a>
            </div>
            <div className="founder reveal">
              <div className="role">Account Manager</div>
              <h3>Ayden Sackrider</h3>
              <p>
                Follow-ups, reviews and growth workflows — the person keeping your pipeline warm.
              </p>
              <a href="mailto:ayden@nexraft.com" data-hover>
                ayden@nexraft.com
              </a>
            </div>
          </div>
          <div className="team-note reveal">
            Founder-led. A dedicated account manager on every project.
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="wrap">
          <div className="kicker reveal">
            <span className="num">03</span> Work — shipped &amp; operated
          </div>
          <h2 className="reveal">
            Selected
            <br />
            <span className="outline">case studies.</span>
          </h2>
          <div style={{ marginTop: "2rem" }}>
            <div className="work-item reveal" data-hover data-cursor="VIEW">
              <div className="work-visual">
                <div className="fill">WH</div>
                <div className="scan" />
              </div>
              <div className="work-meta">
                <div className="cat">Product catalog — Global deployment</div>
                <h3>Weatherhaven</h3>
                <p>
                  Deployed shelter systems across 95 countries. A full product catalog engineered
                  for field teams on slow connections.
                </p>
                <div className="stack">
                  <span>Next.js</span>
                  <span>Custom CMS</span>
                  <span>Edge CDN</span>
                </div>
              </div>
            </div>
            <div className="work-item reveal" data-hover data-cursor="VIEW">
              <div className="work-visual">
                <div className="fill">OF</div>
                <div className="scan" />
              </div>
              <div className="work-meta">
                <div className="cat">Growth site — AI studio</div>
                <h3>Outfyre</h3>
                <p>
                  New build plus SEO and geo strategy. From $1–2k MRR to over $10k MRR in six
                  months.
                </p>
                <div className="stack">
                  <span>Build</span>
                  <span>SEO</span>
                  <span>Growth</span>
                </div>
              </div>
            </div>
            <div className="work-item reveal" data-hover data-cursor="VIEW">
              <div className="work-visual">
                <div className="fill">FCP</div>
                <div className="scan" />
              </div>
              <div className="work-meta">
                <div className="cat">Local business — Healthcare</div>
                <h3>Family Care Pharmacy</h3>
                <p>
                  Community pharmacy with prescription services, rebuilt for speed and local search
                  visibility.
                </p>
                <div className="stack">
                  <span>Build</span>
                  <span>Care</span>
                  <span>Local SEO</span>
                </div>
              </div>
            </div>
            <div className="work-item reveal" data-hover data-cursor="VIEW">
              <div className="work-visual">
                <div className="fill">3D</div>
                <div className="scan" />
              </div>
              <div className="work-meta">
                <div className="cat">Interactive — WebGL</div>
                <h3>3D Product Viewer</h3>
                <p>
                  Browser-native 3D product visualization — no plugins, no app installs, runs on the
                  phone in your pocket.
                </p>
                <div className="stack">
                  <span>Three.js</span>
                  <span>WebGL</span>
                  <span>GLTF</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QUOTE */}
        <section className="quote wrap">
          <div>
            <div className="kicker reveal">
              <span className="num">★</span> Social proof
            </div>
            <blockquote className="reveal">
              “Before we were doing $1–2k MRR. Once we let them build us a new site and did SEO and
              geo, we grew to <span className="accent">over $10k MRR in 6 months</span>.”
            </blockquote>
            <cite className="reveal">— COO, Outfyre</cite>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="wrap">
          <div className="kicker reveal">
            <span className="num">04</span> Process — how we ship
          </div>
          <h2 className="reveal">
            Scope. Build.
            <br />
            <span className="outline">Ship. Iterate.</span>
          </h2>
          <div className="proc-grid reveal" style={{ marginTop: "3.5rem" }}>
            <div className="step" data-hover>
              <span className="n">/01</span>
              <h3>Scope</h3>
              <p>
                A 30-minute discovery call. You leave with a fixed rate and a clear plan — no
                open-ended estimates.
              </p>
            </div>
            <div className="step" data-hover>
              <span className="n">/02</span>
              <h3>Build in sprints</h3>
              <p>Short cycles with working demos at every step. You see progress, not status reports.</p>
            </div>
            <div className="step" data-hover>
              <span className="n">/03</span>
              <h3>Ship</h3>
              <p>
                Production deployment on managed edge infrastructure we operate — CDN, SSL, backups,
                monitoring.
              </p>
            </div>
            <div className="step" data-hover>
              <span className="n">/04</span>
              <h3>Iterate</h3>
              <p>Ongoing retainer work. Edits, conversion tweaks and growth, month after month.</p>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="wrap">
          <div className="kicker reveal">
            <span className="num">06</span> Pricing — transparent, USD
          </div>
          <h2 className="reveal">
            Build once.
            <br />
            <span className="accent">Care every month.</span>
          </h2>
          <div className="price-grid" style={{ marginTop: "3.5rem" }}>
            <div className="plan reveal" data-hover>
              <div className="name">Starter</div>
              <div className="amount">
                $1,500 <small>build</small>
              </div>
              <div className="per">+ $299 / month managed</div>
              <ul>
                <li>Up to 5 pages</li>
                <li>Forms &amp; lead capture</li>
                <li>1 hour of edits monthly</li>
                <li>48h small-fix turnaround</li>
              </ul>
              <div className="yr">First year: $5,088</div>
            </div>
            <div className="plan popular reveal" data-hover>
              <div className="flag">Most popular</div>
              <div className="name">Business</div>
              <div className="amount">
                $2,500 <small>build</small>
              </div>
              <div className="per">+ $399 / month managed</div>
              <ul>
                <li>Up to 10 pages</li>
                <li>Forms &amp; lead capture</li>
                <li>2 hours of edits monthly</li>
                <li>Priority response</li>
              </ul>
              <div className="yr">First year: $7,288</div>
            </div>
            <div className="plan reveal" data-hover>
              <div className="name">Pro</div>
              <div className="amount">
                $4,000+ <small>build</small>
              </div>
              <div className="per">+ $599 / month managed</div>
              <ul>
                <li>Up to 15 pages</li>
                <li>4 hours of edits monthly</li>
                <li>Conversion tweaks included</li>
                <li>Priority response</li>
              </ul>
              <div className="yr">First year: $11,188+</div>
            </div>
          </div>
          <div className="addon reveal" data-hover>
            <div className="t">
              Growth <b>add-on</b>
            </div>
            <p>
              SEO, Google Business Profile, review workflows and AI automation for lead generation.
            </p>
            <div className="amount" style={{ fontSize: "1.5rem" }}>
              From $750<small style={{ fontSize: ".6em" }}>/mo</small>
            </div>
          </div>
          <p className="fine reveal">
            All prices in USD. 12-month initial term, then month-to-month with 30 days notice.
          </p>
        </section>

        {/* FAQ */}
        <section className="wrap">
          <div className="kicker reveal">
            <span className="num">07</span> FAQ
          </div>
          <h2 className="reveal">
            Questions,
            <br />
            <span className="outline">answered.</span>
          </h2>
          <div style={{ marginTop: "3rem", maxWidth: "52rem" }}>
            <div className="faq-item reveal">
              <button className="faq-q" data-hover>
                Do I own the code?<span className="x">+</span>
              </button>
              <div className="faq-a">
                <p>
                  Yes. You own everything we build for you — code, content and design. If you ever
                  leave, it goes with you.
                </p>
              </div>
            </div>
            <div className="faq-item reveal">
              <button className="faq-q" data-hover>
                What happens if I cancel?<span className="x">+</span>
              </button>
              <div className="faq-a">
                <p>
                  After the 12-month initial term, plans are month-to-month with 30 days notice. We
                  hand over the stack cleanly and help you transition.
                </p>
              </div>
            </div>
            <div className="faq-item reveal">
              <button className="faq-q" data-hover>
                How fast do you respond?<span className="x">+</span>
              </button>
              <div className="faq-a">
                <p>
                  Small fixes on Starter turn around in 48 hours or less. Business and Pro plans get
                  priority response, backed by our SLA.
                </p>
              </div>
            </div>
            <div className="faq-item reveal">
              <button className="faq-q" data-hover>
                Can you migrate my WordPress or Squarespace site?<span className="x">+</span>
              </button>
              <div className="faq-a">
                <p>
                  Yes — migrations are core to what we do. Typical result after migration to our
                  edge stack: 0.8s TTFB and 99.9% uptime.
                </p>
              </div>
            </div>
            <div className="faq-item reveal">
              <button className="faq-q" data-hover>
                Can you build custom AI tools?<span className="x">+</span>
              </button>
              <div className="faq-a">
                <p>
                  Yes. We build copilots and automations scoped to your data — from lead-routing
                  automations to internal assistants.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact wrap">
          <div className="kicker reveal">
            <span className="num">08</span> Contact — start here
          </div>
          <h2 className="reveal">
            Book a 30-minute
            <br />
            <span className="accent">discovery call.</span>
          </h2>
          <div className="contact-grid">
            <div className="contact-left reveal">
              <p>
                Talk directly with a founder. You&apos;ll leave the call with a fixed rate and a
                clear plan — whether or not you work with us.
              </p>
              <a className="btn solid" href="mailto:barry@nexraft.com" data-hover>
                Book a call →
              </a>
            </div>
            <form className="reveal" id="contactForm" noValidate>
              <div className="field">
                <input id="f-name" name="name" type="text" placeholder=" " required autoComplete="name" />
                <label htmlFor="f-name">Name</label>
              </div>
              <div className="field">
                <input id="f-email" name="email" type="email" placeholder=" " required autoComplete="email" />
                <label htmlFor="f-email">Email</label>
              </div>
              <div className="field">
                <input id="f-website" name="website" type="url" placeholder=" " autoComplete="url" />
                <label htmlFor="f-website">Website</label>
              </div>
              <div className="field">
                <input id="f-company" name="company" type="text" placeholder=" " autoComplete="organization" />
                <label htmlFor="f-company">Company</label>
              </div>
              <div className="field full">
                <select id="f-plan" name="plan" defaultValue="">
                  <option value="" disabled hidden></option>
                  <option>Starter — $1,500 + $299/mo</option>
                  <option>Business — $2,500 + $399/mo</option>
                  <option>Pro — $4,000+ + $599/mo</option>
                  <option>Growth add-on — from $750/mo</option>
                  <option>Not sure yet</option>
                </select>
                <label htmlFor="f-plan">Plan interest</label>
              </div>
              <div className="field full">
                <textarea id="f-brief" name="brief" placeholder=" " />
                <label htmlFor="f-brief">Project brief</label>
              </div>
              <button className="btn" type="submit" data-hover>
                Send inquiry
              </button>
              <p className="form-note" role="status" aria-live="polite"></p>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="foot-giant" data-hover>
            NEXRAFT
            <span style={{ color: "var(--signal)", WebkitTextStrokeColor: "var(--signal)" }}>.</span>
          </div>
          <div className="foot-cols">
            <div className="col">
              <h4>Studio</h4>
              <a href="#services" data-hover>
                Services
              </a>
              <a href="#work" data-hover>
                Work
              </a>
              <a href="#process" data-hover>
                Process
              </a>
              <a href="#pricing" data-hover>
                Pricing
              </a>
            </div>
            <div className="col">
              <h4>Resources</h4>
              <Link href="/notes" data-hover>
                Field notes
              </Link>
              <Link href="/status" data-hover>
                System status
              </Link>
              <a href="#contact" data-hover>
                Book a call
              </a>
            </div>
            <div className="col">
              <h4>Legal</h4>
              <Link href="/legal/privacy" data-hover>
                Privacy
              </Link>
              <Link href="/legal/terms" data-hover>
                Terms
              </Link>
              <Link href="/legal/subprocessors" data-hover>
                Subprocessors
              </Link>
              <Link href="/legal/sla" data-hover>
                SLA
              </Link>
              <Link href="/legal/accessibility" data-hover>
                Accessibility
              </Link>
            </div>
            <div className="col">
              <h4>Contact</h4>
              <a href="mailto:barry@nexraft.com" data-hover>
                barry@nexraft.com
              </a>
              <a href="mailto:michael@nexraft.com" data-hover>
                michael@nexraft.com
              </a>
            </div>
          </div>
          <div className="foot-base">
            <span>© 2026 Nexraft — Web, hosting, 3D and AI · Est. 2024</span>
            <span>99.9% uptime · Edge-first · Founder-operated</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
