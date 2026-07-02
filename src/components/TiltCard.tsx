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
  const [tilt, setTilt]   = useState({ x: 0, y: 0 });
  const [glow, setGlow]   = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx   = (e.clientX - rect.left) / rect.width;   // 0–1
    const cy   = (e.clientY - rect.top)  / rect.height;  // 0–1
    setTilt({
      x: (cy - 0.5) * -intensity * 2,  // tilt up/down
      y: (cx - 0.5) *  intensity * 2,  // tilt left/right
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
        scale: hovered ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 24, mass: 0.5 }}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Shine highlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
          pointerEvents: "none",
          zIndex: 2,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
      {children}
    </motion.div>
  );
}
