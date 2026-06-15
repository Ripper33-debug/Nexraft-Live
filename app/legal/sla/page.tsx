import type { Metadata } from "next";
import Link from "next/link";
import { SubpageShell } from "@/components/SubpageShell";
import { CONTACT_EMAILS } from "@/lib/site";

export const metadata: Metadata = {
  title: "SLA Summary",
  description: "Nexraft operational targets for hosting retainers and support response times.",
  robots: { index: true, follow: true },
};

export default function SlaPage() {
  return (
    <SubpageShell
      title="SLA summary"
      intro={
        <>
          <p>
            This page summarizes operational targets for Nexraft-managed hosting
            and retainer support. Signed client agreements and plan tier govern
            any contractual SLA. Last updated: June 2025.
          </p>
          <p className="mt-4">
            Incidents: email{" "}
            <a href={`mailto:${CONTACT_EMAILS[0]}`} className="text-bone hover:underline">
              {CONTACT_EMAILS[0]}
            </a>{" "}
            with subject &ldquo;Incident&rdquo;.
          </p>
        </>
      }
      sections={[
        {
          heading: "Hosting availability",
          items: [
            {
              title: "Uptime target",
              detail:
                "99.9% monthly uptime for production sites on Nexraft-managed edge infrastructure, excluding scheduled maintenance windows communicated in advance.",
            },
            {
              title: "Monitoring",
              detail:
                "Automated health checks, SSL expiry alerts, and error-rate monitoring on stacks we operate.",
            },
            {
              title: "Backups",
              detail:
                "Regular backups for CMS and application data on managed hosting plans. Restore procedures documented per client.",
            },
          ],
        },
        {
          heading: "Support response",
          items: [
            {
              title: "Starter — Managed Website Ops",
              detail: "Bug fixes addressed within 48 business hours for in-scope issues.",
            },
            {
              title: "Growth — Website + Content Support",
              detail:
                "Bi-weekly syncs. Development queue prioritized within the monthly hour allocation.",
            },
            {
              title: "Build — Product + Web Development",
              detail:
                "Same-day triage for production issues. Priority queue for feature work.",
            },
            {
              title: "Enterprise hosting",
              detail:
                "Observability, incident response, and escalation paths scoped in your agreement.",
            },
          ],
        },
        {
          heading: "Exclusions",
          items: [
            {
              title: "Third-party outages",
              detail:
                "Downtime caused by upstream providers, DNS registrars, or client-controlled services outside our stack.",
            },
            {
              title: "Unapproved changes",
              detail:
                "Issues introduced by client-side code changes, plugin installs, or credentials shared outside Nexraft without coordination.",
            },
          ],
        },
      ]}
      cta={
        <p className="text-sm text-mute">
          Full terms:{" "}
          <Link href="/legal/terms" className="text-bone hover:underline">
            Terms of service
          </Link>
          . Need a signed SLA?{" "}
          <Link href="/#contact" className="text-bone hover:underline">
            Contact us
          </Link>
          .
        </p>
      }
    />
  );
}
