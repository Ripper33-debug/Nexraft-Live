import type { Metadata } from "next";
import Link from "next/link";
import { SubpageShell } from "@/components/SubpageShell";
import { CONTACT_EMAILS } from "@/lib/site";
import {
  overallStatus,
  runStatusProbes,
  type ProbeResult,
} from "@/lib/status-checks";

export const metadata: Metadata = {
  title: "System Status",
  description:
    "Live HTTP probes for Nexraft and client production sites we operate.",
  robots: { index: true, follow: true },
};

export const revalidate = 60;

function statusLabel(status: ProbeResult["status"]) {
  if (status === "operational") return "Operational";
  if (status === "degraded") return "Degraded";
  return "Outage";
}

export default async function StatusPage() {
  const { checkedAt, results } = await runStatusProbes();
  const aggregate = overallStatus(results);
  const checkedDisplay =
    new Date(checkedAt).toISOString().slice(0, 19).replace("T", " ") + " UTC";

  return (
    <SubpageShell
      title="System status"
      intro={
        <>
          <p>
            Live HTTP probes against nexraft.com and client production sites we
            operate. Refreshes about every 60 seconds. For active incidents,
            email{" "}
            <a
              href={`mailto:${CONTACT_EMAILS[0]}?subject=Incident`}
              className="text-bone hover:underline"
            >
              {CONTACT_EMAILS[0]}
            </a>{" "}
            with subject &ldquo;Incident&rdquo;.
          </p>
          <p className="mt-4 font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-faint">
            Last probed: {checkedDisplay} {"\u00b7"} Overall:{" "}
            {statusLabel(aggregate)}
          </p>
        </>
      }
      sections={[
        {
          heading:
            aggregate === "operational"
              ? "All probed endpoints responding"
              : "Probe alerts",
          items: results.map((item) => ({
            title: item.name,
            detail: `${statusLabel(item.status)}. ${item.detail} Response in ${item.latencyMs}ms${
              item.httpStatus ? ` (HTTP ${item.httpStatus})` : ""
            }${item.error ? `. ${item.error}` : ""}.`,
          })),
        },
        {
          heading: "What this page is",
          items: [
            {
              title: "Synthetic checks",
              detail:
                "Each row is a real GET request from this server. It is not a historical SLA report and does not cover every client stack or third-party billing provider.",
            },
            {
              title: "Uptime commitment",
              detail:
                "Retainer hosting targets 99.9% monthly uptime on sites we operate. See the SLA summary for contractual terms, response targets, and exclusions.",
            },
          ],
        },
      ]}
      cta={
        <p className="text-sm text-mute">
          Related:{" "}
          <Link href="/legal/sla" className="text-bone hover:underline">
            SLA summary
          </Link>
          ,{" "}
          <Link href="/legal/subprocessors" className="text-bone hover:underline">
            Subprocessors
          </Link>
          .
        </p>
      }
    />
  );
}
