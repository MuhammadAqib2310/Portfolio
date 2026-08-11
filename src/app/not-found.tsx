"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* mini neural network bg */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    let t = 0;

    const dots: { x: number; y: number; vx: number; vy: number }[] = [];
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      dots.length = 0;
      for (let i = 0; i < 60; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
        });
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width)  d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "#6366F1";
        ctx.globalAlpha = 0.4 + Math.sin(t) * 0.15;
        ctx.fill();
      });
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = "#6366F1";
            ctx.globalAlpha = (1 - dist / 120) * 0.12;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div style={{
      minHeight: "100vh", background: "#08080C",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", fontFamily: "var(--font-inter), Inter, sans-serif",
    }}>
      {/* Neural bg */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      {/* Glow orbs */}
      <div style={{ position: "absolute", width: 500, height: 500, top: "10%", left: "20%",
        background: "radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)", filter: "blur(80px)", borderRadius: "50%",
        animation: "pulse-glow 4s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 400, height: 400, bottom: "10%", right: "15%",
        background: "radial-gradient(circle, rgba(129,140,248,0.08), transparent 70%)", filter: "blur(70px)", borderRadius: "50%" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "2rem" }}>

        {/* 404 giant text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "relative", marginBottom: "1.5rem" }}
        >
          <div style={{
            fontSize: "clamp(7rem, 20vw, 14rem)",
            fontWeight: 900,
            lineHeight: 1,
            fontFamily: "var(--font-space-grotesk), sans-serif",
            background: "linear-gradient(135deg, #FFFFFF 0%, #6366F1 50%, #818CF8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.04em",
            filter: "drop-shadow(0 0 40px rgba(99,102,241,0.4))",
          }}>
            404
          </div>
          {/* Glitch lines */}
          <motion.div
            animate={{ opacity: [0, 1, 0], x: [0, -4, 4, 0] }}
            transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 3 }}
            style={{
              position: "absolute", inset: 0,
              fontSize: "clamp(7rem, 20vw, 14rem)", fontWeight: 900, lineHeight: 1,
              fontFamily: "var(--font-space-grotesk), sans-serif",
              color: "#818CF8", opacity: 0,
              letterSpacing: "-0.04em",
              clipPath: "inset(40% 0 50% 0)",
            }}
          >
            404
          </motion.div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 style={{
            fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
            fontWeight: 800, color: "#F4F4F5", marginBottom: "0.75rem",
            fontFamily: "var(--font-space-grotesk), sans-serif",
          }}>
            Page Not Found
          </h1>
          <p style={{ fontSize: "0.95rem", color: "#55555F", marginBottom: "2.5rem", maxWidth: 400, margin: "0 auto 2.5rem" }}>
            Looks like this page got lost in the AI training data. Let&apos;s get you back on track.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          <motion.a
            href="/"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(99,102,241,0.5)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "0.875rem 2rem", borderRadius: "999px",
              background: "linear-gradient(135deg, #6366F1, #818CF8)",
              color: "#fff", fontWeight: 800, fontSize: "0.9rem",
              textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem",
              boxShadow: "0 4px 24px rgba(99,102,241,0.35)",
            }}
          >
            ← Back to Home
          </motion.a>

          <motion.a
            href={`https://wa.me/923375013984?text=${encodeURIComponent("Hi Aqib! I visited your portfolio.")}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "0.875rem 2rem", borderRadius: "999px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#9A9AA5", fontWeight: 700, fontSize: "0.9rem",
              textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem",
            }}
          >
            💬 Contact Me
          </motion.a>
        </motion.div>

        {/* Quick nav links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{ marginTop: "3rem", display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          {["/#about", "/#projects", "/#services", "/#contact"].map(link => (
            <a key={link} href={link} style={{
              fontSize: "0.8rem", fontWeight: 600, color: "#55555F", textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#818CF8")}
            onMouseLeave={e => (e.currentTarget.style.color = "#55555F")}
            >
              {link.replace("/#", "").charAt(0).toUpperCase() + link.replace("/#", "").slice(1)}
            </a>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse-glow {
          0%,100% { opacity: 0.6; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
