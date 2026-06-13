import type { Metadata } from "next";
import Link from "next/link";
import { SubpageShell } from "@/components/SubpageShell";

export const metadata: Metadata = {
  title: "Subprocessors",
  description: "Third-party services Nexraft uses to deliver hosting, billing, and communications.",
  robots: { index: true, follow: true },
};

const subprocessors = [
  {
    name: "Vercel",
    purpose: "Site hosting, edge delivery, analytics",
    location: "United States / global edge",
  },
  {
    name: "Stripe",
    purpose: "Subscription billing and customer portal",
    location: "United States",
  },
  {
    name: "Supabase",
    purpose: "Billing metadata sync from Stripe webhooks",
    location: "United States",
  },
  {
    name: "Formspree",
    purpose: "Contact form delivery (when configured)",
    location: "United States",
  },
  {
    name: "Cal.com",
    purpose: "Discovery call scheduling",
    location: "United States / EU",
  },
];

export default function SubprocessorsPage() {
  return (
    <SubpageShell
      title="Subprocessors"
      intro={
        <p>
          Nexraft uses the following subprocessors to operate nexraft.com and
          client retainers. We select providers with strong security practices
          and limit data shared to what is required for each function. Last
          updated: June 2025.
        </p>
      }
      sections={[
        {
          heading: "Current subprocessors",
          items: subprocessors.map((item) => ({
            title: item.name,
            detail: `${item.purpose}. Primary processing: ${item.location}.`,
          })),
        },
        {
          heading: "Client projects",
          items: [
            {
              title: "Project-specific vendors",
              detail:
                "Individual client builds may use additional services (CMS hosts, CDNs, email providers) documented in project scope and client agreements.",
            },
            {
              title: "Updates",
              detail:
                "Material changes to this list will be reflected on this page. Enterprise clients may request notification under a signed DPA.",
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
          .
        </p>
      }
    />
  );
}
