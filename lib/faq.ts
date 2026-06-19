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
    q: "Who owns the code and the site?",
    a: "You do. Everything we build is yours - the code, the repository, the design files, and the content. We hand over full access, and there is no proprietary lock-in. You can take it elsewhere at any time.",
  },
  {
    q: "What happens if we cancel or leave?",
    a: "Retainers run on a 6-month initial term, then continue month-to-month with 30 days notice to cancel. When you leave we hand over the code, assets, hosting configuration, and DNS, and we help your next team take over cleanly.",
  },
  {
    q: "How fast do you respond, and is there an SLA?",
    a: "We target 99.9% monthly uptime on infrastructure we manage. Care clients get small fixes within 48 business hours. Growth clients get priority triage for production issues. Signed SLAs are available for enterprise engagements.",
  },
  {
    q: "How does onboarding work after a discovery call?",
    a: "After the call we scope the work and send a short plan and price. Once you approve, we collect access, set up the managed environment, and ship a first visible change quickly so you can see how we work before committing to a large build.",
  },
  {
    q: "How do you handle data and security?",
    a: "Sites run on managed edge infrastructure with SSL, automated backups, and monitoring. We use least-privilege access, keep credentials out of source control, and list the third parties we rely on in our subprocessors page.",
  },
  {
    q: "What does the Care plan include?",
    a: "Care is managed hosting plus upkeep: SSL, backups, uptime monitoring, security updates, and small monthly content or fix requests from 150 to 400 dollars per month depending on scope. You do not get a separate server bill or have to manage infrastructure yourself.",
  },
  {
    q: "What does the Growth plan include?",
    a: "Growth is for teams that want the site to drive leads, not just stay online. It covers SEO, Google Business Profile work, review and reputation workflows, landing pages, conversion tweaks each month, and light AI automation for follow-up and routing. Plans run from 750 to 1,500 dollars per month depending on scope. Pick Care or Growth - not both.",
  },
  {
    q: "Can you migrate our WordPress or Squarespace site?",
    a: "Yes. Slow WordPress and outgrown Squarespace sites are a common starting point. We rebuild static-first on managed edge infrastructure, move your content and DNS, and can attach Care or Growth after launch. See our WordPress and Squarespace migration pages for detail.",
  },
  {
    q: "Do you work with our existing stack?",
    a: "Usually, yes. We start with a short audit, then either improve what you already run or migrate you onto a faster, managed setup. We work across common CMS platforms and modern frameworks rather than forcing one template.",
  },
  {
    q: "Do you build custom AI tools?",
    a: "Yes. We scope and ship internal copilots, customer-facing assistants, and workflow automations tied to your data and systems. Every build includes guardrails, logging, and a handoff plan so you are not locked into a black-box widget.",
  },
];
