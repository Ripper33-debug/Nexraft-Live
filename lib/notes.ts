export type NoteBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Note = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingMinutes: number;
  body: NoteBlock[];
};

export const NOTES: Note[] = [
  {
    slug: "why-we-move-teams-off-wordpress",
    title: "Why we move teams off WordPress",
    description:
      "WordPress is not the enemy. But for a lot of teams the real cost shows up months later, in performance, security, and the time it takes to ship a change.",
    date: "2026-05-12",
    readingMinutes: 4,
    body: [
      {
        type: "p",
        text: "WordPress runs a large share of the web, and for some sites it is still the right tool. We are not here to dunk on it. But most of the teams that come to us are not asking about a CMS. They are asking why a simple change takes a week, why the site feels slow on a phone, and why they keep getting security warnings. More often than not, the answer traces back to how their WordPress install grew over time.",
      },
      { type: "h2", text: "The real cost is operational" },
      {
        type: "p",
        text: "A fresh WordPress site is fast. The problem is what accumulates: a page builder, a dozen plugins, a theme that was customized by three different agencies, and a database that has not been cleaned in years. Each plugin is code you did not write, updated on a schedule you do not control. Every update is a small bet that nothing breaks. That is the tax. It is not one big failure, it is a hundred small frictions that make the site expensive to change.",
      },
      { type: "h2", text: "Performance and Core Web Vitals" },
      {
        type: "p",
        text: "Search and conversion both care about how fast the page becomes usable. Plugin-heavy WordPress tends to ship render-blocking scripts, oversized images, and layout shift from late-loading widgets. You can fight this with caching plugins, but you are then layering more code to paper over the original problem. We would rather remove the weight than cache it.",
      },
      { type: "h2", text: "Security surface" },
      {
        type: "p",
        text: "Most WordPress incidents are not exotic. They are out-of-date plugins, weak admin credentials, and themes with known holes. The larger your plugin list, the larger your attack surface, and the more often you have to patch. A static or server-rendered site with a small, owned codebase simply has fewer doors to lock.",
      },
      { type: "h2", text: "What we move teams to" },
      {
        type: "p",
        text: "Usually a modern server-rendered or static front end on managed edge infrastructure, with a lightweight headless CMS when editors need to publish on their own. The content model stays simple, the code is yours, and the surface area is small. Editors still get a friendly place to write. Developers stop spending Fridays on plugin updates.",
      },
      {
        type: "ul",
        items: [
          "Pages load fast on real phones, not just on a developer laptop.",
          "Updates are reviewed changes in a repository, not surprise plugin pushes.",
          "Hosting, SSL, backups, and monitoring are handled, not your problem.",
          "You own the code and can move it any time.",
        ],
      },
      { type: "h2", text: "When WordPress is still fine" },
      {
        type: "p",
        text: "If your team is happy, the site is fast, and publishing is smooth, there is no reason to move. We will tell you that. A migration is worth it when the cost of changing the site is slowing the business down. If that sounds familiar, a short audit will tell you whether a move pays for itself.",
      },
    ],
  },
  {
    slug: "what-managed-edge-hosting-means",
    title: "What managed edge hosting actually means",
    description:
      "Managed hosting is an overloaded phrase. Here is what we mean by it, what you stop worrying about, and why it is not just a server bill.",
    date: "2026-04-28",
    readingMinutes: 4,
    body: [
      {
        type: "p",
        text: "Almost every host calls itself managed. The word has been stretched so far that it barely means anything. When we say managed edge hosting, we mean something specific, so it is worth defining in plain terms.",
      },
      { type: "h2", text: "Edge, in plain terms" },
      {
        type: "p",
        text: "A traditional site lives in one data center. A visitor on the other side of the world waits while requests travel back and forth. A global edge network puts your static assets and cached responses in many locations, close to the people requesting them. The result is a site that feels fast from more places, with less work on your part.",
      },
      { type: "h2", text: "What managed means here" },
      {
        type: "p",
        text: "Managed is the part most hosts skip. It is not just space on a server. It is someone owning the operational layer so you do not have to think about it.",
      },
      {
        type: "ul",
        items: [
          "Migration onto the platform without breaking your existing URLs.",
          "SSL certificates issued and renewed automatically.",
          "Regular backups with a tested path to restore.",
          "Uptime and error monitoring with alerts that reach a human.",
          "Performance checks so regressions get caught before customers do.",
        ],
      },
      { type: "h2", text: "What you stop worrying about" },
      {
        type: "p",
        text: "The point of managed hosting is the list of things you no longer touch. You do not renew certificates at midnight. You do not discover the backup was never running when you need it. You do not get paged because a deploy used too much memory. Those are our problems, and they are bundled into the retainer rather than billed as surprises.",
      },
      { type: "h2", text: "What it is not" },
      {
        type: "p",
        text: "Managed hosting is not a separate line item designed to look cheap. A 5 dollar server is not the same product. The price reflects the operations work behind it. It is also not a black box. You keep ownership of the code and the domain, and we document how everything is wired so you are never locked in.",
      },
      { type: "h2", text: "Why we include it in every retainer" },
      {
        type: "p",
        text: "Hosting and the site are not separate concerns. The team that builds the site should run it, because they are the ones who know how it behaves under load and where it can break. Splitting build and hosting across two vendors is how issues fall through the cracks. Keeping them together is how they get fixed the same day.",
      },
    ],
  },
  {
    slug: "how-we-scope-a-3d-configurator",
    title: "How we scope a 3D configurator",
    description:
      "A 3D configurator can be a weekend of work or a full quarter. The difference is in the scope. Here is how we size one before writing code.",
    date: "2026-04-09",
    readingMinutes: 5,
    body: [
      {
        type: "p",
        text: "Interactive 3D is one of the strongest things you can put on a product page. It also has a wide range of cost. A single product you can spin and recolor is a small build. A configurator that drives a real quote across hundreds of option combinations is a serious project. Before we write any code, we scope it against a few questions.",
      },
      { type: "h2", text: "Start with the decision the buyer makes" },
      {
        type: "p",
        text: "A configurator exists to help someone make a choice. So we start there, not with the model. What is the buyer deciding, and what do they need to see to feel confident? If the answer is color and material, that is a viewer with swatches. If the answer is layout, parts, and dimensions that affect price, that is a configurator with real logic behind it. Naming the decision keeps the build from sprawling.",
      },
      { type: "h2", text: "Asset pipeline and model budget" },
      {
        type: "p",
        text: "The single biggest performance lever is the model itself. CAD files are not web files. They carry far more geometry than a browser needs. We set a polygon and texture budget up front, then retopologize and bake detail into texture maps so the model looks sharp without stalling a phone. Compressed geometry and proper texture sizes are the difference between a smooth load and a five second freeze.",
      },
      { type: "h2", text: "Options versus combinations" },
      {
        type: "p",
        text: "Five independent options do not mean five things to build. They can mean dozens of combinations to validate. We map which options are independent, which conflict, and which change price. That map tells us whether we are swapping materials on one model or assembling parts at runtime. It is also where most underestimates happen, so we do it before quoting.",
      },
      { type: "h2", text: "Performance on real devices" },
      {
        type: "p",
        text: "We test on mid-range phones, not just a fast laptop. That means capping the device pixel ratio, pausing the render loop when the canvas is offscreen, and turning off effects that cost more than they add. A configurator that drains a battery or drops frames is worse than a good set of photos. Respecting reduced-motion settings is part of this too, with a clean static view as the fallback.",
      },
      { type: "h2", text: "How we price it" },
      {
        type: "p",
        text: "Once the decision, the asset budget, and the option map are clear, the price is mostly arithmetic. A viewer with live material swatches is a fixed setup plus a small monthly. A full configurator with quoting logic and CAD-driven assets is scoped per build. We would rather ship a strong first version and expand it than promise a giant system that never ships.",
      },
      {
        type: "p",
        text: "If you have a product that customers struggle to picture, that is usually the signal that 3D will earn its keep. The scoping call is short, and you leave it with a clear sense of size and cost.",
      },
    ],
  },
];

export function getNote(slug: string): Note | undefined {
  return NOTES.find((note) => note.slug === slug);
}

export function allNotes(): Note[] {
  return [...NOTES].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function formatNoteDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
