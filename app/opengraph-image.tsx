import { ImageResponse } from "next/og";

export const alt = "Nexraft - Web, hosting, and 3D studio";
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
          background: "#08080b",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 14, height: 14, background: "#FF4D1C" }} />
          <span style={{ color: "#E9E5DB", fontSize: 28, fontWeight: 600 }}>
            Nexraft
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#E9E5DB",
              fontSize: 52,
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            We build your website, run the servers under it, and make the 3D.
          </span>
          <span
            style={{
              color: "#C9C4B8",
              fontSize: 26,
              marginTop: 24,
            }}
          >
            Built like infrastructure. One studio, one invoice.
          </span>
        </div>

        <div style={{ display: "flex", gap: 24, color: "#CDC8BD", fontSize: 20 }}>
          <span>Web</span>
          <span>Hosting</span>
          <span>3D</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
