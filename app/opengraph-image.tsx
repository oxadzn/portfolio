import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Dynamic social card so links shared to studios/clients render a real preview.
export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #201f22 0%, #475b63 100%)",
          color: "#f3e8ee",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 99,
              background: "#729b79",
            }}
          />
          <span style={{ letterSpacing: 4, textTransform: "uppercase", fontSize: 22 }}>
            {site.role}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "baseline", fontSize: 150, lineHeight: 1, letterSpacing: -4 }}>
            <span>{site.name}</span>
            <span style={{ color: "#729b79" }}>.</span>
          </div>
          <div style={{ marginTop: 24, fontSize: 34, color: "#bacdb0", maxWidth: 900 }}>
            {site.intro}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
