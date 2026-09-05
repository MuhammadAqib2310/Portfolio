"use client";
import { motion } from "framer-motion";

const links = ["About", "Services", "Projects", "Process", "Experience", "Contact"];

const socials = [
  { label: "GitHub",   href: "https://github.com/MuhammadAqib2310",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> },
  { label: "LinkedIn", href: "https://linkedin.com/in/muhammad-aqib-dev",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label: "Email",    href: "mailto:aqibm8123@gmail.com",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> },
];

export default function Footer() {
  const scrollTo = (id: string) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer style={{ background: "#F4F3EE" }}>

      {/* ── CTA Banner ── */}
      <div style={{ background: "linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)", position: "relative", overflow: "hidden" }}>
        {/* BG pattern */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />
        <div style={{
          position: "absolute", top: "-50%", right: "-10%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,162,39,0.2), transparent 65%)",
          filter: "blur(60px)", pointerEvents: "none",
        }} />

        <div className="wrap" style={{ paddingTop: "3.5rem", paddingBottom: "3.5rem", position: "relative" }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.25rem 0.75rem", borderRadius: "999px", marginBottom: "0.875rem",
                background: "rgba(201,162,39,0.2)", border: "1px solid rgba(201,162,39,0.35)",
                fontSize: "0.65rem", fontWeight: 700, color: "#F0C060",
                letterSpacing: "0.12em", textTransform: "uppercase",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#059669",
                  display: "inline-block", animation: "pulse-glow 2s ease-in-out infinite" }} />
                Open to Work
              </div>
              <h3 style={{ fontSize: "clamp(1.3rem, 3vw, 1.875rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.2 }}>
                Ready to build something great?
              </h3>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.65)", marginTop: "0.5rem" }}>
                Let&apos;s turn your idea into a production-ready product.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 8px 32px rgba(201,162,39,0.5)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("contact")}
                style={{
                  padding: "0.875rem 2rem", borderRadius: "0.875rem",
                  background: "linear-gradient(135deg, #C9A227, #92740D)",
                  color: "#fff", fontWeight: 800, fontSize: "0.9rem",
                  border: "none", cursor: "none",
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  boxShadow: "0 4px 20px rgba(201,162,39,0.3)",
                  whiteSpace: "nowrap",
                }}
              >
                Start a Project
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
              <motion.a
                href="mailto:aqibm8123@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "0.875rem 1.5rem", borderRadius: "0.875rem",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff", fontWeight: 700, fontSize: "0.9rem",
                  textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem",
                  whiteSpace: "nowrap",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                Email Me
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="wrap" style={{ paddingTop: "3rem", paddingBottom: "2.5rem" }}>

        <div className="flex flex-col md:flex-row justify-between gap-10 mb-8">

          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <button onClick={() => scrollTo("hero")} className="flex items-center gap-3 mb-3 select-none">
              <div style={{
                width: 36, height: 36, borderRadius: "0.625rem",
                background: "linear-gradient(135deg, #1E3A5F, #2563EB)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.75rem", fontWeight: 900, color: "#fff",
                boxShadow: "0 2px 10px rgba(30,58,95,0.25)",
              }}>
                MA
              </div>
              <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em" }}>
                M<span style={{ color: "#C9A227" }}>.</span>Aqib
              </span>
            </button>
            <p style={{ fontSize: "0.82rem", color: "#64748B", lineHeight: 1.7, marginBottom: "1.25rem" }}>
              AI Engineer &amp; Full Stack Developer building intelligent systems and scalable products for clients worldwide.
            </p>
            {/* Socials */}
            <div className="flex gap-2">
              {socials.map(s => (
                <motion.a key={s.label} href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}
                  style={{
                    width: 36, height: 36, borderRadius: "0.625rem",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(30,58,95,0.06)", border: "1px solid rgba(30,58,95,0.1)",
                    color: "#64748B", transition: "all 0.2s",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = "#1E3A5F"; el.style.borderColor = "rgba(201,162,39,0.4)";
                    el.style.background = "rgba(201,162,39,0.08)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = "#64748B"; el.style.borderColor = "rgba(30,58,95,0.1)";
                    el.style.background = "rgba(30,58,95,0.06)";
                  }}>
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
              color: "#94A3B8", marginBottom: "1rem" }}>Navigation</p>
            <div className="grid grid-cols-2 gap-x-10 gap-y-2.5">
              {links.map(l => (
                <button key={l} onClick={() => scrollTo(l)}
                  className="text-left text-sm font-medium transition-colors duration-200"
                  style={{ color: "#475569" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#1E3A5F")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#475569")}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div>
            <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
              color: "#94A3B8", marginBottom: "1rem" }}>Contact</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {[
                { icon: "📧", text: "aqibm8123@gmail.com", href: "mailto:aqibm8123@gmail.com" },
                { icon: "📍", text: "Multan, Pakistan", href: null },
                { icon: "🌍", text: "Works Globally", href: null },
              ].map(item => (
                item.href ? (
                  <a key={item.text} href={item.href}
                    style={{ display: "flex", alignItems: "center", gap: "0.5rem",
                      fontSize: "0.82rem", color: "#475569", textDecoration: "none",
                      transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#1E3A5F")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#475569")}>
                    <span>{item.icon}</span>{item.text}
                  </a>
                ) : (
                  <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "0.5rem",
                    fontSize: "0.82rem", color: "#64748B" }}>
                    <span>{item.icon}</span>{item.text}
                  </div>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,162,39,0.35) 30%, rgba(30,58,95,0.15) 70%, transparent)", marginBottom: "1.5rem" }} />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <span style={{ fontSize: "0.78rem", color: "#94A3B8" }}>
            © {new Date().getFullYear()} Muhammad Aqib. All rights reserved.
          </span>
          <span style={{ fontSize: "0.78rem", color: "#94A3B8" }}>
            Built with{" "}
            <span style={{ fontWeight: 700, background: "linear-gradient(135deg, #1E3A5F, #C9A227)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Next.js
            </span>
            {" "}&amp;{" "}
            <span style={{ color: "#1E3A5F", fontWeight: 600 }}>Framer Motion</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
