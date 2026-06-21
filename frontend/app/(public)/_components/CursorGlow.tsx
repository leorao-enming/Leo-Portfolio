"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animId: number;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;

    const tick = () => {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.left = `${cx}px`;
        glowRef.current.style.top = `${cy}px`;
      }
      animId = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    animId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 0,
        width: "700px",
        height: "700px",
        transform: "translate(-50%, -50%)",
        background:
          "radial-gradient(circle, rgba(0,255,65,0.055) 0%, rgba(0,255,65,0.02) 35%, transparent 70%)",
        borderRadius: "50%",
        willChange: "left, top",
      }}
    />
  );
}
