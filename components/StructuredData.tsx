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
        "Engineering studio for custom web tools: 3D product viewers, quote systems, customer portals, workflow add-ons, and integrations for companies with complex products.",
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
        "Custom web tools for complex products and workflows. 3D viewers, configurators, quote systems, customer portals, and QuickBooks, CRM, and payment integrations.",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Nexraft tool builds",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom website and tool foundation",
              description:
                "Modern website plus one focused custom feature from three to seven thousand five hundred dollars.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "3D and quote tool build",
              description:
                "Product viewers, configurators, quote flows, and sales tools from seven thousand five hundred to twenty-five thousand dollars plus.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Managed tool partner",
              description:
                "Hosting, support, updates, integrations, and ongoing tool improvements from seven hundred fifty to two thousand five hundred dollars per month.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Integrations and automation",
              description:
                "Connect websites to QuickBooks, CRMs, Stripe, email, and internal databases.",
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
