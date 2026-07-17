export type FaqItem = {
  q: string;
  a: string;
};

/**
 * Source of truth for the homepage FAQ. Used to render the visible accordion
 * and the FAQPage JSON-LD, so the two never drift. ASCII-only, plain text.
 */
export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Who owns the code and the tools we build?",
    a: "You do. Everything we build is yours - the code, the repository, the design files, and the content. We hand over full access, and there is no proprietary lock-in. You can take it elsewhere at any time.",
  },
  {
    q: "What kinds of tools do you build?",
    a: "3D product viewers and configurators, quote and sales flows, customer portals, upload and approval tools, payment handoffs, and integrations with QuickBooks, CRMs, Stripe, email, and internal systems. We also build modern sites when you need a foundation or add-on layer.",
  },
  {
    q: "We already have a website. Can you still help?",
    a: "Yes. That is often the best fit. We build custom add-ons, portals, and integrations on top of your existing site instead of replacing everything unless a rebuild is actually needed.",
  },
  {
    q: "How does pricing work?",
    a: "We quote after a discovery call based on scope. Public ranges start around three to seven thousand five hundred dollars for a site plus one custom feature, seven thousand five hundred to twenty-five thousand plus for a 3D or quote tool build, and seven hundred fifty to two thousand five hundred dollars per month for a managed partner plan. Exact price depends on integrations, assets, and timeline.",
  },
  {
    q: "What happens if we cancel or leave?",
    a: "Managed partner plans run on a 6-month initial term, then continue month-to-month with 30 days notice to cancel. When you leave we hand over the code, assets, hosting configuration, and DNS, and we help your next team take over cleanly.",
  },
  {
    q: "How fast do you respond, and is there an SLA?",
    a: "We target 99.9% monthly uptime on infrastructure we manage. Managed partner clients get small fixes within 48 business hours. Signed SLAs are available for enterprise engagements.",
  },
  {
    q: "Do you work with CAD files and product data?",
    a: "Yes. We turn CAD exports, GLTF assets, spec sheets, and option logic into web-ready viewers and configurators. Tell us what files you have and we will scope the pipeline on a call.",
  },
  {
    q: "Can you connect to QuickBooks, our CRM, or internal tools?",
    a: "Usually, yes. We scope API integrations, webhooks, and automation so form submissions, quotes, and approvals land in the systems your team already uses instead of stuck in inboxes.",
  },
  {
    q: "Do you migrate WordPress or Squarespace sites?",
    a: "Yes, when a rebuild is the right move. Slow WordPress and outgrown builder sites are a common starting point for a new foundation plus custom tools. See our WordPress and Squarespace migration pages for detail.",
  },
  {
    q: "How does onboarding work after a discovery call?",
    a: "After the call we scope the tool, send a short plan and fixed price, then collect access and ship a first visible demo quickly so you can see how we work before committing to the full build.",
  },
];
