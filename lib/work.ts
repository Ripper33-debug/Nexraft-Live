export type WorkProject = {
  id: string;
  name: string;
  outcome: string;
  href: string;
  external?: boolean;
  image?: string;
  demo?: boolean;
  /** Full-bleed feature band (only one) */
  featureBand?: boolean;
};

export const WORK_PROJECTS: WorkProject[] = [
  {
    id: "weatherhaven",
    name: "Weatherhaven",
    outcome:
      "We helped turn a complex physical product into a web-based sales and product experience.",
    href: "/work/weatherhaven",
    image: "/case-studies/weatherhaven.png",
    featureBand: true,
  },
  {
    id: "product-viewer",
    name: "3D product viewer",
    outcome: "Browser-native spins and configurators, no app download.",
    href: "/3d-product-viewer",
    demo: true,
  },
  {
    id: "outfyre",
    name: "Outfyre",
    outcome: "Custom site and funnel for an AI studio product launch.",
    href: "/work/outfyre",
    image: "/case-studies/outfyre.png",
  },
  {
    id: "family-care-pharmacy",
    name: "Family Care Pharmacy",
    outcome: "Community pharmacy site with prescriptions, services, and click-to-call.",
    href: "/work/family-care-pharmacy",
    image: "/case-studies/family-care-pharmacy.png",
  },
  {
    id: "builder-migration",
    name: "Builder migration",
    outcome: "Squarespace and Wix sites moved to custom stacks with zero downtime.",
    href: "/squarespace-migration",
  },
  {
    id: "wordpress-rebuild",
    name: "WordPress rebuild",
    outcome: "Static-first rebuilds that cut load time from seconds to milliseconds.",
    href: "/wordpress-too-slow",
  },
];

export const FEATURED_PROJECT =
  WORK_PROJECTS.find((p) => p.featureBand) ?? WORK_PROJECTS[0];

export const WORK_GRID = WORK_PROJECTS.filter((p) => !p.featureBand);
