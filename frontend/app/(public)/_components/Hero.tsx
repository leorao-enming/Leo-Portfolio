"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as const;

function MagneticButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 28px",
    borderRadius: "9999px",
    fontFamily: "var(--font-display)",
    fontWeight: 500,
    fontSize: 14,
    letterSpacing: "0.02em",
    textDecoration: "none",
    transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.2s, border-color 0.2s, box-shadow 0.2s",
    cursor: "pointer",
    userSelect: "none",
    willChange: "transform",
  };

  const styles: Record<string, React.CSSProperties> = {
    primary: {
      ...base,
      background: "var(--color-terminal-green)",
      color: "#050507",
      fontWeight: 600,
      boxShadow: "0 0 32px rgba(0,255,65,0.25)",
    },
    ghost: {
      ...base,
      background: "transparent",
      color: "rgba(255,255,255,0.7)",
      border: "1px solid rgba(255,255,255,0.12)",
    },
  };

  return (
    <a
      ref={ref}
      href={href}
      style={styles[variant]}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={e => {
        const el = e.currentTarget;
        if (variant === "primary") {
          el.style.boxShadow = "0 0 48px rgba(0,255,65,0.35)";
        } else {
          el.style.borderColor = "rgba(255,255,255,0.28)";
          el.style.color = "rgba(255,255,255,0.95)";
        }
      }}
      onMouseOut={e => {
        const el = e.currentTarget;
        if (variant === "primary") {
          el.style.boxShadow = "0 0 32px rgba(0,255,65,0.25)";
        } else {
          el.style.borderColor = "rgba(255,255,255,0.12)";
          el.style.color = "rgba(255,255,255,0.7)";
        }
      }}
    >
      {children}
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: variant === "primary" ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
          flexShrink: 0,
        }}
      >
        {variant === "primary" ? "→" : "↗"}
      </span>
    </a>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const dur = reduced ? 0 : 1;

  return (
    <section
      id="hero"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "0 clamp(24px, 5vw, 80px)",
        paddingTop: "140px",
        paddingBottom: "80px",
        position: "relative",
        overflow: "hidden",
        maxWidth: "1280px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* Background orbs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "-10%",
            width: "clamp(320px, 50vw, 640px)",
            height: "clamp(320px, 50vw, 640px)",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,255,65,0.07) 0%, transparent 70%)",
            animation: "orb-breathe 8s ease-in-out infinite",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "5%",
            width: "clamp(200px, 30vw, 400px)",
            height: "clamp(200px, 30vw, 400px)",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,255,65,0.04) 0%, transparent 70%)",
            animation: "orb-breathe 12s ease-in-out infinite reverse",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur * 0.6, ease }}
          style={{ marginBottom: 28 }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: "9999px",
              border: "1px solid rgba(0,255,65,0.2)",
              background: "rgba(0,255,65,0.06)",
              fontSize: 11,
              letterSpacing: "0.22em",
              color: "var(--color-terminal-green)",
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--color-terminal-green)",
                boxShadow: "0 0 8px rgba(0,255,65,0.6)",
                animation: "pulse-green 2s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            LeoLogic · Operating Company
          </span>
        </motion.div>

        {/* H1 — three-line kinetic display */}
        <div style={{ marginBottom: 28 }}>
          {[
            { text: "Precision.", color: "var(--color-text-primary)", delay: 0.1 },
            { text: "Intelligence.", color: "var(--color-terminal-green)", delay: 0.2, glow: true },
            { text: "Automation.", color: "var(--color-text-primary)", delay: 0.3 },
          ].map(({ text, color, delay, glow }) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, x: reduced ? 0 : -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: dur * 0.9, delay: dur * delay, ease }}
            >
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(54px, 9vw, 120px)",
                  fontWeight: 700,
                  lineHeight: 1.0,
                  letterSpacing: "-0.04em",
                  color,
                  margin: 0,
                  textShadow: glow ? "0 0 60px rgba(0,255,65,0.25)" : undefined,
                }}
              >
                {text}
              </h1>
            </motion.div>
          ))}
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur * 0.7, delay: dur * 0.5, ease }}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(15px, 1.4vw, 18px)",
            color: "rgba(255,255,255,0.5)",
            maxWidth: 480,
            lineHeight: 1.65,
            marginBottom: 44,
          }}
        >
          ChemEng student building quant systems, AI agents, and precision tooling at the intersection of science and code.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur * 0.7, delay: dur * 0.65, ease }}
          style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
        >
          <MagneticButton href="#projects" variant="primary">
            View Work
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            Get in Touch
          </MagneticButton>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: dur * 1.4 }}
          style={{
            marginTop: "clamp(48px, 8vh, 96px)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 1,
              height: 48,
              background: "linear-gradient(to bottom, transparent, rgba(0,255,65,0.5), transparent)",
              animation: "orb-breathe 2.5s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.28em",
              color: "rgba(255,255,255,0.22)",
              fontFamily: "var(--font-display)",
              textTransform: "uppercase",
            }}
          >
            Scroll to explore
          </span>
        </motion.div>
      </div>
    </section>
  );
}
