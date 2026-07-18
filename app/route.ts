import { readFileSync } from "node:fs";
import { join } from "node:path";

// Serve the static rebuild homepage verbatim (content/home.html).
// All other routes (/pricing, /work/*, /pay, etc.) remain React pages
// under app/(site). Prerendered at build time.
export const dynamic = "force-static";

const html = readFileSync(join(process.cwd(), "content", "home.html"), "utf8");

export async function GET() {
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
