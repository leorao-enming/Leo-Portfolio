"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ProcessCanvas } from "./ProcessCanvas";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The homepage's engineering chapter: intro / process canvas / detail panel
 * / CTA. Leads with the canvas (ProcessCanvas — one SVG, port-routed edges,
 * derived viewBox) rather than a competency-card list, so the plant-facing
 * work reads from the diagram itself. The same canvas renders on
 * /engineering, so the two stay in step by construction.
 *
 * Metadata is set inline and dot-separated rather than as bordered chips —
 * same treatment as the three project chapters above it, which keeps one
 * metadata language across the page instead of reintroducing boxes here.
 */
const TAGS = ["Process engineering", "Instrumentation", "DCS", "P&ID"];

export function PhysicalEngineering() {
  const reduced = useReducedMotion();

  return (
    <section id="engineering" style={{ background: "var(--surface-engineering)" }}>
      <div
        className="section-shell"
        style={{ paddingTop: "clamp(72px, 10vw, 120px)", paddingBottom: "clamp(72px, 10vw, 120px)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduced ? 0 : 0.7, ease }}
          style={{ marginBottom: "clamp(36px, 5vw, 56px)", maxWidth: "42ch" }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.24em",
              color: "var(--color-accent-ink)",
              margin: "0 0 20px",
            }}
          >
            PHYSICAL SYSTEMS
          </p>
          <h2
            style={{
              fontSize: "var(--type-heading-l)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--color-text-primary)",
              margin: "0 0 18px",
            }}
          >
            Process engineering, instrumentation, and plant-facing systems.
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0 6px" }}>
            {TAGS.map((label, i) => (
              <span
                key={label}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                {label}{i < TAGS.length - 1 ? " ·" : ""}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.1, ease }}
          style={{ marginBottom: "clamp(32px, 4vw, 48px)" }}
        >
          {/* Preview, not the instrument — see ProcessCanvas. The tag index
              and competency panel live on /engineering, which is what the
              link below is for. */}
          <ProcessCanvas variant="preview" />
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
