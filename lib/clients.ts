export type ClientLogo = {
  id: string;
  name: string;
  /** Live client site (opens in a new tab from the logo strip). */
  href: string;
  src: string;
  width: number;
  height: number;
};

export const CLIENT_LOGOS: ClientLogo[] = [
  {
    id: "weatherhaven",
    name: "Weatherhaven",
    href: "https://weatherhaven.com",
    src: "/brand/weatherhaven.png",
    width: 658,
    height: 115,
  },
  {
    id: "outfyre",
    name: "Outfyre",
    href: "https://outfyre.com",
    src: "/brand/outfyre.png",
    width: 748,
    height: 143,
  },
  {
    id: "family-care-pharmacy",
    name: "Family Care Pharmacy",
    href: "https://familycarepharmacy.com",
    src: "/brand/family-care-pharmacy.png",
    width: 823,
    height: 163,
  },
];
