export type ClientLogo = {
  id: string;
  name: string;
  href?: string;
};

export const CLIENT_LOGOS: ClientLogo[] = [
  { id: "weatherhaven", name: "Weatherhaven", href: "/work/weatherhaven" },
  { id: "outfyre", name: "Outfyre", href: "/work/outfyre" },
];
