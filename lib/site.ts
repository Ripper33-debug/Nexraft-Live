export const FOUNDERS = [
  {
    name: "Barry Castelli",
    email: "barry@nexraft.com",
    initials: "BC",
    photo: "/founders/barry.jpg",
  },
  {
    name: "Alex Cridge",
    email: "alex@nexraft.com",
    initials: "AC",
    photo: "/founders/alex.jpg",
  },
] as const;

export const CONTACT_EMAILS = FOUNDERS.map((founder) => founder.email);

export function contactEmailLabel(): string {
  return CONTACT_EMAILS.join(" / ");
}
