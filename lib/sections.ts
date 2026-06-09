export const SECTIONS = [
  { id: "home", index: "01", label: "Home", href: "#home" },
  { id: "about", index: "02", label: "About", href: "#about" },
  { id: "services", index: "03", label: "Services", href: "#services" },
  { id: "process", index: "04", label: "Process", href: "#process" },
  { id: "pricing", index: "05", label: "Pricing", href: "#pricing" },
  { id: "contact", index: "06", label: "Contact", href: "#contact" },
] as const;

export const SECTION_COUNT = SECTIONS.length;

export function sectionLabel(id: (typeof SECTIONS)[number]["id"]): string {
  const section = SECTIONS.find((s) => s.id === id);
  return section ? `${section.index} / ${section.label}` : "";
}
