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
  { value: "20+",  label: "Projects" },
  { value: "5★",   label: "Rating" },
  { value: "100%", label: "Satisfaction" },
  { value: "3+",   label: "Yrs Exp" },
];

const row = [...clients, ...clients];

export default function SocialProof() {
  return (
    <div style={{
      background: "rgba(30,58,95,0.03)",
      borderTop: "1px solid rgba(201,162,39,0.15)",
      borderBottom: "1px solid rgba(201,162,39,0.15)",
      padding: "1rem 0",
      overflow: "hidden",
      position: "relative",
    }}>
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
        background: "linear-gradient(90deg, #FAFAF7, transparent)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
        background: "linear-gradient(-90deg, #FAFAF7, transparent)", pointerEvents: "none",
      }} />

      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <div style={{ flexShrink: 0, paddingLeft: "2rem", fontSize: "0.65rem", fontWeight: 700,
          letterSpacing: "0.2em", textTransform: "uppercase", color: "#94A3B8", whiteSpace: "nowrap" }}>
          Trusted by clients from
        </div>

        <div style={{ overflow: "hidden", flex: 1 }}>
          <div className="anim-marquee" style={{ display: "flex", gap: "1.5rem", width: "max-content" }}>
            {row.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.4rem",
                padding: "0.3rem 0.875rem", borderRadius: "999px",
                background: "rgba(30,58,95,0.04)", border: "1px solid rgba(30,58,95,0.08)", whiteSpace: "nowrap" }}>
                <span style={{ fontSize: "1rem" }}>{c.flag}</span>
                <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#475569" }}>{c.country}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "1.5rem", flexShrink: 0, paddingRight: "2rem" }} className="hidden sm:flex">
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 900,
                background: "linear-gradient(135deg, #1E3A5F, #C9A227)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</div>
              <div style={{ fontSize: "0.58rem", color: "#94A3B8", fontWeight: 600, letterSpacing: "0.1em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
