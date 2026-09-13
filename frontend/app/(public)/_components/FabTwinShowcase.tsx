"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { LAB_ENTRIES } from "../../_data/lab";
import { Wafer, SpcPanel } from "./project-art/FabTwinArt";

const ease = [0.16, 1, 0.3, 1] as const;
const fabTwin = LAB_ENTRIES.find((e) => e.id === "L-03")!;

const TAGS = ["SPC", "PCA", "Hotelling T²", "Fault detection"];

export function FabTwinShowcase() {
  const reduced = useReducedMotion();

  return (
    <section style={{ background: "var(--surface-fabtwin)" }}>
      <div
        className="section-shell"
        style={{
          paddingTop: "clamp(72px, 10vw, 120px)",
          paddingBottom: "clamp(72px, 10vw, 120px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduced ? 0 : 0.7, ease }}
          style={{ textAlign: "center", maxWidth: 620, margin: "0 auto clamp(48px, 7vw, 80px)" }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.24em",
              color: "var(--accent-fabtwin-ink)",
              margin: "0 0 20px",
            }}
          >
            02 / FABTWIN
          </p>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              fontSize: "clamp(40px, 6.5vw, 84px)",
              lineHeight: 0.98,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "var(--color-text-primary)",
              margin: "0 0 24px",
            }}
          >
            <span style={{ display: "block" }}>Process</span>
            <span style={{ display: "block", color: "var(--accent-fabtwin-ink)" }}>under control.</span>
          </h2>
          <p
            style={{
              fontSize: "clamp(14px, 1.2vw, 16px)",
              lineHeight: 1.7,
              color: "var(--text-body)",
              margin: "0 auto 24px",
              maxWidth: "48ch",
            }}
          >
            A plasma-etch SPC and fault-detection simulator, validated against public fab
            datasets rather than a model that only looks right on its own synthetic data.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 8px", marginBottom: 28 }}>
            {TAGS.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--accent-fabtwin-ink)",
                }}
              >
                {tag}{tag !== TAGS[TAGS.length - 1] ? " ·" : ""}
              </span>
            ))}
          </div>
          <Link
            href="/lab"
            className="group"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-display)",
              fontSize: 14,
              color: "var(--accent-fabtwin-ink)",
              textDecoration: "none",
            }}
          >
            View project
            <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>↗</span>
          </Link>
          {/* fabTwin.status keeps this line honest if the build's phase
              changes — IN PROGRESS today, not asserted as shipped. */}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.14em",
              color: "var(--text-muted)",
              marginTop: 10,
            }}
          >
            {fabTwin.status}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.1, ease }}
          /* Columns in className only — inline grid-template-columns
             would override the lg: variant at every width. Wafer left,
             SPC panel right; stacks wafer-then-chart on mobile. */
          className="grid grid-cols-1 items-center lg:grid-cols-[auto_1fr]"
          style={{
            gap: "clamp(32px, 5vw, 56px)",
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          <div style={{ justifySelf: "center", width: "100%", maxWidth: 280 }}>
            <Wafer />
          </div>
          <SpcPanel />
        </motion.div>
      </div>
    </section>
  );
}
