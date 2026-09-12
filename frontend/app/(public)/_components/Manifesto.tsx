"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

/** The conceptual spine of the site, stated once, plainly — MATTER → DATA →
 * SYSTEM. Replaces the old generic "The System" intro. Everything else on
 * the homepage is evidence for this one transition, so it gets its own
 * quiet moment rather than sharing a section with anything else. */
const STEPS = ["Physical process", "Sensor", "Data", "Model", "Decision"];

function Statement({
  lines,
  align,
}: {
  lines: [string, string, string];
  align: "left" | "right";
}) {
  return (
    <div
      className={align === "left" ? "lg:self-start" : "lg:self-end"}
      style={{ alignSelf: "center" }}
    >
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 500,
          fontSize: "clamp(32px, 6.5vw, 76px)",
          lineHeight: 1.04,
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
          color: "var(--color-text-primary)",
          margin: 0,
        }}
        className={align === "left" ? "text-center lg:text-left" : "text-center lg:text-right"}
      >
        <span style={{ display: "block" }}>{lines[0]}</span>
        <span style={{ display: "block", color: "var(--text-muted)" }}>{lines[1]}</span>
        <span style={{ display: "block", color: "var(--color-accent-ink)" }}>{lines[2]}</span>
      </p>
    </div>
  );
}

/** Physical process → sensor → data → model → decision, drawn as a single
 * restrained instrumentation line — the same hairline/mono-tag vocabulary
 * ProcessCanvas already established, so it reads as one visual system
 * rather than a second, competing graphic language. Pure SVG, static. */
function TransitionLine() {
  const w = 640;
  const h = 64;
  const pad = 20;
  const step = (w - pad * 2) / (STEPS.length - 1);

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${w} ${h}`}
      style={{ width: "100%", maxWidth: 640, height: "auto", display: "block", margin: "0 auto" }}
    >
      <line x1={pad} y1={h / 2} x2={w - pad} y2={h / 2} stroke="var(--color-hairline-bright)" />
      <path
        d={`M ${w - pad - 6} ${h / 2 - 5} L ${w - pad} ${h / 2} L ${w - pad - 6} ${h / 2 + 5}`}
        fill="none"
        stroke="var(--color-hairline-bright)"
        strokeWidth="1.4"
      />
      {STEPS.map((label, i) => {
        const cx = pad + i * step;
        return (
          <g key={label}>
            <circle cx={cx} cy={h / 2} r="4" fill="var(--color-bg)" stroke="var(--color-accent-ink)" strokeWidth="1.4" />
            <text
              x={cx}
              y={h / 2 - 14}
              textAnchor="middle"
              fontSize="10"
              fontFamily="var(--font-mono)"
              letterSpacing="0.04em"
              fill="var(--text-muted)"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function Manifesto() {
  const reduced = useReducedMotion();

  return (
    /* Tone change carries the section boundary instead of the hairline
       rule that used to sit here — surface-base above, surface-soft from
       here through the Selected Work intro, so the two read as one
       continuous movement rather than two stacked blocks. */
    <section id="manifesto" style={{ background: "var(--surface-soft)" }}>
      <motion.div
        className="section-shell"
        initial={{ opacity: 0, y: reduced ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: reduced ? 0 : 0.7, ease }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(28px, 4vw, 44px)",
          paddingTop: "clamp(80px, 11vw, 132px)",
          paddingBottom: "clamp(80px, 11vw, 132px)",
        }}
      >
        <Statement lines={["Matter", "Becomes", "Data."]} align="left" />
        <TransitionLine />
        <Statement lines={["Data", "Becomes", "A system."]} align="right" />
      </motion.div>
    </section>
  );
}
