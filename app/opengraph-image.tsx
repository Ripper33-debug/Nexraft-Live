import { ImageResponse } from "next/og";

export const alt = "Nexraft - Custom web tools studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0E0C",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 14, height: 14, background: "#43D085" }} />
          <span style={{ color: "#E8EDE9", fontSize: 28, fontWeight: 600 }}>
            Nexraft
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#E8EDE9",
              fontSize: 52,
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            Custom web tools for complex products and workflows.
          </span>
          <span
            style={{
              color: "#C4CCC8",
              fontSize: 26,
              marginTop: 24,
            }}
          >
            3D viewers, quote systems, portals, and integrations.
          </span>
        </div>

        <div style={{ display: "flex", gap: 24, color: "#C8D0CC", fontSize: 20 }}>
          <span>3D tools</span>
          <span>Quote flows</span>
          <span>Portals</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
