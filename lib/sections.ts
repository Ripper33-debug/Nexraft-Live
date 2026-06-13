export const SECTIONS = [
  { id: "home", index: "01", label: "Home", href: "#home" },
  { id: "do", index: "03", label: "Services", href: "#do" },
  { id: "work", index: "04", label: "Work", href: "#work" },
  { id: "process", index: "05", label: "Process", href: "#process" },
  { id: "pricing", index: "06", label: "Pricing", href: "#pricing" },
  { id: "contact", index: "07", label: "Contact", href: "#contact" },
] as const;

export const SECTION_COUNT = SECTIONS.length;

export function sectionLabel(id: (typeof SECTIONS)[number]["id"]): string {
  const section = SECTIONS.find((s) => s.id === id);
  return section ? `${section.index} / ${section.label}` : "";
}
