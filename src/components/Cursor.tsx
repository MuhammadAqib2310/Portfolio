"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    };

    const animate = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + "px";
      follower.style.top = followerY + "px";
      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    animate();

    const onEnter = () => {
      cursor.style.width = "20px";
      cursor.style.height = "20px";
      cursor.style.background = "#00E5FF";
      follower.style.width = "50px";
      follower.style.height = "50px";
    };

    const onLeave = () => {
      cursor.style.width = "12px";
      cursor.style.height = "12px";
      cursor.style.background = "#6D5DFE";
      follower.style.width = "36px";
      follower.style.height = "36px";
    };

    const links = document.querySelectorAll("a, button");
    links.forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
}
