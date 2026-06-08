import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 md:py-16" role="contentinfo">
      <div className="grid-editorial items-end border-t border-border pt-12">
        <div className="col-span-12 md:col-span-6">
          <p className="font-display text-xl font-semibold tracking-tight text-foreground">
            Nexraft
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Web · Hosting · 3D · Est. 2024
          </p>
        </div>

        <div className="col-span-12 mt-8 flex flex-wrap items-center gap-6 md:col-span-6 md:mt-0 md:justify-end">
          <Link
            href="/pay"
            className="link-underline font-mono text-xs uppercase tracking-widest text-accent"
          >
            Pay Bill
          </Link>
          <a
            href="mailto:hello@nexraft.com"
            className="link-underline font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground"
          >
            Contact
          </a>
          <p className="font-mono text-[10px] tabular-nums text-muted">
            © {year}
          </p>
        </div>
      </div>
    </footer>
  );
}
