export const SECTIONS = [
  { id: "home", index: "01", label: "Home", href: "#home" },
  { id: "about", index: "02", label: "About", href: "#about" },
  { id: "services", index: "03", label: "Services", href: "#services" },
  { id: "pricing", index: "04", label: "Pricing", href: "#pricing" },
  { id: "contact", index: "05", label: "Contact", href: "#contact" },
] as const;

export const SECTION_COUNT = SECTIONS.length;
