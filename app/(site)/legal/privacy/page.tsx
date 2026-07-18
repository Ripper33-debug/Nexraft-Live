import type { Metadata } from "next";
import Link from "next/link";
import { SubpageShell } from "@/components/SubpageShell";
import { CONTACT_EMAILS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Nexraft collects, uses, and protects personal data.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <SubpageShell
      title="Privacy policy"
      intro={
        <>
          <p>
            Nexraft (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates nexraft.com and
            related services. This policy describes what data we collect, why we
            collect it, and your choices. Last updated: June 2025.
          </p>
          <p className="mt-4">
            Questions:{" "}
            <a href={`mailto:${CONTACT_EMAILS[0]}`} className="text-bone hover:underline">
              {CONTACT_EMAILS[0]}
            </a>
          </p>
        </>
      }
      sections={[
        {
          heading: "Data we collect",
          items: [
            {
              title: "Contact and project inquiries",
              detail:
                "Name, email, company, plan interest, and project brief when you submit our contact form or email us directly.",
            },
            {
              title: "Billing",
              detail:
                "Email and subscription metadata processed by Stripe when you subscribe or manage billing. We do not store full payment card numbers on our servers.",
            },
            {
              title: "Site analytics",
              detail:
                "First-party, aggregated usage metrics (page views, Core Web Vitals) and Instantly Website Visitors tracking to identify U.S. business visitors for sales follow-up.",
            },
            {
              title: "Technical logs",
              detail:
                "Standard server logs (IP address, user agent, timestamps) for security, rate limiting, and debugging.",
            },
          ],
        },
        {
          heading: "How we use data",
          items: [
            {
              title: "Service delivery",
              detail:
                "Respond to inquiries, scope projects, operate hosting retainers, and manage subscriptions.",
            },
            {
              title: "Security",
              detail:
                "Rate limiting, fraud prevention, webhook verification, and incident response.",
            },
            {
              title: "Improvement",
              detail:
                "Understand site performance and fix errors. Analytics are aggregated where possible.",
            },
          ],
        },
        {
          heading: "Sharing and retention",
          items: [
            {
              title: "Subprocessors",
              detail:
                "We use vetted providers to run the business. See our subprocessor list for details.",
            },
            {
              title: "Retention",
              detail:
                "Contact records are kept while a business relationship is active and for a reasonable period afterward. Billing records follow Stripe and tax requirements.",
            },
            {
              title: "Your rights",
              detail:
                "You may request access, correction, or deletion of personal data by emailing us. EU/UK residents may have additional rights under GDPR.",
            },
          ],
        },
      ]}
      cta={
        <p className="text-sm text-mute">
          See also{" "}
          <Link href="/legal/subprocessors" className="text-bone hover:underline">
            Subprocessors
          </Link>{" "}
          and{" "}
          <Link href="/legal/terms" className="text-bone hover:underline">
            Terms of service
          </Link>
          .
        </p>
      }
    />
  );
}
