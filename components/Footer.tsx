import { BookCallButton } from "@/components/BookCallButton";
import { Logo } from "@/components/Logo";
import { ContactEmails } from "@/components/ContactEmails";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pb-24 pt-10 md:pb-12 md:pt-12" role="contentinfo">
      <div className="grid-editorial border-t border-border pt-8">
        <div className="col-span-12 border-b border-border pb-8 md:col-span-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
            Ready to scope your build?
          </p>
          <p className="mt-3 max-w-md font-display text-xl font-semibold text-foreground md:text-2xl">
            Retainers from $1,200/mo.
            <br />
            Hosting from $350/mo.
          </p>
          <div className="mt-5">
            <BookCallButton label="Book a call" variant="primary" />
          </div>
        </div>

        <div className="col-span-12 mt-8 md:col-span-4 md:mt-0 md:text-right">
          <Logo height={28} href={null} />
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Web / Hosting / 3D
            <br />
            Est. 2024
          </p>
        </div>

        <div className="col-span-12 mt-8 flex flex-wrap items-center gap-6 border-t border-border pt-6 md:col-span-12">
          <ContactEmails />
          <a
            href="/pay"
            className="link-underline font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground"
          >
            Billing
          </a>
          <p className="ml-auto font-mono text-[10px] tabular-nums text-muted">
            © {year}
          </p>
        </div>
      </div>
    </footer>
  );
}
