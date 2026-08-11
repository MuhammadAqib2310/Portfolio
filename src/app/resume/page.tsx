"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const skills = [
  { cat: "AI & ML", items: ["LangChain", "OpenAI", "LlamaIndex", "Whisper", "ElevenLabs", "TensorFlow", "HuggingFace"] },
  { cat: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { cat: "Backend", items: ["Python", "FastAPI", "Node.js", "PostgreSQL", "Redis", "MongoDB", "Supabase"] },
  { cat: "DevOps", items: ["AWS", "Docker", "Vercel", "GitHub Actions", "Kubernetes"] },
];

const experience = [
  {
    role: "Senior AI Engineer & Full Stack Developer",
    company: "Freelance / Self-Employed",
    period: "2024 – Present",
    points: [
      "Built 50+ production AI agents, SaaS platforms, and automation systems for global clients",
      "Delivered projects for clients in USA, UK, UAE, Canada, Australia with 99% satisfaction rate",
      "Specialized in LangChain, OpenAI, and multi-agent orchestration systems",
    ],
    color: "#6366F1",
  },
  {
    role: "AI & Automation Specialist",
    company: "Tech Consultancy",
    period: "2023 – 2024",
    points: [
      "Reduced client operational costs by 45% through intelligent workflow automation",
      "Integrated GPT-4, Claude, and custom fine-tuned models into enterprise software",
      "Built real-time data pipelines processing 1M+ events daily",
    ],
    color: "#818CF8",
  },
  {
    role: "Full Stack Developer",
    company: "SaaS Startup",
    period: "2022 – 2023",
    points: [
      "Developed multi-tenant SaaS applications serving 10K+ daily active users",
      "Architected microservices with React, Node.js, PostgreSQL and Redis",
      "Implemented Stripe billing, RBAC, and real-time features with WebSockets",
    ],
    color: "#9A9AA5",
  },
];

export default function ResumePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#08080C", color: "#F4F4F5",
      fontFamily: "var(--font-inter), Inter, sans-serif" }}>

      {/* Header bar */}
      <div style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(12px)" }}>
        <Link href="/" style={{ textDecoration: "none", color: "#9A9AA5", fontSize: "0.85rem",
          fontWeight: 600, display: "flex", alignItems: "center", gap: "0.4rem" }}>
          ← Back to Portfolio
        </Link>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <a href="/resume.pdf" download
            style={{ padding: "0.5rem 1.25rem", borderRadius: "999px", fontSize: "0.8rem",
              fontWeight: 700, background: "linear-gradient(135deg,#6366F1,#818CF8)",
              color: "#fff", textDecoration: "none" }}>
            ↓ Download PDF
          </a>
          <button onClick={() => window.print()}
            style={{ padding: "0.5rem 1.25rem", borderRadius: "999px", fontSize: "0.8rem",
              fontWeight: 700, background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)", color: "#9A9AA5", cursor: "pointer" }}>
            🖨 Print
          </button>
        </div>
      </div>

      {/* Resume content */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 2rem" }}>

        {/* Name & title */}
        <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.5 }}
          style={{ marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, letterSpacing: "-0.03em",
            fontFamily: "var(--font-space-grotesk)", marginBottom: "0.5rem" }}>
            <span style={{ background: "linear-gradient(135deg,#fff,#818CF8)", WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent" }}>Muhammad Aqib</span>
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#6366F1", fontWeight: 700, marginBottom: "1rem" }}>
            AI Engineer & Full Stack Developer
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", fontSize: "0.82rem", color: "#9A9AA5" }}>
            <span>📧 aqibm8123@gmail.com</span>
            <span>📱 +92 337 501 3984</span>
            <span>📍 Multan, Pakistan</span>
            <span>🌐 muhammadaqib.vercel.app</span>
            <span>💼 linkedin.com/in/muhammad-aqib-dev</span>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.1 }}
          style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#6366F1", marginBottom: "0.875rem" }}>Professional Summary</h2>
          <p style={{ color: "#9A9AA5", lineHeight: 1.8, fontSize: "0.9rem" }}>
            Top-rated AI Engineer & Full Stack Developer with 5+ years of experience building production-grade
            AI systems, SaaS platforms, and intelligent automation for startups and enterprises across USA, UK,
            UAE, Canada, and Australia. Specialized in LangChain, OpenAI, multi-agent orchestration, and
            modern web technologies. Delivered 50+ projects with 99% client satisfaction.
          </p>
        </motion.div>

        {/* Experience */}
        <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2 }}
          style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#6366F1", marginBottom: "1.25rem" }}>Experience</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {experience.map((e, i) => (
              <div key={i} style={{ paddingLeft: "1rem", borderLeft: `2px solid ${e.color}40` }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.25rem" }}>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#F4F4F5" }}>{e.role}</h3>
                  <span style={{ fontSize: "0.75rem", color: e.color, fontWeight: 700 }}>{e.period}</span>
                </div>
                <p style={{ fontSize: "0.8rem", color: e.color, fontWeight: 600, marginBottom: "0.625rem" }}>{e.company}</p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  {e.points.map((pt, j) => (
                    <li key={j} style={{ fontSize: "0.825rem", color: "#9A9AA5", display: "flex", gap: "0.5rem", lineHeight: 1.6 }}>
                      <span style={{ color: e.color, flexShrink: 0 }}>▸</span>{pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.3 }}
          style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#6366F1", marginBottom: "1.25rem" }}>Technical Skills</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
            {skills.map(s => (
              <div key={s.cat} style={{ padding: "1rem", borderRadius: "0.875rem",
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "#6366F1", marginBottom: "0.625rem" }}>{s.cat}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {s.items.map(item => (
                    <span key={item} style={{ fontSize: "0.72rem", fontWeight: 600, padding: "0.2rem 0.5rem",
                      borderRadius: "0.375rem", background: "rgba(99,102,241,0.1)",
                      border: "1px solid rgba(99,102,241,0.2)", color: "#818CF8" }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.4 }}>
          <h2 style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#6366F1", marginBottom: "1rem" }}>Key Achievements</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px,1fr))", gap: "0.875rem" }}>
            {[
              { v:"50+",  l:"Projects Delivered" },
              { v:"5+",   l:"Years Experience" },
              { v:"99%",  l:"Client Satisfaction" },
              { v:"10+",  l:"Countries Served" },
            ].map(s => (
              <div key={s.l} style={{ textAlign: "center", padding: "1rem", borderRadius: "0.875rem",
                background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 900,
                  background: "linear-gradient(135deg,#fff,#818CF8)", WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent" }}>{s.v}</div>
                <div style={{ fontSize: "0.65rem", color: "#55555F", fontWeight: 600, marginTop: "0.25rem" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
