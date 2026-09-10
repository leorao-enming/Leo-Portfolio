"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

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
    minHeight: 44, /* comfortable touch target on mobile */
    borderRadius: 9999,
    fontFamily: "var(--font-display)",
    fontWeight: 500,
    fontSize: 13,
    letterSpacing: "0.04em",
    textDecoration: "none",
    transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.2s, box-shadow 0.2s",
    willChange: "transform",
    cursor: "pointer",
  };

  if (variant === "primary") {
    return (
      <a ref={ref} href={href} style={{ ...base, background: "var(--color-terminal-green)", color: "#050507", fontWeight: 600, boxShadow: "0 0 28px rgba(104,242,154,0.22)" }} onMouseMove={onMove} onMouseLeave={onLeave}>
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

      {/* ── Location + status, top right ─────────────────────────── */}
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
        <div style={{ display: "flex", alignItems: "center", gap: 7, justifyContent: "flex-end" }}>
          <span style={{ fontSize: 11, letterSpacing: "0.3em", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
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
        {/* Headline — one h1 carrying name and discipline, so the server
            sends a real headline to crawlers instead of animated placeholder. */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "clamp(20px, 3vh, 32px)" }}
        >
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(34px, 6.5vw, 84px)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.04,
              color: "rgba(255,255,255,0.94)",
              margin: 0,
              maxWidth: "18ch",
            }}
          >
            Leo Rao
            <span
              style={{
                display: "block",
                fontSize: "clamp(17px, 2.4vw, 32px)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1.25,
                color: "var(--color-terminal-green)",
                marginTop: "0.35em",
                maxWidth: "24ch",
              }}
            >
              Chemical engineering at Toronto — process systems, and the software that measures them.
            </span>
          </h1>
        </motion.div>

        {/* Tagline, demoted from the headline it used to occupy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: reduced ? 0 : 0.35 }}
          style={{
            fontSize: "clamp(14px, 1.3vw, 17px)",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.62)",
            maxWidth: "48ch",
            margin: "0 0 clamp(28px, 4vh, 44px)",
          }}
        >
          By day, I study process systems. By night, I write precision code.
          Same machine, different rules.
        </motion.p>

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
            <span style={{ fontSize: 11, letterSpacing: "0.36em", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
              SCROLL TO EXPLORE
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
