import type { Metadata } from "next";
import { HomeRebuild } from "@/components/HomeRebuild";
import "./home.css";

export const metadata: Metadata = {
  title: "Nexraft — We build fast websites, run the stack, and grow your leads",
  description:
    "Nexraft is an engineering studio. Custom builds, managed hosting, SEO growth, 3D and AI. Build once, then Care or Growth every month. 99.9% uptime, 0.8s edge TTFB.",
  alternates: { canonical: "https://nexraft.com/" },
  openGraph: {
    type: "website",
    url: "https://nexraft.com/",
    siteName: "Nexraft",
    title: "Nexraft — We build fast websites, run the stack, and grow your leads",
    description:
      "Engineering studio. Custom builds, managed hosting, SEO growth, 3D and AI. Build once, then Care or Growth every month.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexraft — We build fast websites, run the stack, and grow your leads",
    description: "Engineering studio. Custom builds, managed hosting, SEO growth, 3D and AI.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://nexraft.com/#org",
      name: "Nexraft",
      url: "https://nexraft.com/",
      logo: "https://nexraft.com/apple-touch-icon.png",
      foundingDate: "2024",
      founder: [
        {
          "@type": "Person",
          name: "Barry Castelli",
          email: "barry@nexraft.com",
          jobTitle: "Founder & CEO",
        },
      ],
      employee: [
        { "@type": "Person", name: "Michael Farina", jobTitle: "Developer" },
        { "@type": "Person", name: "Ryan Gersz", jobTitle: "Account Manager" },
        { "@type": "Person", name: "Jason Pierre-Louis", jobTitle: "Account Manager" },
        { "@type": "Person", name: "Barry Birch", jobTitle: "Account Manager" },
        { "@type": "Person", name: "Ayden Sackrider", jobTitle: "Account Manager" },
      ],
      description:
        "Engineering studio offering custom website development, migrations, managed hosting, SEO, 3D product visualization and AI automation.",
    },
    {
      "@type": "Service",
      provider: { "@id": "https://nexraft.com/#org" },
      serviceType: "Web development, managed hosting, SEO growth, 3D and AI",
      areaServed: "Worldwide",
      offers: [
        {
          "@type": "Offer",
          name: "Starter",
          price: "1500",
          priceCurrency: "USD",
          description: "$1,500 build + $299/month managed. Up to 5 pages.",
        },
        {
          "@type": "Offer",
          name: "Business",
          price: "2500",
          priceCurrency: "USD",
          description: "$2,500 build + $399/month managed. Up to 10 pages.",
        },
        {
          "@type": "Offer",
          name: "Pro",
          price: "4000",
          priceCurrency: "USD",
          description: "$4,000+ build + $599/month managed. Up to 15 pages.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do I own the code?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. You own everything we build for you — code, content and design. If you ever leave, it goes with you.",
          },
        },
        {
          "@type": "Question",
          name: "What happens if I cancel?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "After the 12-month initial term, plans are month-to-month with 30 days notice. We hand over the stack cleanly and help you transition.",
          },
        },
        {
          "@type": "Question",
          name: "How fast do you respond?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Small fixes on Starter turn around in 48 hours or less. Business and Pro plans get priority response, backed by our SLA.",
          },
        },
        {
          "@type": "Question",
          name: "Can you migrate my WordPress or Squarespace site?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — migrations are core to what we do. Typical result after migration: 0.8s TTFB and 99.9% uptime.",
          },
        },
        {
          "@type": "Question",
          name: "Can you build custom AI tools?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We build copilots and automations scoped to your data — from lead-routing automations to internal assistants.",
          },
        },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      {/* Same font loading as the static rebuild: Archivo + Archivo Expanded +
          JetBrains Mono from Google Fonts. React hoists these into <head>. */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500&family=Archivo+Expanded:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeRebuild />
    </>
  );
}
