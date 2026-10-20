"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { reveal } from "./motion";
import { DecayField } from "./project-art/DecayField";


const TAGS = ["HealthKit", "Sleep", "First-order kinetics"];

export function HalfLifeShowcase() {
  const reduced = useReducedMotion();

  return (
    <section style={{ background: "var(--surface-half-life)" }}>
      {/* grid-template-columns lives in className only — an inline
          gridTemplateColumns always beats a responsive lg: class, so the
          two-column desktop layout would never engage. Text left, decay
          field right; stacks to curve-below-typography on mobile. */}
      <div
        className="section-shell grid grid-cols-1 items-center lg:grid-cols-[1fr_1.1fr]"
        style={{
          gap: "clamp(40px, 6vw, 80px)",
          paddingTop: "clamp(72px, 10vw, 120px)",
          paddingBottom: "clamp(72px, 10vw, 120px)",
        }}
      >
        <motion.div
          {...reveal(reduced)}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.24em",
              color: "var(--accent-half-life)",
              margin: "0 0 20px",
            }}
          >
            01 / HALF-LIFE
          </p>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              fontSize: "var(--type-display-m)",
              lineHeight: 0.98,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "var(--color-text-primary)",
              margin: "0 0 24px",
            }}
          >
            <span style={{ display: "block" }}>What</span>
            <span style={{ display: "block", color: "var(--accent-half-life)" }}>remains?</span>
          </h2>
          <p
            style={{
              fontSize: "var(--type-body-m)",
              lineHeight: 1.7,
              color: "var(--text-body)",
              maxWidth: "42ch",
              margin: "0 0 24px",
            }}
          >
            An iOS app that models caffeine in the body as first-order decay against real
            sleep timing — not a tracker that just logs a number.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 8px", marginBottom: 28 }}>
            {TAGS.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--accent-half-life)",
                }}
              >
                {tag}{tag !== TAGS[TAGS.length - 1] ? " ·" : ""}
              </span>
            ))}
          </div>
          <Link
            href="/projects/half-life"
            className="group"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-display)",
              fontSize: 14,
              color: "var(--accent-half-life)",
              textDecoration: "none",
            }}
          >
            Explore Half-Life
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
          </Link>
        </motion.div>

        <motion.div
          {...reveal(reduced, 1)}
        >
          {/* The figure carries its own "mg remaining" readout now — it
              counts down as the curve draws. */}
          <DecayField />
        </motion.div>
      </div>
    </section>
  );
}
