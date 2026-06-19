"use client";

import Link from "next/link";
import { SectionHeader, SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";

const dot = "\u00b7";

const web = {
  title: "Web",
  plan: "Build",
  summary:
    "Fast, custom sites and apps built to convert, not just look good. Every one ships with its own CMS. We also migrate WordPress and Squarespace when the old stack is the problem.",
  stack: `Next.js ${dot} Custom CMS ${dot} TypeScript`,
};

const hosting = {
  title: "Hosting",
  plan: "Care",
  summary:
    "We run what we build. Uptime, CDN, SSL, backups, monitoring, and small monthly changes - no separate server bill.",
  stack: `Edge network ${dot} CDN ${dot} Observability`,
};

const growth = {
  title: "Growth",
  plan: "Growth",
  summary:
    "SEO, Google Business Profile, review workflows, landing pages, and light AI automation so the site brings in leads - not just sits online.",
  stack: `SEO ${dot} Local search ${dot} Reviews ${dot} AI workflows`,
};

const ai = {
  title: "AI tools",
  plan: "Add-on",
  summary:
    "Custom copilots, assistants, and automations built for your workflows - not generic chat widgets pasted onto a page.",
  stack: `TypeScript ${dot} LLM APIs ${dot} RAG ${dot} Edge deploy`,
};

const threeD = {
  title: "3D",
  plan: "Add-on",
  summary:
    "Product spins, walkthroughs and web-ready 3D that make you look like nobody else in your market.",
  stack: `Blender ${dot} GLTF ${dot} Three.js ${dot} WebGL`,
  href: "/3d-product-viewer",
};

export function Services() {
  return (
    <SectionShell id="do" ariaLabelledBy="services-heading">
      <Reveal>
        <SectionHeader
          specLabel="01 / SERVICES"
          titleId="services-heading"
          title="Build, host, grow, and ship."
          subtitle="Four disciplines sold as Build (one-time), Care (hosting), or Growth (SEO and leads). 3D and AI when the project needs them."
        />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-6">
        <article className="border-t border-line pt-6 md:col-span-12 md:border md:border-line md:bg-ink2 md:p-8 md:pt-8">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-bone">
              {web.title}
            </h3>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.14em] text-signal-dim">
              {web.plan}
            </span>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mute md:text-base">
            {web.summary}
          </p>
          <p className="mt-6 font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-tag">
            {web.stack}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link
              href="/wordpress-too-slow"
              className="text-soft underline decoration-line underline-offset-4 transition-colors hover:text-bone"
            >
              Slow WordPress
            </Link>
            <Link
              href="/squarespace-migration"
              className="text-soft underline decoration-line underline-offset-4 transition-colors hover:text-bone"
            >
              Squarespace migration
            </Link>
          </div>
        </article>

        <article className="border-t border-line pt-6 md:col-span-4 md:border md:border-line md:bg-ink2 md:p-7 md:pt-7">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-bone">
              {hosting.title}
            </h3>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.14em] text-signal-dim">
              {hosting.plan}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-mute">{hosting.summary}</p>
          <p className="mt-5 font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-tag">
            {hosting.stack}
          </p>
        </article>

        <article className="border-t border-line pt-6 md:col-span-4 md:border md:border-line md:bg-panel md:p-7 md:pt-7">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-bone">
              {growth.title}
            </h3>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.14em] text-signal-dim">
              {growth.plan}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-mute">{growth.summary}</p>
          <p className="mt-5 font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-tag">
            {growth.stack}
          </p>
          <a
            href="#pricing"
            className="mt-6 inline-block text-sm text-bone underline decoration-line underline-offset-4 transition-colors hover:text-signal"
          >
            See Growth pricing
          </a>
        </article>

        <article className="border-t border-line pt-6 md:col-span-4 md:border md:border-line md:bg-ink2 md:p-7 md:pt-7">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-bone">
              {ai.title}
            </h3>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.14em] text-faint">
              {ai.plan}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-mute">{ai.summary}</p>
          <p className="mt-3 text-sm leading-relaxed text-mute">
            Scoped to your data, your brand voice, and your approval rules.
          </p>
          <p className="mt-5 font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-tag">
            {ai.stack}
          </p>
        </article>

        <article className="border-t border-line pt-6 md:col-span-12 md:border md:border-line md:bg-ink2 md:p-7 md:pt-7">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-bone">
              {threeD.title}
            </h3>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.14em] text-faint">
              {threeD.plan}
            </span>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mute">
            {threeD.summary} Ideal for physical products, equipment, and real
            estate. Optional on a build - not required for web or hosting
            clients.
          </p>
          <p className="mt-5 font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-tag">
            {threeD.stack}
          </p>
          <Link
            href={threeD.href}
            className="mt-6 inline-block text-sm text-bone underline decoration-line underline-offset-4 transition-colors hover:text-signal"
          >
            See the live demo
          </Link>
        </article>
      </div>
    </SectionShell>
  );
}
