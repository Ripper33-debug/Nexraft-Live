export const BOOK_CALL_URL = "https://cal.com/nexraft/discovery-call";

export type TeamMember = {
  name: string;
  role: string;
  email: string;
  initials: string;
};

export const TEAM: TeamMember[] = [
  {
    name: "Barry Castelli",
    role: "Founder & CEO",
    email: "barry@nexraft.com",
    initials: "BC",
  },
  {
    name: "Michael Farina",
    role: "Developer",
    email: "michael@nexraft.com",
    initials: "MF",
  },
  {
    name: "Ryan Gersz",
    role: "Account Manager",
    email: "ryan@nexraft.com",
    initials: "RG",
  },
  {
    name: "Jason Pierre-Louis",
    role: "Account Manager",
    email: "jason@nexraft.com",
    initials: "JP",
  },
  {
    name: "Barry Birch",
    role: "Account Manager",
    email: "barrybirch@nexraft.com",
    initials: "BB",
  },
  {
    name: "Ayden Sackrider",
    role: "Account Manager",
    email: "ayden@nexraft.com",
    initials: "AS",
  },
] as const;

/** Kept for existing imports: the founder-led contact points shown site-wide. */
export const FOUNDERS = TEAM.slice(0, 1);

export const CONTACT_EMAILS = FOUNDERS.map((founder) => founder.email);

export function contactEmailLabel(): string {
  return CONTACT_EMAILS.join(" / ");
}
