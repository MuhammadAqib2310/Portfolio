"use client";
import { motion } from "framer-motion";

const clients = [
  { flag: "🇺🇸", country: "USA" },
  { flag: "🇬🇧", country: "UK" },
  { flag: "🇦🇪", country: "UAE" },
  { flag: "🇨🇦", country: "Canada" },
  { flag: "🇦🇺", country: "Australia" },
  { flag: "🇩🇪", country: "Germany" },
  { flag: "🇸🇦", country: "Saudi Arabia" },
  { flag: "🇳🇱", country: "Netherlands" },
];

const stats = [
  { value: "50+",  label: "Projects" },
  { value: "5★",   label: "Rating" },
  { value: "99%",  label: "Satisfaction" },
  { value: "24h",  label: "Response" },
];

/* duplicate for seamless loop */
const row = [...clients, ...clients];

export default function SocialProof() {
  return (
    <div style={{
      background: "rgba(255,255,255,0.02)",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      padding: "1rem 0",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* left fade */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
        background: "linear-gradient(90deg, #08080C, transparent)",
        pointerEvents: "none",
      }} />
      {/* right fade */}
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
        background: "linear-gradient(-90deg, #08080C, transparent)",
        pointerEvents: "none",
      }} />

      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>

        {/* Label */}
        <div style={{
          flexShrink: 0, paddingLeft: "2rem",
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em",
          textTransform: "uppercase", color: "#55555F", whiteSpace: "nowrap",
        }}>
          Trusted by clients from
        </div>

        {/* Scrolling flags */}
        <div style={{ overflow: "hidden", flex: 1 }}>
          <div className="anim-marquee" style={{ display: "flex", gap: "1.5rem", width: "max-content" }}>
            {row.map((c, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                padding: "0.3rem 0.875rem", borderRadius: "999px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                whiteSpace: "nowrap",
              }}>
                <span style={{ fontSize: "1rem" }}>{c.flag}</span>
                <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#9A9AA5" }}>{c.country}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: "flex", gap: "1.5rem", flexShrink: 0, paddingRight: "2rem",
        }} className="hidden sm:flex">
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "0.85rem", fontWeight: 900,
                background: "linear-gradient(135deg, #FFFFFF, #818CF8)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>{s.value}</div>
              <div style={{ fontSize: "0.58rem", color: "#55555F", fontWeight: 600, letterSpacing: "0.1em" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
