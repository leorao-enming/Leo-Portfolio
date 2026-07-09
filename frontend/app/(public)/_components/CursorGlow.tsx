"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const ringRef  = useRef<HTMLDivElement>(null);
  const dotRef   = useRef<HTMLDivElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);

  const mouseRef    = useRef({ x: -200, y: -200 });
  const ringRef2    = useRef({ x: -200, y: -200 });
  const stateRef    = useRef<"default" | "hover" | "click" | "hover-check">("default");
  const rafRef      = useRef(0);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!supportsFinePointer || prefersReducedMotion) return;

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onDown = () => { stateRef.current = "click"; };
    const onUp   = () => { stateRef.current = "hover-check"; };

    const SELECTORS = "a, button, [role=button], label, input, textarea, select";
    const updateHover = (target: EventTarget | null) => {
      const el = target instanceof Element ? target.closest(SELECTORS) : null;
      stateRef.current = el ? "hover" : "default";
    };
    const onPointerOver = (e: PointerEvent) => updateHover(e.target);
    const onPointerOut = (e: PointerEvent) => updateHover(e.relatedTarget);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const t = 0.14;

      ringRef2.current.x = lerp(ringRef2.current.x, mx, t);
      ringRef2.current.y = lerp(ringRef2.current.y, my, t);

      const rx = ringRef2.current.x;
      const ry = ringRef2.current.y;

      const ring = ringRef.current;
      const dot  = dotRef.current;
      const glow = glowRef.current;

      if (ring) {
        const size   = stateRef.current === "hover" ? 52 : stateRef.current === "click" ? 18 : 30;
        const border = stateRef.current === "hover"
          ? "1.5px solid var(--color-terminal-green)"
          : "1px solid rgba(255,255,255,0.45)";
        const blend  = stateRef.current === "hover" ? "normal" : "difference";

        ring.style.transform   = `translate(${rx - size / 2}px, ${ry - size / 2}px)`;
        ring.style.width       = `${size}px`;
        ring.style.height      = `${size}px`;
        ring.style.border      = border;
        ring.style.mixBlendMode = blend;
        ring.style.opacity     = mx < 0 ? "0" : "1";
      }

      if (dot) {
        dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
        dot.style.opacity   = mx < 0 ? "0" : "1";
      }

      if (glow) {
        glow.style.left = `${mx}px`;
        glow.style.top  = `${my}px`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    document.addEventListener("mousemove",  onMove, { passive: true });
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup",   onUp);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Ambient green glow (slow lerp — matches old behavior) */}
      <div
        ref={glowRef}
        aria-hidden
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 0,
          width: 600,
          height: 600,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(0,255,65,0.05) 0%, rgba(0,255,65,0.015) 40%, transparent 70%)",
          borderRadius: "50%",
          willChange: "left, top",
          transition: "left 0.08s linear, top 0.08s linear",
        }}
      />

      {/* Ring — lerped, expands on hover */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99998,
          transition: "width 0.18s cubic-bezier(0.34,1.56,0.64,1), height 0.18s cubic-bezier(0.34,1.56,0.64,1), border 0.18s, opacity 0.2s",
          willChange: "transform, width, height",
        }}
      />

      {/* Dot — precise, no lerp */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--color-terminal-green)",
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
          boxShadow: "0 0 6px rgba(0,255,65,0.7)",
        }}
      />
    </>
  );
}
