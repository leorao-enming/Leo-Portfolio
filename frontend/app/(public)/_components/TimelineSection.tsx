"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The build log as a core sample rather than a conventional timeline.
 * Each year is a stratum: a fixed-size swatch carries a texture specific
 * to what that period actually was (exam-board groundwork, coursework,
 * software build, statistical method, plant floor), not a magnitude — there's no honest unit
 * to measure "how much" a year was, so no bar pretends to. The most
 * recent stratum (NOW) uses the same open 45deg hatch FabTwin's SPC chart
 * uses for "not yet resolved": this year is still being deposited.
 */

type Era = {
  year: string;
  label: string;
  title: string;
  desc: string;
  tag: string;
  ch: string;
  accent: string;
  swatch: string; // CSS background value for the stratum texture
  open?: boolean; // still forming — draw the pending hatch, not a solid fill
};

/**
 * Accent -> a text colour dark enough to read on the light chip behind it.
 * The lookup below falls back to the raw accent, which is the wrong default:
 * these accents are chosen to work as fills and borders, not as type.
 *
 * "#ff7a18" was missing, so the Build tags rendered their label in raw
 * accent orange at 2.50:1 against the chip — under the 4.5:1 floor, while
 * the two entries that did exist both sit near 6.5:1. globals.css already
 * names the fix: the accent is scoped to chrome, and --color-accent-ink is
 * the darkened rust kept for the case where the accent itself has to be
 * read as text (6.67:1 here).
 */
const TAG_TEXT_COLOR: Record<string, string> = {
  "#c084fc": "#6d28d9",
  "#60a5fa": "#1d4ed8",
  "#ff7a18": "var(--color-accent-ink)",
};

const ERAS: Era[] = [
  {
    year: "2022",
    label: "SELANGOR · A-LEVEL",
    title: "Taylor's College",
    desc: "Read A-Levels at Taylor's College in Selangor, Malaysia. Mathematics, physics, chemistry — the groundwork, before any of it had a name.",
    tag: "Education",
    ch: "01",
    // Same blue as 2023: both strata are formal education, and colouring
    // them alike is the honest reading. The texture carries the difference.
    accent: "#60a5fa",
    // Graph paper — the substrate A-Level maths and physics are worked on,
    // and a deliberately more elementary grid than 2023's ruled page.
    swatch:
      "repeating-linear-gradient(to bottom, rgba(29,78,216,0.26) 0 1px, transparent 1px 6px), " +
      "repeating-linear-gradient(to right, rgba(29,78,216,0.26) 0 1px, transparent 1px 6px), #fbfaf6",
  },
  {
    year: "2023",
    label: "TORONTO · CAMPUS",
    title: "University of Toronto",
    desc: "Enrolled in Chemical Engineering. Process simulation, thermodynamics, transport phenomena — the formal foundation for everything else.",
    tag: "Education",
    ch: "02",
    accent: "#60a5fa",
    // Ruled notebook lines.
    swatch: "repeating-linear-gradient(to bottom, rgba(29,78,216,0.4) 0 1px, transparent 1px 7px), #fbfaf6",
  },
  {
    year: "2024",
    label: "LEOLOGIC · BUILD",
    title: "First Commit",
    desc: "Began building the LeoLogic personal OS: unified dashboard for biometrics, quant signals, and AI command layers. The machine wakes up.",
    tag: "Build",
    ch: "03",
    accent: "#ff7a18",
    // Settled crosshatch — this build shipped and is running.
    swatch:
      "repeating-linear-gradient(45deg, rgba(255,122,24,0.32) 0 1px, transparent 1px 6px), " +
      "repeating-linear-gradient(-45deg, rgba(255,122,24,0.18) 0 1px, transparent 1px 6px), #fbfaf6",
  },
  {
    year: "2025",
    label: "TORONTO · CORE",
    title: "Core & Black Belt",
    desc: "Core chemical engineering at Toronto — thermodynamics, transport phenomena, reactor design — alongside the Six Sigma Black Belt: DMAIC, statistical process control, variance reduction. The statistics FabTwin now runs on.",
    tag: "Education",
    ch: "04",
    accent: "#60a5fa",
    // The stipple that used to sit on 2022, recoloured to the education
    // blue. It was written for DMAIC — scattered points brought under
    // control — so it follows the Black Belt to the year it belongs to.
    swatch: "repeating-radial-gradient(circle at 4px 4px, rgba(29,78,216,0.5) 0 1.4px, transparent 1.5px 9px), #fbfaf6",
  },
  {
    year: "2026",
    label: "HUBEI · PLANT FLOOR",
    title: "Process Engineering Internship",
    desc: "Joined the process engineering department at Hubei Jingrui Microelectronic Materials. P&ID, instrumentation, DCS operations, SOPs — the discipline that theory turns into.",
    tag: "Industry",
    ch: "05",
    accent: "#c084fc",
    // Directional grain — the same steel-floor language as the P&ID panel.
    swatch: "repeating-linear-gradient(100deg, rgba(109,40,217,0.4) 0 1px, transparent 1px 5px), #fbfaf6",
  },
  {
    year: "NOW",
    label: "LIVE · BUILDING",
    title: "Half-Life & FabTwin",
    desc: "Half-Life is at release-candidate stage — signed iOS archive built, device acceptance next. FabTwin's simulator Gate just opened: a semiconductor SPC/fault-detection engine validated against real public fab data.",
    tag: "Build",
    ch: "06",
    accent: "#ff7a18",
    swatch: "",
    open: true,
  },
];

