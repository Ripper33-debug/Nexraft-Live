export type StatusProbe = {
  id: string;
  name: string;
  url: string;
  detail: string;
};

export type ProbeResult = StatusProbe & {
  status: "operational" | "degraded" | "outage";
  latencyMs: number;
  httpStatus: number | null;
  error?: string;
};

export const STATUS_PROBES: StatusProbe[] = [
  {
    id: "nexraft",
    name: "nexraft.com",
    url: "https://www.nexraft.com",
    detail: "Marketing site and primary entry point.",
  },
  {
    id: "weatherhavenusa",
    name: "weatherhavenusa.com",
    url: "https://weatherhavenusa.com",
    detail: "Client production site operated by Nexraft.",
  },
  {
    id: "outfyre",
    name: "outfyre.com",
    url: "https://outfyre.com",
    detail: "Client production site operated by Nexraft.",
  },
];

const TIMEOUT_MS = 8_000;

async function probeEndpoint(probe: StatusProbe): Promise<ProbeResult> {
  const started = Date.now();

  try {
    const response = await fetch(probe.url, {
      method: "GET",
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: {
        "User-Agent": "Nexraft-Status-Probe/1.0",
        Accept: "text/html",
      },
    });

    const latencyMs = Date.now() - started;
    const httpStatus = response.status;

    if (response.ok) {
      return {
        ...probe,
        status: "operational",
        latencyMs,
        httpStatus,
      };
    }

    if (httpStatus >= 500) {
      return {
        ...probe,
        status: "outage",
        latencyMs,
        httpStatus,
        error: `HTTP ${httpStatus}`,
      };
    }

    return {
      ...probe,
      status: "degraded",
      latencyMs,
      httpStatus,
      error: `HTTP ${httpStatus}`,
    };
  } catch (error) {
    return {
      ...probe,
      status: "outage",
      latencyMs: Date.now() - started,
      httpStatus: null,
      error: error instanceof Error ? error.message : "Probe failed",
    };
  }
}

export async function runStatusProbes(): Promise<{
  checkedAt: string;
  results: ProbeResult[];
}> {
  const results = await Promise.all(STATUS_PROBES.map(probeEndpoint));

  return {
    checkedAt: new Date().toISOString(),
    results,
  };
}

export function overallStatus(
  results: ProbeResult[],
): "operational" | "degraded" | "outage" {
  if (results.some((item) => item.status === "outage")) return "outage";
  if (results.some((item) => item.status === "degraded")) return "degraded";
  return "operational";
}
