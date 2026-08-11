"use client";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   TextScramble — Matrix-style letter scramble
   Usage: <TextScramble text="Hello World" className="..." style={{...}} trigger={inView} />
───────────────────────────────────────────── */

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

interface Props {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  trigger?: boolean;   // start when true
  speed?: number;      // ms per frame (default 35)
  delay?: number;      // ms before start (default 0)
}

export default function TextScramble({
  text, className = "", style = {}, trigger = true, speed = 35, delay = 0,
}: Props) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const started  = useRef(false);

  useEffect(() => {
    if (!trigger || started.current) return;
    started.current = true;

    let frame   = 0;
    const total = text.length * 3; // frames to fully reveal

    const tick = () => {
      const chars = text.split("").map((ch, i) => {
        if (ch === " ") return " ";
        // reveal threshold: character reveals after its proportional frame
        if (frame >= (i / text.length) * total * 1.5) return ch;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      });
      setDisplay(chars.join(""));
      frame++;
      if (frame < total * 1.5) {
        frameRef.current = setTimeout(tick, speed);
      } else {
        setDisplay(text);
      }
    };

    const t = setTimeout(tick, delay);
    return () => {
      clearTimeout(t);
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [trigger, text, speed, delay]);

  return (
    <span className={className} style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      {display}
    </span>
  );
}
