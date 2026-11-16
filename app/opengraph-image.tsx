import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} – ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 80% 20%, #7a1f3526, transparent 50%), radial-gradient(circle at 10% 90%, #3d0f1b1f, transparent 50%), #ffffff",
          color: "#1c1416",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 800, display: "flex" }}>{site.name}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3 }}>Laptops on rent.</div>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3, color: "#7a1f35" }}>Delivered in hours.</div>
        </div>
        <div style={{ fontSize: 30, color: "#62616e", display: "flex" }}>
          Laptops · MacBooks · Desktops · Hourly rental · Chennai
        </div>
      </div>
    ),
    size
  );
}
