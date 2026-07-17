"use client";

import { BOOK_CALL_URL } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative min-h-[90svh] flex flex-col justify-center border-b border-line bg-bg-primary px-7 py-20 md:py-32"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-12 bg-border" />
          <p className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-text-tertiary">
            Infrastructure-grade web tools
          </p>
        </div>

        <h1
          id="hero-heading"
          className="font-display text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[1.05] tracking-tight text-text-primary"
        >
          Built like infrastructure.
        </h1>

        <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-text-secondary md:text-xl">
          Nexraft builds 3D product viewers, quote systems, and customer portals for companies with complex products. We operate the stack—we don&apos;t just hand off code.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <a
            href={BOOK_CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border-light bg-bg-tertiary px-6 py-3 font-jetbrains text-[11px] uppercase tracking-[0.15em] text-text-primary transition-colors hover:bg-border hover:text-text-primary"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-success" />
            Book a discovery call
          </a>
          <a
            href="#demo"
            className="inline-flex items-center gap-2 text-sm text-text-tertiary underline decoration-border underline-offset-4 transition-colors hover:text-text-primary"
          >
            Try the 3D demo →
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-8 sm:grid-cols-4">
          <div>
            <p className="font-jetbrains text-[10px] uppercase tracking-[0.15em] text-text-muted">Founded</p>
            <p className="mt-2 font-display text-2xl font-semibold text-text-primary">2024</p>
          </div>
          <div>
            <p className="font-jetbrains text-[10px] uppercase tracking-[0.15em] text-text-muted">Team size</p>
            <p className="mt-2 font-display text-2xl font-semibold text-text-primary">5–10</p>
          </div>
          <div>
            <p className="font-jetbrains text-[10px] uppercase tracking-[0.15em] text-text-muted">Uptime target</p>
            <p className="mt-2 font-display text-2xl font-semibold text-text-primary">99.9%</p>
          </div>
          <div>
            <p className="font-jetbrains text-[10px] uppercase tracking-[0.15em] text-text-muted">Response time</p>
            <p className="mt-2 font-display text-2xl font-semibold text-text-primary">48h</p>
          </div>
        </div>
      </div>
    </section>
  );
}
