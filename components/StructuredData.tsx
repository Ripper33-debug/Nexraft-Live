const SITE = "https://nexraft.com";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "Nexraft",
      url: SITE,
      logo: `${SITE}/nexraft-logo-header.png`,
      email: "barry@nexraft.com",
      description:
        "Engineering studio for custom website builds, WordPress and Squarespace migrations, managed hosting, SEO, growth retainers, browser-ready 3D, and custom AI tools.",
      founder: [
        { "@type": "Person", name: "Barry Castelli" },
        { "@type": "Person", name: "Alex Cridge" },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Nexraft",
      publisher: { "@id": `${SITE}/#organization` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}/#service`,
      name: "Nexraft",
      url: SITE,
      image: `${SITE}/nexraft-logo-header.png`,
      provider: { "@id": `${SITE}/#organization` },
      areaServed: "Worldwide",
      priceRange: "$$$",
      description:
        "Custom website builds, migrations, Care hosting plans, and Growth SEO retainers. Managed edge infrastructure, 3D product viewers, and custom AI workflow automations.",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Nexraft retainers",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom website build",
              description:
                "Custom Next.js sites with CMS, production deploy, and optional 3D from three to six thousand dollars.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Care plan",
              description:
                "Managed hosting, security, uptime monitoring, and small monthly changes from one hundred fifty to four hundred dollars per month.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Growth retainer",
              description:
                "SEO, Google Business Profile, reviews, and AI automation from seven hundred fifty to fifteen hundred dollars per month.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "3D configurators and interactive product experiences",
              description:
                "Browser-native 3D viewers and configurators for products that need to be seen, configured, or explored.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom AI tools and automations",
              description:
                "Internal copilots, customer-facing assistants, and workflow automations scoped to client data and systems.",
            },
          },
        ],
      },
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