function Swatch({ era, selected }: { era: Era; selected: boolean }) {
  return (
    <span
      aria-hidden
      style={{
        position: "relative",
        display: "block",
        width: 46,
        height: 30,
        flexShrink: 0,
        borderRadius: 4,
        border: `1px solid ${selected ? era.accent : "var(--color-hairline-bright)"}`,
        background: era.open ? "#fbfaf6" : era.swatch,
        overflow: "hidden",
      }}
    >
      {era.open && (
        <>
          <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
            <defs>
              <pattern id={`strata-pending-${era.year}`} width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="6" stroke="var(--color-hairline-bright)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#strata-pending-${era.year})`} />
          </svg>
          <span
            style={{
              position: "absolute",
              inset: 0,
              border: "1px dashed rgba(255,122,24,0.5)",
              borderRadius: 3,
            }}
          />
        </>
      )}
    </span>
  );
}

function EraRow({
  era,
  selected,
  onSelect,
}: {
  era: Era;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        width: "100%",
        textAlign: "left",
        padding: "14px 14px",
        borderRadius: 10,
        border: "1px solid transparent",
        borderLeft: selected ? `3px solid ${era.accent}` : "3px solid transparent",
        background: selected ? "rgba(10, 12, 15,0.035)" : "transparent",
        cursor: "pointer",
        font: "inherit",
        color: "inherit",
      }}
    >
      <span
        style={{
          fontSize: 10,
          letterSpacing: "0.15em",
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
          width: 20,
          flexShrink: 0,
        }}
      >
        {era.ch}
      </span>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 16,
          fontWeight: 700,
          color: era.year === "NOW" ? "var(--color-accent-ink)" : "var(--color-text-primary)",
          width: 52,
          flexShrink: 0,
        }}
      >
        {era.year}
      </span>
      <span aria-hidden style={{ color: "var(--color-hairline-bright)", flexShrink: 0 }}>
        ┃
      </span>
      <span
        style={{
          fontSize: 11,
          letterSpacing: "0.12em",
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
          flex: "1 1 auto",
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {era.label}
      </span>
      <Swatch era={era} selected={selected} />
    </button>
  );
}

export function TimelineSection() {
  const reduced = useReducedMotion();
  const [selectedYear, setSelectedYear] = useState(ERAS[0].year);
  const era = ERAS.find((e) => e.year === selectedYear)!;

  return (
    <section id="timeline" className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: reduced ? 0 : 0.7, ease }}
        style={{ marginBottom: "clamp(32px, 5vw, 56px)" }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: 9999,
            border: "1px solid rgba(10, 12, 15,0.1)",
            fontSize: 11,
            letterSpacing: "0.26em",
            color: "var(--text-muted)",
            fontFamily: "var(--font-display)",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Chronicle
        </span>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--type-heading-l)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "rgba(10, 12, 15,0.88)",
            margin: "0 0 14px",
          }}
        >
          The build log.
        </h2>
        <p
          style={{
            fontSize: "var(--type-body-s)",
            color: "var(--text-muted)",
            lineHeight: 1.7,
            maxWidth: "58ch",
            margin: 0,
          }}
        >
          A core sample rather than a scrapbook — each layer is a select. The texture is what that
          year actually was, not a rating of it.
        </p>
      </motion.div>

      <div
        className="grid-cols-1 lg:grid-cols-[minmax(280px,380px)_1fr]"
        style={{ display: "grid", gap: "clamp(16px, 2.5vw, 28px)", alignItems: "start" }}
      >
        <div className="bezel-outer">
          <div className="bezel-inner" style={{ padding: 8 }}>
            {ERAS.map((e) => (
              <EraRow key={e.year} era={e} selected={e.year === selectedYear} onSelect={() => setSelectedYear(e.year)} />
            ))}
          </div>
        </div>

        <div className="bezel-outer">
          <div className="bezel-inner" style={{ padding: "clamp(24px, 3.5vw, 40px)" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.3em", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: 12, textTransform: "uppercase" }}>
              CHAPTER {era.ch} / 05
            </div>

            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--type-display-s)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                color: era.year === "NOW" ? "var(--color-accent-ink)" : "rgba(10, 12, 15,0.14)",
                marginBottom: 8,
              }}
            >
              {era.year}
            </div>

            <div style={{ fontSize: 11, letterSpacing: "0.22em", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: 22, textTransform: "uppercase" }}>
              {era.label}
            </div>

            <span
              style={{
                display: "inline-block",
                padding: "2px 9px",
                borderRadius: 9999,
                border: `1px solid ${era.accent}30`,
                background: `${era.accent}0d`,
                fontSize: 11,
                letterSpacing: "0.2em",
                color: TAG_TEXT_COLOR[era.accent] ?? era.accent,
                fontFamily: "var(--font-display)",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              {era.tag}
            </span>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--type-heading-m)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.2,
                color: "rgba(10, 12, 15,0.88)",
                marginBottom: 12,
              }}
            >
              {era.title}
            </h3>

            <p
              style={{
                fontSize: "var(--type-body-s)",
                color: "var(--text-muted)",
                lineHeight: 1.75,
                maxWidth: 520,
                margin: 0,
              }}
            >
              {era.desc}
            </p>

            {era.year === "NOW" && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 18 }}>
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "var(--color-accent)",
                    boxShadow: "0 0 10px rgba(255,122,24,0.7)",
                    animation: reduced ? "none" : "timeline-pulse 2s ease-in-out infinite",
                  }}
                />
                <span style={{ fontSize: 11, letterSpacing: "0.28em", color: "var(--color-accent-ink)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
                  IN PROGRESS — still forming
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
