export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
};

/** Replace quotes with client-approved copy before publishing. */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "weatherhaven",
    quote:
      "The deploy map and product catalog finally match how we operate globally. Editors update specs without waiting on dev, and the site loads fast in the field.",
    name: "Marketing lead",
    role: "Corporate marketing",
    company: "Weatherhaven",
  },
  {
    id: "outfyre",
    quote:
      "We needed a site that could keep up with product launches. Nexraft shipped a retainer funnel and growth pages that convert without slowing us down.",
    name: "Founder",
    role: "Product & growth",
    company: "Outfyre",
  },
  {
    id: "retainer",
    quote:
      "Direct access to the people building and hosting the stack. No ticket queues, no surprise invoices. Issues get triaged the same day.",
    name: "Operations director",
    role: "Retainer client",
    company: "Industrial SaaS",
  },
];
