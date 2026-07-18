import type { Metadata } from "next";
import Link from "next/link";
import { SubpageShell } from "@/components/SubpageShell";
import { CONTACT_EMAILS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Nexraft accessibility statement. We aim to conform to WCAG 2.1 AA and welcome reports of any barriers.",
  robots: { index: true, follow: true },
};

export default function AccessibilityPage() {
  return (
    <SubpageShell
      title="Accessibility statement"
      intro={
        <>
          <p>
            Nexraft is committed to making this site and the products we build
            usable by as many people as possible. We aim to conform to the Web
            Content Accessibility Guidelines (WCAG) 2.1 at level AA. Last
            updated: June 2026.
          </p>
          <p className="mt-4">
            Accessibility is part of how we build, not an afterthought. The same
            standards apply to client work we ship and host.
          </p>
        </>
      }
      sections={[
        {
          heading: "What we do",
          items: [
            {
              title: "Semantic, keyboard-friendly markup",
              detail:
                "Pages use landmarks, headings in order, and a skip-to-content link. Interactive controls are reachable and operable with a keyboard.",
            },
            {
              title: "Visible focus and contrast",
              detail:
                "Focus states are visible, and we hold body text to AA contrast against our dark theme.",
            },
            {
              title: "Reduced motion",
              detail:
                "Animations, the loading intro, and 3D scenes respect the prefers-reduced-motion setting and fall back to static views.",
            },
            {
              title: "Accessible media",
              detail:
                "Images carry meaningful alternative text, and decorative elements are hidden from assistive technology.",
            },
          ],
        },
        {
          heading: "Known limitations",
          items: [
            {
              title: "Interactive 3D",
              detail:
                "Live 3D configurators are visual by nature. We provide static fallbacks and plain-language descriptions, and we are working to expand non-visual equivalents.",
            },
            {
              title: "Third-party content",
              detail:
                "Some embedded or linked services are outside our direct control. We choose accessible vendors where we can and will help you escalate issues.",
            },
          ],
        },
      ]}
      cta={
        <p className="text-sm text-mute">
          Found a barrier? Email{" "}
          <a
            href={`mailto:${CONTACT_EMAILS[0]}`}
            className="text-bone hover:underline"
          >
            {CONTACT_EMAILS[0]}
          </a>{" "}
          with the page and what happened. We aim to respond within 5 business
          days. See also our{" "}
          <Link href="/legal/privacy" className="text-bone hover:underline">
            privacy policy
          </Link>
          .
        </p>
      }
    />
  );
}
