import { ScrollReveal } from "@/components/ScrollReveal";

const services = [
  {
    index: "01",
    name: "Web",
    summary: "Applications, sites, and APIs — typed, tested, deployed.",
    detail:
      "Next.js, TypeScript, headless CMS, e-commerce, internal tools. Performance budgets enforced from day one.",
    stack: "Next.js · TypeScript · Postgres",
  },
  {
    index: "02",
    name: "Hosting",
    summary: "Managed infrastructure with uptime you can measure.",
    detail:
      "Vercel, edge config, CDN tuning, monitoring, SSL, backups. We run what we build.",
    stack: "Vercel · Edge · Observability",
  },
  {
    index: "03",
    name: "3D",
    summary: "Models, renders, and real-time assets for web and print.",
    detail:
      "Product visualization, architectural walkthroughs, WebGL scenes, GLTF pipelines — from mesh to browser.",
    stack: "Blender · GLTF · Three.js · WebGL",
    highlight: true,
  },
] as const;

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-20 border-b border-border py-24 md:py-32"
      aria-labelledby="services-heading"
    >
      <div className="grid-editorial">
        <div className="col-span-12 mb-12 md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            03 / Services
          </p>
        </div>

        <div className="col-span-12 md:col-span-9">
          <ScrollReveal
            as="h2"
            id="services-heading"
            className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground"
          >
            What we build and run.
          </ScrollReveal>

          <p className="mt-6 max-w-lg font-mono text-xs text-muted">
            Three disciplines. One delivery standard.
          </p>
        </div>

        <div className="col-span-12 mt-16 md:col-start-1">
          <div role="list" className="border-t border-border">
            {services.map((service) => (
              <article
                key={service.index}
                role="listitem"
                className={`service-row group grid grid-cols-12 items-start gap-4 border-b border-border px-0 py-8 md:gap-6 md:py-10 ${
                  "highlight" in service && service.highlight
                    ? "border-l border-l-accent/30 pl-4 md:pl-6"
                    : ""
                }`}
              >
                <div className="col-span-2 md:col-span-1">
                  <span
                    className="font-display text-[clamp(2.5rem,6vw,4rem)] font-bold leading-none tracking-tighter text-foreground/20 transition-colors group-hover:text-accent/40"
                    aria-hidden="true"
                  >
                    {service.index}
                  </span>
                </div>

                <div className="col-span-10 md:col-span-11 md:grid md:grid-cols-11 md:items-start md:gap-6">
                  <div className="md:col-span-2">
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                      {service.name}
                    </h3>
                    {"highlight" in service && service.highlight && (
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                        Real-time · Print-ready
                      </p>
                    )}
                  </div>

                  <div className="mt-2 md:col-span-5 md:mt-0">
                    <p className="text-sm leading-relaxed text-muted md:text-base">
                      {service.summary}
                    </p>
                    <div className="service-detail-wrap">
                      <p className="service-detail mt-3 font-mono text-xs leading-relaxed text-muted">
                        {service.detail}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 md:col-span-4 md:mt-0 md:text-right">
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted md:text-xs">
                      {service.stack}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
