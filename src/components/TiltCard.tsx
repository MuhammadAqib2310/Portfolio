"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  intensity?: number;
}

export default function TiltCard({
  children,
  className = "",
  style = {},
  intensity = 8,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt]     = useState({ x: 0, y: 0 });
  const [glow, setGlow]     = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx   = (e.clientX - rect.left) / rect.width;
    const cy   = (e.clientY - rect.top)  / rect.height;
    setTilt({
      x: (cy - 0.5) * -intensity * 2,
      y: (cx - 0.5) *  intensity * 2,
    });
    setGlow({ x: cx * 100, y: cy * 100 });
  };

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlow({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: hovered ? 1.025 : 1,
        y: hovered ? -6 : 0,
      }}
      transition={{ type: "spring", stiffness: 280, damping: 22, mass: 0.5 }}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        position: "relative",
        overflow: "hidden",
        /* Glassmorphism layer */
        background: hovered
          ? "rgba(255,255,255,0.055)"
          : "rgba(255,255,255,0.035)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        /* Premium border + glow on hover */
        boxShadow: hovered
          ? "0 8px 48px rgba(255,255,255,0.22), 0 2px 16px rgba(129,140,248,0.12), 0 0 0 1px rgba(129,140,248,0.25)"
          : "0 4px 24px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.06)",
        border: hovered
          ? "1px solid rgba(129,140,248,0.3)"
          : "1px solid rgba(255,255,255,0.08)",
        transition: "box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease",
        ...style,
      }}
    >
      {/* Mouse-follow radial shine */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.08) 0%, transparent 55%)`,
          pointerEvents: "none",
          zIndex: 2,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
          borderRadius: "inherit",
        }}
      />
      {/* Top edge highlight on hover */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(129,140,248,0.6), transparent)",
          pointerEvents: "none",
          zIndex: 3,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s",
        }}
      />
      {children}
    </motion.div>
  );
}
