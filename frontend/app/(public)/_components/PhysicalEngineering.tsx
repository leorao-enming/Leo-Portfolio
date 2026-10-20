"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { INTERNSHIP } from "../../_data/engineering";
import { Eyebrow, MetaList } from "./editorial";
import { reveal } from "./motion";
import { ProcessCanvas } from "./ProcessCanvas";

/**
 * The homepage's engineering chapter: intro / process canvas / CTA. Leads
 * with the canvas (ProcessCanvas — one SVG, port-routed edges, derived
 * viewBox) rather than a competency-card list, so the plant-facing work
 * reads from the diagram itself. The same canvas renders on /engineering,
 * so the two stay in step by construction.
 *
 * Text and drawing sit side by side at desktop width. Stacked, the preview
 * is capped at 520px (a process train wants drawing size, not poster size)
 * and so filled only the left 40% of a 1280px container, leaving the right
 * of the section empty for its full ~700px height.
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
        className="section-shell grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,520px)] lg:items-center"
        style={{
          paddingTop: "clamp(72px, 10vw, 120px)",
          paddingBottom: "clamp(72px, 10vw, 120px)",
          gap: "clamp(40px, 6vw, 96px)",
        }}
      >
        <motion.div {...reveal(reduced)} style={{ maxWidth: "46ch" }}>
          <Eyebrow tone="accent" style={{ marginBottom: 20 }}>Physical systems</Eyebrow>
          <h2
            style={{
              fontSize: "var(--type-heading-l)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--color-text-primary)",
              margin: "0 0 18px",
            }}
          >
            Process engineering, instrumentation, and plant-facing systems.
          </h2>
          <MetaList items={TAGS} style={{ marginBottom: 24 }} />
          <p
            style={{
              fontSize: "var(--type-body-m)",
              lineHeight: 1.75,
              color: "var(--text-body)",
              margin: "0 0 32px",
            }}
          >
            {INTERNSHIP.summary}
          </p>

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
        </motion.div>

        {/* Preview, not the instrument — see ProcessCanvas. The tag index
            and competency panel live on /engineering, which is what the
            link is for. */}
        <motion.div {...reveal(reduced, 1)}>
          <ProcessCanvas variant="preview" />
        </motion.div>
      </div>
    </section>
  );
}
