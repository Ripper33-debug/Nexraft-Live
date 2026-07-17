"use client";

import Link from "next/link";
import { SectionHeader, SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";

const SERVICES = [
  {
    title: "3D Product Tools",
    summary:
      "Interactive 3D viewers and product experiences for companies that sell physical products, equipment, shelters, modular systems, real estate, or custom products.",
    stack: ["Three.js", "WebGL", "GLTF", "CAD-ready workflows"],
    href: "/3d-product-viewer",
    linkLabel: "See the live demo",
    featured: true,
  },
  {
    title: "Quote & Sales Tools",
    summary:
      "Custom quote flows, product option selectors, lead forms, and sales tools that help customers understand what they need and request pricing faster.",
    stack: ["Quote systems", "Lead capture", "Product configuration"],
  },
  {
    title: "Customer Portals & Workflow Add-ons",
    summary:
      "Secure portals, upload forms, approval flows, dashboards, and internal tools that connect your website to how your business actually runs.",
    stack: ["Portals", "Approvals", "Dashboards", "Automation"],
  },
  {
    title: "Integrations & Automation",
    summary:
      "Connect your website to tools like QuickBooks, CRMs, payment providers, email systems, and internal databases so work does not get trapped in forms and inboxes.",
    stack: ["APIs", "QuickBooks", "Stripe", "CRM", "Automation"],
  },
] as const;

export function Services() {
  return (
    <SectionShell id="do" ariaLabelledBy="services-heading">
      <Reveal>
        <SectionHeader
          specLabel="03 / SERVICES"
          titleId="services-heading"
          title="Custom tools for complex products and workflows."
          subtitle="We build the missing layer on top of your site: visualization, quoting, portals, and integrations that help you sell faster and operate smoother."
        />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
        {SERVICES.map((service, index) => (
          <Reveal key={service.title} delay={index * 0.04}>
            <article
              className={`flex h-full flex-col p-6 md:p-8 ${
                "featured" in service && service.featured ? "bg-bg-secondary" : "bg-bg-primary"
              }`}
            >
              <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-text-primary">
                {service.title}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-text-secondary md:text-base">
                {service.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {service.stack.map((item) => (
                  <span
                    key={item}
                    className="font-jetbrains text-[10px] uppercase tracking-[0.12em] text-text-tertiary border border-border px-2 py-1"
                  >
                    {item}
                  </span>
                ))}
              </div>
              {"href" in service && service.href ? (
                <Link
                  href={service.href}
                  className="mt-6 inline-block text-sm text-text-primary underline decoration-border underline-offset-4 transition-colors hover:text-accent"
                >
                  {service.linkLabel}
                </Link>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
