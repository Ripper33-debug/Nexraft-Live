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
        "Engineering studio for spec-grade web builds, managed edge hosting, browser-ready 3D, and custom AI tools. Delivered on monthly retainers.",
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
        "Web, hosting, 3D, and custom AI tools delivered as one managed retainer. Migrations, managed edge infrastructure, ongoing development, interactive 3D, and workflow automations.",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Nexraft retainers",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Managed website operations",
              description:
                "Managed hosting, CMS support, monitoring, backups, security updates, and ongoing fixes.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Website and content support",
              description:
                "Ongoing development, landing pages, SEO, analytics, and conversion work delivered every month.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Product and web development",
              description:
                "Full-stack development, custom features, integrations, and technical architecture.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Managed hosting and migration",
              description:
                "Migration off Squarespace, Wix, or WordPress onto managed edge infrastructure with SSL, backups, and monitoring.",
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
