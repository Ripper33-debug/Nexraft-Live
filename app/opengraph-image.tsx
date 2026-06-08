import { ImageResponse } from "next/og";

export const alt = "Nexraft - Web, Hosting and 3D Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f1b15",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <p
          style={{
            color: "#c7d2cb",
            fontSize: 14,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Engineering studio
        </p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p
            style={{
              color: "#ffffff",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            Everything you need
          </p>
          <p
            style={{
              color: "#ffffff",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              margin: "8px 0 0",
            }}
          >
            to launch and keep it{" "}
            <span style={{ color: "#3ddc84" }}>fast</span>.
          </p>
        </div>
        <p
          style={{
            color: "#c7d2cb",
            fontSize: 14,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Web / Hosting / 3D
        </p>
      </div>
    ),
    { ...size },
  );
}
