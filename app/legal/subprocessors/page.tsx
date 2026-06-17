import type { Metadata } from "next";
import Link from "next/link";
import { SubpageShell } from "@/components/SubpageShell";

export const metadata: Metadata = {
  title: "Subprocessors",
  description:
    "Infrastructure, billing, and communications providers Nexraft uses to deliver managed web and hosting services.",
  robots: { index: true, follow: true },
};

const operatedSystems = [
  {
    name: "Nexraft managed edge network",
    purpose:
      "Production delivery for nexraft.com and client sites: TLS termination, global edge caching, DDoS mitigation, automated deploys, and uptime monitoring.",
    data: "Request metadata, cached static assets, deployment artifacts. No end-user account data stored at the edge.",
    region: "United States primary; global edge PoPs",
  },
  {
    name: "Nexraft observability stack",
    purpose:
      "First-party performance and availability metrics. Aggregated page views and Core Web Vitals. No advertising identifiers, no cross-site tracking.",
    data: "Anonymized page paths, device class, load timing. IP addresses are not retained in analytics.",
    region: "United States",
  },
];

const subprocessors = [
  {
    name: "Stripe, Inc.",
    category: "Payments",
    purpose:
      "Subscription billing, invoicing, and self-service customer portal for retainer clients.",
    data: "Customer email, subscription status, payment method tokens. Card numbers are processed and stored by Stripe only.",
    region: "United States; PCI DSS Level 1",
  },
  {
    name: "Supabase, Inc.",
    category: "Data sync",
    purpose:
      "Webhook-driven sync of billing metadata from Stripe. Used for internal subscription state, not public-facing auth.",
    data: "Stripe customer IDs, plan keys, subscription status, webhook event payloads.",
    region: "United States",
  },
  {
    name: "Formspree, Inc.",
    category: "Communications",
    purpose:
      "Contact form relay when configured. Delivers inquiry payloads to Nexraft inboxes.",
    data: "Name, email, company, message body, and optional project brief fields submitted via the contact form.",
    region: "United States",
  },
  {
    name: "Cal.com, Inc.",
    category: "Scheduling",
    purpose:
      "Discovery call booking. Calendar availability and meeting confirmations.",
    data: "Name, email, selected time slot, and optional intake notes provided at booking.",
    region: "United States and EU (region selected at booking)",
  },
];

function formatEntry(item: {
  name: string;
  purpose: string;
  data: string;
  region: string;
  category?: string;
}) {
  const prefix = item.category ? `[${item.category}] ` : "";
  return `${prefix}${item.purpose} Data processed: ${item.data} Region: ${item.region}.`;
}

export default function SubprocessorsPage() {
  return (
    <SubpageShell
      title="Subprocessors"
      intro={
        <>
          <p>
            This page documents the systems Nexraft operates directly and the
            third-party subprocessors we engage to deliver hosting, billing, and
            client communications. We limit data shared to what each function
            requires, review providers for security posture, and contractually
            require appropriate safeguards where applicable.
          </p>
          <p className="mt-4 font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-faint">
            Last updated: June 2026 {"\u00b7"} Document ID: LEG-SUB-001
          </p>
        </>
      }
      sections={[
        {
          heading: "Nexraft-operated systems",
          items: operatedSystems.map((item) => ({
            title: item.name,
            detail: formatEntry(item),
          })),
        },
        {
          heading: "Third-party subprocessors",
          items: subprocessors.map((item) => ({
            title: item.name,
            detail: formatEntry(item),
          })),
        },
        {
          heading: "Client project vendors",
          items: [
            {
              title: "Scope-specific services",
              detail:
                "Individual client builds may use additional providers (CMS platforms, email delivery, CRM integrations, CAD/asset pipelines) documented in the signed statement of work and client agreement. Those vendors are not listed here unless they process personal data on Nexraft's behalf under a retainer.",
            },
            {
              title: "Change notification",
              detail:
                "Material additions or replacements to the third-party list above will be posted on this page with an updated date. Enterprise clients under a signed DPA may request advance notice and a current subprocessor register by email.",
            },
            {
              title: "Data processing agreements",
              detail:
                "Nexraft maintains DPAs or equivalent contractual terms with subprocessors that handle personal data. Request a copy or our standard DPA template at barry@nexraft.com.",
            },
          ],
        },
      ]}
      cta={
        <p className="text-sm text-mute">
          Related:{" "}
          <Link href="/legal/privacy" className="text-bone hover:underline">
            Privacy policy
          </Link>
          ,{" "}
          <Link href="/legal/sla" className="text-bone hover:underline">
            SLA summary
          </Link>
          ,{" "}
          <Link href="/legal/terms" className="text-bone hover:underline">
            Terms of service
          </Link>
          .
        </p>
      }
    />
  );
}
