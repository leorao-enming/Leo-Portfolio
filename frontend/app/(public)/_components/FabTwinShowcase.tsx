"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { LAB_ENTRIES } from "../../_data/lab";

const ease = [0.16, 1, 0.3, 1] as const;
const fabTwin = LAB_ENTRIES.find((e) => e.id === "L-03")!;

/* ── Silicon wafer ──────────────────────────────────────────────────
 * The section's one violet moment — thin-film interference on a wafer
 * surface, restrained rather than a rainbow-holo effect. Concentric
 * process rings + a flat notch (a real wafer-orientation feature, not
 * invented detail) keep it reading as an object, not an abstract disc. */
function Wafer() {
  return (
    <svg viewBox="0 0 280 280" style={{ width: "100%", maxWidth: 300, height: "auto", display: "block" }} aria-hidden>
      <defs>
        <radialGradient id="wafer-sheen" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="var(--accent-fabtwin)" stopOpacity="0.28" />
          <stop offset="45%" stopColor="var(--accent-fabtwin)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--surface-fabtwin-dark)" stopOpacity="0.08" />
        </radialGradient>
      </defs>
      <circle cx="140" cy="140" r="124" fill="url(#wafer-sheen)" stroke="var(--accent-fabtwin-ink)" strokeOpacity="0.4" />
      {[96, 68, 40].map((r) => (
        <circle key={r} cx="140" cy="140" r={r} fill="none" stroke="var(--accent-fabtwin-ink)" strokeOpacity="0.18" />
      ))}
      {/* Orientation notch */}
      <path d="M 128 262 A 124 124 0 0 0 152 262 L 148 250 A 108 108 0 0 1 132 250 Z" fill="var(--surface-fabtwin)" stroke="var(--accent-fabtwin-ink)" strokeOpacity="0.4" />
    </svg>
  );
}

/* ── SPC chart ───────────────────────────────────────────────────────
 * A dark instrument panel set inside the light titanium section — the
 * brief's own instruction ("dark elements inside the section", not a
 * second full-dark canvas). Same subject as FabTwinSpcArt (chamber
 * pressure, one flagged point), redrawn plainer for the homepage. */
const SUBGROUPS = [0.42, 0.30, 0.58, 0.22, 0.5, 0.86, 0.34, 0.46];
const FAULT_INDEX = 5;

function SpcPanel() {
  const w = 360;
  const h = 220;
  const padX = 30;
  const topY = 44;
  const bottomY = h - 44;
  const stepX = (w - padX * 2) / (SUBGROUPS.length - 1);

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      style={{ width: "100%", height: "auto", display: "block", background: "var(--surface-fabtwin-dark)", borderRadius: 12 }}
      role="img"
      aria-label="Statistical process control chart for chamber 03. Eight subgroups plotted between the upper and lower control limits, with one point flagged as a fault above the upper limit."
    >
      <text x={padX} y={26} fontSize="12" fontFamily="var(--font-mono)" letterSpacing="0.14em" fill="var(--text-on-dark-strong)">
        CHAMBER 03
      </text>

      <line x1={padX} y1={topY} x2={w - padX} y2={topY} stroke="var(--accent-fabtwin)" strokeOpacity="0.5" strokeDasharray="3 4" />
      <text x={w - padX} y={topY - 6} textAnchor="end" fontSize="10" fontFamily="var(--font-mono)" fill="var(--text-on-dark-muted)">UCL</text>

      <line x1={padX} y1={bottomY} x2={w - padX} y2={bottomY} stroke="var(--accent-fabtwin)" strokeOpacity="0.5" strokeDasharray="3 4" />
      <text x={padX} y={bottomY + 18} fontSize="10" fontFamily="var(--font-mono)" fill="var(--text-on-dark-muted)">LCL</text>

      {SUBGROUPS.map((v, i) => {
        const x = padX + i * stepX;
        const y = topY + (1 - v) * (bottomY - topY);
        const isFault = i === FAULT_INDEX;
        return (
          <g key={i}>
            {i > 0 && (
              <line
                x1={padX + (i - 1) * stepX}
                y1={topY + (1 - SUBGROUPS[i - 1]) * (bottomY - topY)}
                x2={x}
                y2={y}
                stroke="var(--text-on-dark-body)"
                strokeOpacity="0.5"
              />
            )}
            {isFault ? (
              <g stroke="#e08a7a" strokeWidth="2" strokeLinecap="round">
                <line x1={x - 5} y1={y - 5} x2={x + 5} y2={y + 5} />
                <line x1={x - 5} y1={y + 5} x2={x + 5} y2={y - 5} />
              </g>
            ) : (
              <circle cx={x} cy={y} r="3.5" fill="var(--text-on-dark-strong)" />
            )}
          </g>
        );
      })}

      <text x={padX} y={h - 14} fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.1em" fill="#e08a7a">
        FAULT DETECTED
      </text>
    </svg>
  );
}

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
