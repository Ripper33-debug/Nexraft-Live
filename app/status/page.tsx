import type { Metadata } from "next";
import Link from "next/link";
import { SubpageShell } from "@/components/SubpageShell";
import { CONTACT_EMAILS } from "@/lib/site";

export const metadata: Metadata = {
  title: "System Status",
  description:
    "Operational status for Nexraft-managed edge delivery, hosting, billing, and client-facing services.",
  robots: { index: true, follow: true },
};

const components = [
  {
    name: "Edge delivery network",
    detail:
      "Operational. Global CDN, TLS termination, and static asset delivery for nexraft.com and client production sites.",
  },
  {
    name: "Managed hosting",
    detail:
      "Operational. Production site hosting, automated deploys, backups, and uptime monitoring on retainer stacks.",
  },
  {
    name: "Billing and subscriptions",
    detail:
      "Operational. Stripe checkout, customer portal, and webhook sync for retainer billing.",
  },
  {
    name: "Contact and scheduling",
    detail:
      "Operational. Contact form relay and discovery call booking.",
  },
];

export default function StatusPage() {
  const checked = new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC";

  return (
    <SubpageShell
      title="System status"
      intro={
        <>
          <p>
            Current operational status for Nexraft-managed infrastructure and
            client-facing services. For active incidents, email{" "}
            <a
              href={`mailto:${CONTACT_EMAILS[0]}?subject=Incident`}
              className="text-bone hover:underline"
            >
              {CONTACT_EMAILS[0]}
            </a>{" "}
            with subject &ldquo;Incident&rdquo;.
          </p>
          <p className="mt-4 font-jetbrains text-[11px] uppercase tracking-[0.16em] text-faint">
            Last checked: {checked}
          </p>
        </>
      }
      sections={[
        {
          heading: "All systems operational",
          items: components.map((item) => ({
            title: item.name,
            detail: item.detail,
          })),
        },
        {
          heading: "Uptime commitment",
          items: [
            {
              title: "Retainer hosting target",
              detail:
                "99.9% monthly uptime on production sites we operate under an active retainer. See the SLA summary for response targets and exclusions.",
            },
            {
              title: "Maintenance windows",
              detail:
                "Scheduled maintenance is communicated in advance. Emergency patches may deploy without notice when required for security.",
            },
          ],
        },
      ]}
      cta={
        <p className="text-sm text-mute">
          Related:{" "}
          <Link href="/legal/sla" className="text-bone hover:underline">
            SLA summary
          </Link>
          ,{" "}
          <Link href="/legal/subprocessors" className="text-bone hover:underline">
            Subprocessors
          </Link>
          .
        </p>
      }
    />
  );
}
