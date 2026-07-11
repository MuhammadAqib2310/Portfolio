"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import PremiumBG from "@/components/PremiumBG";

const WHATSAPP_NUMBER = "923375013984"; // +92 337 501 3984

const contactCards = [
  {
    icon: "💬",
    label: "WhatsApp",
    value: "+92 337 501 3984",
    sub: "Usually replies in minutes",
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Aqib!%20I%20visited%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project.`,
    color: "#25D366",
    glow: "rgba(37,211,102,0.2)",
    badge: "Fastest",
  },
  {
    icon: "📧",
    label: "Email",
    value: "aqibm8123@gmail.com",
    sub: "Response within 24 hours",
    href: "mailto:aqibm8123@gmail.com?subject=Project%20Inquiry&body=Hi%20Aqib,%20I%20visited%20your%20portfolio%20and%20I'd%20like%20to%20discuss%20a%20project.",
    color: "#6366F1",
    glow: "rgba(99,102,241,0.2)",
    badge: null,
  },
  {
    icon: "💼",
    label: "LinkedIn",
    value: "muhammad-aqib-dev",
    sub: "Connect professionally",
    href: "https://linkedin.com/in/muhammad-aqib-dev",
    color: "#0A66C2",
    glow: "rgba(10,102,194,0.2)",
    badge: null,
  },
  {
    icon: "🐙",
    label: "GitHub",
    value: "MuhammadAqib2310",
    sub: "Check out my code",
    href: "https://github.com/MuhammadAqib2310",
    color: "#818CF8",
    glow: "rgba(129,140,248,0.2)",
    badge: null,
  },
];

const quickMessages = [
  "I need an AI Agent built 🤖",
  "I want a SaaS Platform 🚀",
  "Need Full Stack Dev ⚡",
  "Let's discuss a project 💡",
];

export default function Contact() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("aqibm8123@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openWhatsApp = (msg?: string) => {
    const text = msg
      ? encodeURIComponent(`Hi Aqib! ${msg}`)
      : encodeURIComponent("Hi Aqib! I visited your portfolio and I'd like to discuss a project.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="section-pad relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0C0C11 0%, #08080C 100%)" }}
    >
      <PremiumBG variant="aurora" accent="#6366F1" cyan="#818CF8" />

      <div className="absolute pointer-events-none rounded-full"
        style={{ width: 700, height: 700, top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle, rgba(99,102,241,0.08), transparent 65%)", filter: "blur(120px)" }} />

      <div className="wrap">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          <span className="sec-label" style={{ color: "#6366F1" }}>Get In Touch</span>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3rem)", color: "#fff" }}>
            Let&apos;s <span className="g-text">Build Together</span>
          </h2>
          <p className="text-sm sm:text-base mt-3 mx-auto" style={{ color: "#55555F", maxWidth: 480 }}>
            Have a project in mind? Pick the easiest way to reach me — I respond fast.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16" style={{ maxWidth: 1000, margin: "0 auto" }}>

          {/* ── Left: Contact Cards ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <h3 className="font-bold mb-1" style={{ fontSize: "1.1rem", color: "#F4F4F5" }}>
              Contact Me Directly
            </h3>
            <p className="text-sm mb-3" style={{ color: "#55555F" }}>
              No forms, no waiting — reach me instantly on your preferred platform.
            </p>

            {contactCards.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08 }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem 1.25rem",
                  borderRadius: "1.25rem",
                  background: hoveredCard === i ? `${c.glow}` : "rgba(255,255,255,0.03)",
                  border: hoveredCard === i
                    ? `1px solid ${c.color}40`
                    : "1px solid rgba(255,255,255,0.07)",
                  textDecoration: "none",
                  transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                  transform: hoveredCard === i ? "translateX(6px)" : "translateX(0)",
                  boxShadow: hoveredCard === i ? `0 8px 32px ${c.glow}` : "none",
                  cursor: "none",
                }}
              >
                {/* Icon */}
                <div style={{
                  width: 48, height: 48, borderRadius: "0.875rem", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.5rem",
                  background: `${c.color}15`,
                  border: `1px solid ${c.color}30`,
                  boxShadow: hoveredCard === i ? `0 0 20px ${c.color}30` : "none",
                  transition: "box-shadow 0.3s",
                }}>
                  {c.icon}
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#F4F4F5" }}>{c.label}</span>
                    {c.badge && (
                      <span style={{
                        fontSize: "0.6rem", fontWeight: 800, padding: "0.15rem 0.5rem",
                        borderRadius: "999px", background: `${c.color}20`,
                        border: `1px solid ${c.color}40`, color: c.color,
                        letterSpacing: "0.08em",
                      }}>
                        {c.badge}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#9A9AA5", marginBottom: "0.15rem" }}>{c.value}</div>
                  <div style={{ fontSize: "0.7rem", color: "#55555F" }}>{c.sub}</div>
                </div>

                {/* Arrow */}
                <div style={{
                  color: hoveredCard === i ? c.color : "#55555F",
                  transition: "all 0.3s",
                  transform: hoveredCard === i ? "translateX(3px)" : "translateX(0)",
                  fontSize: "1.1rem",
                }}>
                  {c.label === "Email" ? (
                    <motion.button
                      onClick={e => { e.preventDefault(); copyEmail(); }}
                      whileTap={{ scale: 0.9 }}
                      title="Copy email"
                      style={{
                        background: copied ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.06)",
                        border: `1px solid ${copied ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.1)"}`,
                        borderRadius: "0.5rem", padding: "0.25rem 0.5rem",
                        color: copied ? "#22C55E" : "#9A9AA5",
                        fontSize: "0.65rem", fontWeight: 700, cursor: "none",
                        transition: "all 0.2s",
                      }}
                    >
                      {copied ? "✓ Copied" : "Copy"}
                    </motion.button>
                  ) : "→"}
                </div>
              </motion.a>
            ))}

            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                padding: "0.875rem 1rem", borderRadius: "1rem",
                background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.2)",
                marginTop: "0.25rem",
              }}
            >
              <span style={{
                width: 10, height: 10, borderRadius: "50%", flexShrink: 0,
                background: "#22C55E", boxShadow: "0 0 10px #22C55E",
                animation: "pulse-glow 2s ease-in-out infinite",
                display: "inline-block",
              }} />
              <span style={{ fontSize: "0.825rem", fontWeight: 700, color: "#22C55E" }}>
                Available for new projects — Response within 24h
              </span>
            </motion.div>
          </motion.div>

          {/* ── Right: WhatsApp CTA ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="flex flex-col gap-5"
          >
            {/* Main WhatsApp CTA Card */}
            <div style={{
              padding: "2rem",
              borderRadius: "1.75rem",
              background: "rgba(37,211,102,0.05)",
              border: "1px solid rgba(37,211,102,0.2)",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* BG glow */}
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "radial-gradient(ellipse at 80% 20%, rgba(37,211,102,0.08), transparent 60%)",
              }} />

              <div style={{ position: "relative" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>💬</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#F4F4F5", marginBottom: "0.5rem" }}>
                  Message on WhatsApp
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#9A9AA5", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  The fastest way to reach me. Send a quick message and I&apos;ll respond within minutes — not hours.
                </p>

                <motion.button
                  onClick={() => openWhatsApp()}
                  whileHover={{ scale: 1.03, boxShadow: "0 8px 40px rgba(37,211,102,0.35)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: "100%",
                    padding: "0.9rem",
                    borderRadius: "0.875rem",
                    background: "linear-gradient(135deg, #25D366, #128C7E)",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    border: "none",
                    cursor: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    boxShadow: "0 4px 24px rgba(37,211,102,0.25)",
                  }}
                >
                  {/* WhatsApp SVG icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Start WhatsApp Chat →
                </motion.button>
              </div>
            </div>

            {/* Quick Message Buttons */}
            <div>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#55555F", marginBottom: "0.75rem" }}>
                Quick Messages
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.625rem" }}>
                {quickMessages.map((msg, i) => (
                  <motion.button
                    key={i}
                    onClick={() => openWhatsApp(msg)}
                    whileHover={{ scale: 1.03, borderColor: "rgba(99,102,241,0.4)", color: "#F4F4F5" }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: "0.7rem 0.875rem",
                      borderRadius: "0.875rem",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      color: "#9A9AA5",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "none",
                      textAlign: "left",
                      transition: "all 0.2s",
                    }}
                  >
                    {msg}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Info chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["📍 Multan, Pakistan", "🕐 PKT (UTC+5)", "🌍 Works Globally"].map(chip => (
                <span key={chip} style={{
                  padding: "0.35rem 0.875rem",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: "0.72rem",
                  color: "#9A9AA5",
                  fontWeight: 600,
                }}>
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
