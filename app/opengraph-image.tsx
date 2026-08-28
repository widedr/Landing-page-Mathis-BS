import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#ffffff",
          backgroundImage:
            "radial-gradient(circle at 82% 8%, rgba(249,115,22,0.32) 0%, rgba(249,115,22,0) 55%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: "#f97316" }} />
          <span style={{ fontSize: 40, fontWeight: 800, color: "#1b1b23" }}>Mathis</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 56,
            fontWeight: 800,
            lineHeight: 1.15,
            color: "#1b1b23",
            maxWidth: 920,
          }}
        >
          Pilotez toute la fiscalité de votre patrimoine social depuis une seule plateforme.
        </div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 26, color: "#5b6472" }}>
          La plateforme fiscale des bailleurs sociaux
        </div>
      </div>
    ),
    size,
  );
}
