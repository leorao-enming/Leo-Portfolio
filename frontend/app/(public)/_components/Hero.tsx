"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/* ── Text scramble hook (lusion-style) ─────────────────────────── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234";

function useScramble(text: string, startDelay = 0) {
  const [display, setDisplay] = useState("".padEnd(text.length, " "));
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) { setDisplay(text); return; }

    let frame = 0;
    const fps = 2;          // resolve N chars per frame
    let raf: number;
    let started = false;
    const startAt = startDelay / 16;

    const tick = () => {
      frame++;
      if (frame < startAt) { raf = requestAnimationFrame(tick); return; }
      if (!started) { started = true; }

      const elapsed = frame - startAt;
      const revealed = Math.min(Math.floor((elapsed / 20) * text.length), text.length);

      if (revealed >= text.length) { setDisplay(text); return; }

      const out = text.split("").map((ch, i) => {
        if (ch === " " || ch === "." || ch === ",") return ch;
        if (i < revealed) return ch;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join("");

      setDisplay(out);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, startDelay, reduced]);

  return display;
}

/* ── Magnetic CTA button ─────────────────────────────────────────── */
function MagneticBtn({
  children,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "ghost";
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width  / 2) * 0.28;
    const y = (e.clientY - r.top  - r.height / 2) * 0.28;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };

  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "13px 26px",
    borderRadius: 9999,
    fontFamily: "var(--font-display)",
    fontWeight: 500,
    fontSize: 13,
    letterSpacing: "0.04em",
    textDecoration: "none",
    transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.2s, box-shadow 0.2s",
    willChange: "transform",
    cursor: "none",
  };

  if (variant === "primary") {
    return (
      <a ref={ref} href={href} style={{ ...base, background: "var(--color-terminal-green)", color: "#050507", fontWeight: 600, boxShadow: "0 0 28px rgba(0,255,65,0.22)" }} onMouseMove={onMove} onMouseLeave={onLeave}>
        {children}
        <span style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>→</span>
      </a>
    );
  }

  return (
    <a ref={ref} href={href} style={{ ...base, background: "transparent", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.14)" }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
      <span style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>↗</span>
    </a>
  );
}

/* ── Hero ───────────────────────────────────────────────────────── */
export function Hero() {
  const reduced = useReducedMotion();

  /* scramble the three lines with staggered delays */
  const line1 = useScramble("By day, I build quant systems.", 200);
  const line2 = useScramble("By night, I write precision code.", 600);
  const line3 = useScramble("Same machine. Different rules.", 1000);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
        background: "#050507",
      }}
    >
      {/* ── Cinematic gradient bg ───────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 70% at 15% 55%, rgba(0,40,15,0.55) 0%, transparent 60%)," +
            "radial-gradient(ellipse 50% 50% at 80% 20%, rgba(0,10,5,0.3) 0%, transparent 55%)," +
            "radial-gradient(ellipse 100% 80% at 50% 100%, rgba(0,0,0,0.7) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Orb breathe ─────────────────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "8%",
          left: "-8%",
          width: "clamp(400px, 55vw, 800px)",
          height: "clamp(400px, 55vw, 800px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,255,65,0.055) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "orb-breathe 9s ease-in-out infinite",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* ── Giant backdrop word (Wang-13 / nirnor style) ───────── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(120px, 22vw, 320px)",
          fontWeight: 800,
          letterSpacing: "-0.06em",
          color: "rgba(255,255,255,0.025)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
          lineHeight: 1,
        }}
      >
        LEOLOGIC
      </div>

      {/* ── Top-right descriptor (Wang-13 right-side small text) ── */}
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          top: "clamp(90px, 14vh, 140px)",
          right: "clamp(24px, 5vw, 80px)",
          textAlign: "right",
          zIndex: 2,
        }}
      >
        {[
          "AI Systems Engineer.",
          "Quant Research.",
          "A studio of one.",
        ].map((line, i) => (
          <div
            key={i}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(13px, 1.4vw, 17px)",
              color: i === 0 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.32)",
              letterSpacing: "-0.01em",
              lineHeight: 1.55,
              fontWeight: i === 0 ? 500 : 400,
            }}
          >
            {line}
          </div>
        ))}

        {/* Status dot + label */}
        <div style={{ display: "flex", alignItems: "center", gap: 7, justifyContent: "flex-end", marginTop: 16 }}>
          <span style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
            TORONTO · CA
          </span>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--color-terminal-green)", boxShadow: "0 0 8px rgba(0,255,65,0.7)", animation: "pulse-green 2s ease-in-out infinite" }} />
        </div>
      </motion.div>

      {/* ── Main content — BOTTOM LEFT (Wang-13 asymmetric) ──────── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "0 clamp(24px, 5vw, 80px) clamp(48px, 8vh, 96px)",
          maxWidth: "100%",
        }}
      >
        {/* Scramble headline lines */}
        <div style={{ marginBottom: "clamp(28px, 4vh, 44px)" }}>
          {[line1, line2, line3].map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: reduced ? 0 : i * 0.12 }}
            >
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 5.5vw, 72px)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.08,
                  color: i === 1
                    ? "var(--color-terminal-green)"
                    : i === 2
                    ? "rgba(255,255,255,0.55)"
                    : "rgba(255,255,255,0.92)",
                  margin: 0,
                  fontVariantNumeric: "tabular-nums",
                  textShadow: i === 1 ? "0 0 60px rgba(0,255,65,0.2)" : undefined,
                }}
              >
                {line}
              </h1>
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: reduced ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}
        >
          <MagneticBtn href="#projects" variant="primary">View Work</MagneticBtn>
          <MagneticBtn href="#contact" variant="ghost">Get in Touch</MagneticBtn>
        </motion.div>

        {/* Bottom bar — nirnor-style horizontal rule + scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: reduced ? 0 : 1.4 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "clamp(40px, 7vh, 72px)",
            paddingTop: 18,
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 1, background: "var(--color-terminal-green)", opacity: 0.4 }} />
            <span style={{ fontSize: 9, letterSpacing: "0.36em", color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
              SCROLL TO EXPLORE
            </span>
          </div>
          <span style={{ fontSize: 9, letterSpacing: "0.24em", color: "rgba(255,255,255,0.15)", fontFamily: "var(--font-mono)" }}>
            01 / 06
          </span>
        </motion.div>
      </div>
    </section>
  );
}
