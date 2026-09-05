"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const skills = [
  { cat: "Frontend",  items: ["React.js", "Next.js", "HTML5 & CSS3", "TypeScript", "JavaScript", "Responsive Design"] },
  { cat: "Backend",   items: ["Node.js", "Express.js", "Python", "Java", "FastAPI", "RESTful API Design"] },
  { cat: "Database",  items: ["PostgreSQL", "MongoDB", "SQLAlchemy", "Redis", "Supabase"] },
  { cat: "AI & DevOps", items: ["AI Integration", "Claude API", "Gemini API", "OpenAI", "Docker (Basics)", "Git & GitHub", "Cloud Deployment", "Stripe Payment"] },
];

const experiences = [
  {
    role: "Full Stack & AI Automation Engineer",
    company: "Freelance / Self-Employed — Remote",
    period: "2022 – Present",
    points: [
      "Building production-ready SaaS platforms and AI-powered applications for clients globally",
      "Delivered projects including AI-driven CRM, lead-generation SaaS, and automation dashboards",
      "Clients in real estate, HR, and business sectors across multiple countries",
      "Proficient in integrating AI tools like Claude and Gemini APIs",
    ],
    color: "#1E3A5F",
  },
  {
    role: "AI Lead Generation SaaS — Developer",
    company: "Independent Project",
    period: "2025 – 2026",
    points: [
      "Built full-stack, AI-powered B2B lead-generation platform using Python (FastAPI) and Next.js",
      "JWT authentication, PostgreSQL/SQLAlchemy backend, OpenAI-driven lead scoring",
      "Stripe-integrated subscription billing system",
    ],
    color: "#C9A227",
  },
  {
    role: "Qanoon Bridge — Legal-Tech SaaS Platform",
    company: "Independent Project",
    period: "2022 – 2026",
    points: [
      "Built multi-tenant, AI-assisted legal platform connecting citizens with verified lawyers across Pakistan",
      "Tech stack: Next.js, React, TypeScript, Express.js with PostgreSQL",
    ],
    color: "#2563EB",
  },
  {
    role: "PhytoPathometric — AI Plant Disease Detection",
    company: "Independent Project",
    period: "2025 – 2026",
    points: [
      "Cross-platform (web + Android) plant disease detection app using React 19 & TypeScript",
      "Python (FastAPI) AI backend leveraging OpenCV, scikit-image, and CIELAB color-space analysis",
    ],
    color: "#059669",
  },
];

