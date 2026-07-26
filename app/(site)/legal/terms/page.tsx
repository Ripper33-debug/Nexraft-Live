import type { Metadata } from "next";
import Link from "next/link";
import { SubpageShell } from "@/components/SubpageShell";
import { CONTACT_EMAILS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing Nexraft website use and retainer services.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <SubpageShell
      title="Terms of service"
      intro={
        <>
          <p>
            These terms apply to use of nexraft.com and Nexraft retainer services.
            By using the site or subscribing to a plan, you agree to these terms.
            Last updated: June 2025.
          </p>
          <p className="mt-4">
            Billing questions:{" "}
            <a href={`mailto:${CONTACT_EMAILS.join(", ")}`} className="text-bone hover:underline">
              {CONTACT_EMAILS.join(" / ")}
            </a>
          </p>
        </>
      }
      sections={[
        {
          heading: "Services",
          items: [
            {
              title: "Scope",
              detail:
                "Retainer plans cover ongoing web development, managed hosting, and/or 3D production as scoped on your discovery call and reflected in your Stripe subscription.",
            },
            {
              title: "Changes",
              detail:
                "Material scope changes require written agreement. We will confirm revised monthly rates before billing changes.",
            },
            {
              title: "Acceptable use",
              detail:
                "You will not use our infrastructure for unlawful content, spam, malware, or activities that degrade shared systems.",
            },
          ],
        },
        {
          heading: "Billing and cancellation",
          items: [
            {
              title: "Payment",
              detail:
                "Subscriptions renew monthly via Stripe unless cancelled. Prices are in USD. Founding discounts apply only when configured in your checkout or invoice.",
            },
            {
              title: "Cancellation",
              detail:
                "Cancel anytime with 30 days written notice. Access continues through the paid period unless otherwise agreed.",
            },
            {
              title: "Refunds",
              detail:
                "First-month money-back applies to new retainer subscriptions as stated in your proposal, at our discretion for good-faith disputes.",
            },
          ],
        },
        {
          heading: "Liability",
          items: [
            {
              title: "Warranty",
              detail:
                "Services are provided professionally and in line with agreed scope. We do not guarantee specific business outcomes or third-party platform uptime outside our control.",
            },
            {
              title: "Limitation",
              detail:
                "To the extent permitted by law, Nexraft liability is limited to fees paid in the three months preceding a claim. See our SLA summary for operational targets.",
            },
            {
              title: "Governing law",
              detail:
                "These terms are governed by the laws of British Columbia, Canada, unless a signed client agreement specifies otherwise.",
            },
          ],
        },
      ]}
      cta={
        <p className="text-sm text-mute">
          Operational targets:{" "}
          <Link href="/legal/sla" className="text-bone hover:underline">
            SLA summary
          </Link>
          . Privacy:{" "}
          <Link href="/legal/privacy" className="text-bone hover:underline">
            Privacy policy
          </Link>
          .
        </p>
      }
    />
  );
}
