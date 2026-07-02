"use client";
import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "hover" | "click" | "text";

export default function Cursor() {
  const dotRef      = useRef<HTMLDivElement>(null);
  const ringRef     = useRef<HTMLDivElement>(null);
  const labelRef    = useRef<HTMLDivElement>(null);
  const pos         = useRef({ x: -100, y: -100 });
  const ringPos     = useRef({ x: -100, y: -100 });
  const [state, setState]   = useState<CursorState>("default");
  const [label, setLabel]   = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    const lbl  = labelRef.current;
    if (!dot || !ring || !lbl) return;

    let rafId: number;

    /* ── smooth ring follow ── */
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.13;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.13;
      ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      lbl.style.transform  = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    };
    animate();

    /* ── mouse move ── */
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      if (!visible) setVisible(true);
    };

    /* ── detect element under cursor ── */
    const onEnter = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const tag = el.tagName.toLowerCase();
      const role = el.getAttribute("role");

      if (tag === "a" || tag === "button" || role === "button" || el.closest("a, button")) {
        /* check for data-cursor label */
        const cursorLabel = (el.closest("[data-cursor]") as HTMLElement)?.dataset?.cursor
          ?? (el as HTMLElement).dataset?.cursor ?? "";
        setLabel(cursorLabel);
        setState("hover");
      } else if (tag === "input" || tag === "textarea") {
        setState("text");
        setLabel("");
      } else {
        setState("default");
        setLabel("");
      }
    };

    const onDown  = () => setState("click");
    const onUp    = () => setState(prev => prev === "click" ? "default" : prev);
    const onLeave = () => { setVisible(false); setState("default"); setLabel(""); };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup",   onUp);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup",   onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [visible]);

  /* ── size / style per state ── */
  const dotSize   = state === "click" ? 6  : state === "hover" ? 8  : 10;
  const ringSize  = state === "click" ? 28 : state === "hover" ? 48 : 34;
  const ringBorder = state === "hover"
    ? "2px solid rgba(124,111,255,0.9)"
    : state === "text"
    ? "2px solid rgba(0,229,255,0.7)"
    : "1.5px solid rgba(124,111,255,0.5)";
  const dotColor = state === "hover"  ? "#00E5FF"
    : state === "text"   ? "#00E5FF"
    : state === "click"  ? "#fff"
    : "#7C6FFF";

  return (
    <>
      {/* Dot — instant */}
      <div
        ref={dotRef}
        style={{
          position:  "fixed",
          top:       0,
          left:      0,
          width:     dotSize,
          height:    dotSize,
          borderRadius: "50%",
          background: dotColor,
          pointerEvents: "none",
          zIndex:    99999,
          mixBlendMode: "screen",
          opacity:   visible ? 1 : 0,
          transition: "width 0.2s, height 0.2s, background 0.2s, opacity 0.3s",
          willChange: "transform",
        }}
      />

      {/* Ring — lagging */}
      <div
        ref={ringRef}
        style={{
          position:  "fixed",
          top:       0,
          left:      0,
          width:     ringSize,
          height:    ringSize,
          borderRadius: "50%",
          border:    ringBorder,
          pointerEvents: "none",
          zIndex:    99998,
          opacity:   visible ? (state === "hover" ? 1 : 0.75) : 0,
          transition: "width 0.25s cubic-bezier(0.22,1,0.36,1), height 0.25s cubic-bezier(0.22,1,0.36,1), border 0.2s, opacity 0.3s",
          background: state === "hover" ? "rgba(124,111,255,0.06)" : "transparent",
          willChange: "transform",
          backdropFilter: state === "hover" ? "blur(2px)" : "none",
        }}
      />

      {/* Label inside ring */}
      <div
        ref={labelRef}
        style={{
          position:   "fixed",
          top:        0,
          left:       0,
          pointerEvents: "none",
          zIndex:     99997,
          opacity:    visible && label ? 1 : 0,
          transition: "opacity 0.2s",
          fontSize:   "0.55rem",
          fontWeight: 800,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color:      "#fff",
          whiteSpace: "nowrap",
          marginTop:  "22px",
          willChange: "transform",
        }}
      >
        {label}
      </div>

      {/* Text cursor bar */}
      {state === "text" && (
        <div
          style={{
            position:  "fixed",
            top:       0,
            left:      0,
            transform: `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`,
            width:     2,
            height:    20,
            background: "#00E5FF",
            borderRadius: 1,
            pointerEvents: "none",
            zIndex:    99999,
            opacity:   visible ? 1 : 0,
            animation: "blink 1s ease-in-out infinite",
          }}
        />
      )}
    </>
  );
}