export default function ResumePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF7", color: "#0F172A",
      fontFamily: "var(--font-inter), Inter, sans-serif" }}>

      {/* Header bar */}
      <div style={{ background: "rgba(255,255,255,0.95)", borderBottom: "1px solid rgba(30,58,95,0.1)",
        padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(12px)" }}>
        <Link href="/" style={{ textDecoration: "none", color: "#475569", fontSize: "0.85rem",
          fontWeight: 600, display: "flex", alignItems: "center", gap: "0.4rem" }}>
          ← Back to Portfolio
        </Link>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <a href="/resume.pdf" download
            style={{ padding: "0.5rem 1.25rem", borderRadius: "999px", fontSize: "0.8rem",
              fontWeight: 700, background: "linear-gradient(135deg,#1E3A5F,#2563EB)",
              color: "#fff", textDecoration: "none" }}>
            ↓ Download PDF
          </a>
          <button onClick={() => window.print()}
            style={{ padding: "0.5rem 1.25rem", borderRadius: "999px", fontSize: "0.8rem",
              fontWeight: 700, background: "rgba(30,58,95,0.06)",
              border: "1px solid rgba(30,58,95,0.12)", color: "#475569", cursor: "pointer" }}>
            🖨 Print
          </button>
        </div>
      </div>

      {/* Resume content */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 2rem" }}>

        {/* Name & title */}
        <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.5 }}
          style={{ marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: "1px solid rgba(30,58,95,0.1)" }}>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, letterSpacing: "-0.03em",
            fontFamily: "var(--font-space-grotesk)", marginBottom: "0.5rem" }}>
            <span style={{ background: "linear-gradient(135deg,#1E3A5F,#C9A227)", WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent" }}>M Aqib</span>
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#1E3A5F", fontWeight: 700, marginBottom: "1rem" }}>
            Full Stack and AI Automation Engineer
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", fontSize: "0.82rem", color: "#475569" }}>
            <span>📧 aqibm8123@gmail.com</span>
            <span>📱 +92 337 501 3984</span>
            <span>📍 Ward No 1 Mohala Tiba Sultan Pura Kot, Addu</span>
            <a href="https://portfolio-two-henna-88muozl67z.vercel.app" target="_blank" rel="noopener noreferrer"
              style={{ color: "#2563EB", textDecoration: "none" }}>🌐 Portfolio</a>
          </div>
        </motion.div>

        {/* Profile */}
        <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.1 }}
          style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#C9A227", marginBottom: "0.875rem" }}>Profile</h2>
          <p style={{ color: "#475569", lineHeight: 1.8, fontSize: "0.9rem" }}>
            Full-Stack &amp; AI Engineer skilled in React, Next.js, Node.js, Python, and Java, with
            hands-on experience building production-ready SaaS platforms and AI-powered applications.
            Proficient in integrating AI tools like Claude and Gemini APIs and designing scalable backend
            systems with PostgreSQL. Delivered independent projects, including an AI-driven CRM platform,
            a lead-generation SaaS, and automation dashboards for clients in real estate, HR, and business sectors.
            Currently pursuing a BS in Computer Science while continuing to strengthen expertise in AI-native
            application development.
          </p>
        </motion.div>

        {/* Experience */}
        <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.2 }}
          style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#C9A227", marginBottom: "1.25rem" }}>Work Experience</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {experiences.map((e, i) => (
              <div key={i} style={{ paddingLeft: "1rem", borderLeft: `2px solid ${e.color}40` }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.25rem" }}>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0F172A" }}>{e.role}</h3>
                  <span style={{ fontSize: "0.75rem", color: e.color, fontWeight: 700 }}>{e.period}</span>
                </div>
                <p style={{ fontSize: "0.8rem", color: e.color, fontWeight: 600, marginBottom: "0.625rem" }}>{e.company}</p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  {e.points.map((pt, j) => (
                    <li key={j} style={{ fontSize: "0.825rem", color: "#475569", display: "flex", gap: "0.5rem", lineHeight: 1.6 }}>
                      <span style={{ color: e.color, flexShrink: 0 }}>▸</span>{pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.3 }}
          style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#C9A227", marginBottom: "1.25rem" }}>Education</h2>
          <div style={{ paddingLeft: "1rem", borderLeft: "2px solid rgba(30,58,95,0.3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.25rem" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0F172A" }}>Bachelor of Computer Science</h3>
              <span style={{ fontSize: "0.75rem", color: "#1E3A5F", fontWeight: 700 }}>2022 – 2026</span>
            </div>
            <p style={{ fontSize: "0.8rem", color: "#1E3A5F", fontWeight: 600 }}>
              School of Agriculture | Muhammad Nawaz Sharif University of Agriculture Multan
            </p>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.35 }}
          style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#C9A227", marginBottom: "1.25rem" }}>Skills</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
            {skills.map(s => (
              <div key={s.cat} style={{ padding: "1rem", borderRadius: "0.875rem",
                background: "#FFFFFF", border: "1px solid rgba(30,58,95,0.09)",
                boxShadow: "0 2px 8px rgba(30,58,95,0.05)" }}>
                <p style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "#C9A227", marginBottom: "0.625rem" }}>{s.cat}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {s.items.map(item => (
                    <span key={item} style={{ fontSize: "0.72rem", fontWeight: 600, padding: "0.2rem 0.5rem",
                      borderRadius: "0.375rem", background: "rgba(30,58,95,0.06)",
                      border: "1px solid rgba(30,58,95,0.12)", color: "#1E3A5F" }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Languages */}
        <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.4 }}
          style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#C9A227", marginBottom: "1rem" }}>Languages</h2>
          <div style={{ display: "flex", gap: "1rem" }}>
            {["English (Fluent)", "Urdu (Fluent)"].map(lang => (
              <span key={lang} style={{ fontSize: "0.82rem", fontWeight: 600, padding: "0.35rem 1rem",
                borderRadius: "999px", background: "#FFFFFF", border: "1px solid rgba(30,58,95,0.1)",
                color: "#1E3A5F", boxShadow: "0 1px 4px rgba(30,58,95,0.06)" }}>
                {lang}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.45 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px,1fr))", gap: "0.875rem" }}>
            {[
              { v:"20+",  l:"Projects Delivered" },
              { v:"3+",   l:"Years Experience" },
              { v:"100%", l:"Client Satisfaction" },
              { v:"8+",   l:"Countries Served" },
            ].map(s => (
              <div key={s.l} style={{ textAlign: "center", padding: "1rem", borderRadius: "0.875rem",
                background: "#FFFFFF", border: "1px solid rgba(201,162,39,0.2)",
                boxShadow: "0 2px 8px rgba(30,58,95,0.05)" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 900,
                  background: "linear-gradient(135deg,#1E3A5F,#C9A227)", WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent" }}>{s.v}</div>
                <div style={{ fontSize: "0.65rem", color: "#64748B", fontWeight: 600, marginTop: "0.25rem" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
