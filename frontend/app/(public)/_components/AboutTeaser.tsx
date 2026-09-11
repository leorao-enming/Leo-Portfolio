"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

export function AboutTeaser() {
  const reduced = useReducedMotion();

  return (
    <section
      id="about"
      className="section-shell"
    >
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: reduced ? 0 : 0.8, ease }}
        style={{ maxWidth: 640 }}
      >
        <span className="eyebrow" style={{ marginBottom: 24 }}>
          The System
        </span>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 4.5vw, 56px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "rgba(255,255,255,0.9)",
            marginBottom: 20,
          }}
        >
          Engineering meets{" "}
          <span style={{ color: "var(--color-accent)", textShadow: "0 0 40px rgba(255,122,24,0.22)" }}>
            intelligence.
          </span>
        </h2>

        <p style={{ fontSize: "clamp(14px, 1.2vw, 16px)", color: "var(--text-body)", lineHeight: 1.78, marginBottom: 28 }}>
          I&apos;m Leo — a Chemical Engineering student at the University of Toronto who builds systems at the boundary of science and software.
        </p>

        <Link
          href="/about"
          className="group"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 16px",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.14)",
            fontFamily: "var(--font-display)",
            fontSize: 12,
            letterSpacing: "0.02em",
            color: "rgba(255,255,255,0.75)",
            whiteSpace: "nowrap",
          }}
        >
          Read the full story
          <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>→</span>
        </Link>
      </motion.div>
    </section>
  );
}
