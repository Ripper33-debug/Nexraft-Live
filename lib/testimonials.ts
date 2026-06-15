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
export const TESTIMONIALS: Testimonial[] = [];
