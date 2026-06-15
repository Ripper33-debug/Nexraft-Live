export type ClientLogo = {
  id: string;
  name: string;
  href?: string;
  src: string;
  width: number;
  height: number;
};

export const CLIENT_LOGOS: ClientLogo[] = [
  {
    id: "weatherhaven",
    name: "Weatherhaven",
    href: "/work/weatherhaven",
    src: "/brand/weatherhaven.png",
    width: 658,
    height: 115,
  },
  {
    id: "outfyre",
    name: "Outfyre",
    href: "/work/outfyre",
    src: "/brand/outfyre.png",
    width: 748,
    height: 143,
  },
  {
    id: "family-care-pharmacy",
    name: "Family Care Pharmacy",
    href: "/work/family-care-pharmacy",
    src: "/brand/family-care-pharmacy.png",
    width: 823,
    height: 163,
  },
];
