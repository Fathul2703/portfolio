import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { hasLocale, locales, t } from "@/lib/i18n";

export const alt = `${profile.name} — Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = hasLocale(raw) ? raw : "id";

  const rings = Array.from({ length: 14 }, (_, i) => i);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e0f12",
          color: "#ededea",
          padding: 72,
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {rings.map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 1040 - (60 + i * 70) / 2,
              top: 110 - (46 + i * 54) / 2,
              width: 60 + i * 70,
              height: 46 + i * 54,
              borderRadius: "50%",
              border: `${i % 5 === 4 ? 2 : 1}px solid #26282e`,
              display: "flex",
            }}
          />
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, letterSpacing: 6, color: "#8b8e95" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#ff6b33", display: "flex" }} />
          PORTFOLIO — {profile.location.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 118, fontWeight: 700, letterSpacing: -5, lineHeight: 1, display: "flex" }}>
            {profile.name}
            <span style={{ color: "#ff6b33" }}>.</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 32, color: "#8b8e95", display: "flex" }}>{t(profile.role, lang)}</div>
        </div>
      </div>
    ),
    size
  );
}
