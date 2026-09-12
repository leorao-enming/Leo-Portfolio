"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { INTERNSHIP } from "../../_data/engineering";
import { ProcessSchematicArt } from "./ProcessSchematicArt";

const ease = [0.16, 1, 0.3, 1] as const;

/** Renamed from EngineeringTeaser and rebuilt around the brief's own
 * example topology (TK-101 -> P-101 -> HX-101 -> V/R-101, with PT/FT/LT/FCV
 * instrumentation) — which ProcessSchematicArt already implements one-for-
 * one on /engineering. Reused directly rather than re-authoring a "static
 * simplified" version: it's already the interactive P&ID the brief asks
 * this section to lay groundwork for, and it's proven stable there. */
const TAGS = ["Process Engineering", "Plant Instrumentation", "DCS", "P&ID", "Physical Systems"];

export function PhysicalEngineering() {
  const reduced = useReducedMotion();

  return (
    <section id="engineering" style={{ background: "var(--surface-engineering)" }}>
      <div className="section-shell" style={{ paddingTop: "clamp(72px, 10vw, 120px)", paddingBottom: "clamp(72px, 10vw, 120px)" }}>
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: reduced ? 0 : 0.7, ease }}
        style={{ marginBottom: "clamp(28px, 4vw, 40px)" }}
      >
        <h2
          style={{
            fontSize: "clamp(26px, 3.6vw, 42px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.12,
            color: "var(--color-text-primary)",
            margin: "0 0 16px",
          }}
        >
          Physical engineering.
        </h2>
        <p
          style={{
            fontSize: "clamp(13px, 1.1vw, 15px)",
            color: "var(--text-body)",
            lineHeight: 1.75,
            maxWidth: "62ch",
            marginBottom: 20,
          }}
        >
          {INTERNSHIP.summary}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 8px", marginBottom: 8 }}>
          {TAGS.map((label) => (
            <span
              key={label}
              style={{
                padding: "4px 10px",
                borderRadius: 4,
                background: "rgba(10, 12, 15,0.035)",
                border: "1px solid rgba(10, 12, 15,0.07)",
                fontSize: 11,
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.1, ease }}
      >
        <ProcessSchematicArt />
      </motion.div>

      {/* Editorial navigation, not a boxed button — same treatment as the
          three project chapters above, so the page has one CTA language. */}
      <Link
        href="/engineering"
        className="group"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "var(--font-display)",
          fontSize: 14,
          color: "var(--color-accent-ink)",
          textDecoration: "none",
        }}
      >
        View engineering profile
        <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
      </Link>
      </div>
    </section>
  );
}
