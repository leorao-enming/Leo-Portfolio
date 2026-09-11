"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  COMPETENCIES,
  INTERNSHIP,
  LEVEL_STEPS,
  type Competency,
} from "../../_data/engineering";

const ease = [0.16, 1, 0.3, 1] as const;
const ACCENT = "#c084fc";
const TOTAL_STEPS = 4;
const PREVIEW_COUNT = 3;

function LevelMeter({ level }: { level: Competency["level"] }) {
  const filled = LEVEL_STEPS[level];
  return (
    <span style={{ display: "inline-flex", gap: 3, alignItems: "center" }} role="img" aria-label={`${level} — ${filled} of ${TOTAL_STEPS}`}>
      {Array.from({ length: TOTAL_STEPS }, (_, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            width: 12,
            height: 3,
            borderRadius: 2,
            background: i < filled ? ACCENT : "rgba(255,255,255,0.09)",
            boxShadow: i < filled ? `0 0 6px ${ACCENT}55` : "none",
          }}
        />
      ))}
    </span>
  );
}

export function EngineeringTeaser() {
  const reduced = useReducedMotion();
  const preview = COMPETENCIES.slice(0, PREVIEW_COUNT);

  return (
    <section
      id="engineering"
      className="section-shell"
      style={{ borderTop: "1px solid var(--color-hairline)" }}
    >
      <div
        className="lg:grid-cols-[1.2fr_1fr]"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "clamp(32px, 5vw, 64px)",
          paddingTop: "clamp(32px, 5vw, 56px)",
        }}
      >
        {/* Left — identity + copy. No eyebrow badge here: the top rule and
            the section's position in the page already mark the transition,
            and three other sections already spend the eyebrow budget. */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduced ? 0 : 0.7, ease }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(26px, 3.6vw, 42px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.12,
              color: "var(--color-text-primary)",
              margin: "0 0 16px",
            }}
          >
            Built for the plant floor.
          </h2>
          <p
            style={{
              fontSize: "clamp(13px, 1.1vw, 15px)",
              color: "var(--text-body)",
              lineHeight: 1.75,
              maxWidth: "52ch",
              marginBottom: 20,
            }}
          >
            {INTERNSHIP.summary}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 8px", marginBottom: 24 }}>
            {[INTERNSHIP.companyLocal, INTERNSHIP.department, "U of T · Chemical Engineering"].map((label) => (
              <span
                key={label}
                style={{
                  padding: "4px 10px",
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.035)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {label}
              </span>
            ))}
          </div>

          <Link
            href="/engineering"
            className="group"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 16px",
              borderRadius: "9999px",
              border: `1px solid ${ACCENT}33`,
              background: `${ACCENT}0d`,
              fontFamily: "var(--font-display)",
              fontSize: 12,
              letterSpacing: "0.02em",
              color: ACCENT,
              whiteSpace: "nowrap",
            }}
          >
            View full engineering profile
            <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>→</span>
          </Link>
        </motion.div>

        {/* Right — competency index. Hairline rows instead of a boxed
            panel: this is a spec list, not a discrete object, so it
            shouldn't be packaged as one. */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.1, ease }}
        >
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.22em",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              marginBottom: 4,
              borderBottom: "1px solid var(--color-hairline)",
              paddingBottom: 12,
            }}
          >
            Competency index
          </p>
          {preview.map((c) => (
            <div
              key={c.name}
              className="index-row"
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "14px 2px" }}
            >
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.72)" }}>{c.name}</span>
              <LevelMeter level={c.level} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
