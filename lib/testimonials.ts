export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  photo?: string;
};

/**
 * Only client-approved, attributed quotes belong here.
 * Do not add placeholder or role-only names.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "outfyre-jordan-coo",
    quote:
      "Before we were doing $1-2k MRR. Once we let them build us a new site and did SEO and geo, we grew to over $10k MRR in 6 months.",
    name: "Jordan Coo",
    role: "COO",
    company: "Outfyre",
  },
];

export const FEATURED_TESTIMONIAL = TESTIMONIALS[0];
