"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Eyebrow } from "./editorial";
import { EASE, reveal } from "./motion";

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
  build?: boolean; // built rather than studied — the one distinction in colour
  swatch: string; // CSS background value for the stratum texture
  open?: boolean; // still forming — draw the pending hatch, not a solid fill
};

/**
 * Two inks, not three hues. The strata used to be blue (education), orange
 * (build) and violet (industry) — the only place on the site outside a
 * project chapter that introduced its own palette. The textures already
 * tell the periods apart; colour now only marks the one distinction worth
 * a colour, which is what was built versus what was studied.
 */
const INK = "rgba(10, 12, 15, 0.42)";
const INK_SOFT = "rgba(10, 12, 15, 0.26)";
const BUILD = "rgba(255, 122, 24, 0.42)";
const BUILD_SOFT = "rgba(255, 122, 24, 0.22)";

const ERAS: Era[] = [
  {
    year: "2022",
    label: "SELANGOR · A-LEVEL",
    title: "Taylor's College",
    desc: "Read A-Levels at Taylor's College in Selangor, Malaysia. Mathematics, physics, chemistry — the groundwork, before any of it had a name.",
    tag: "Education",
    ch: "01",
    // Same ink as 2023: both strata are formal education, and colouring
    // them alike is the honest reading. The texture carries the difference.
    // Graph paper — the substrate A-Level maths and physics are worked on,
    // and a deliberately more elementary grid than 2023's ruled page.
    swatch:
      `repeating-linear-gradient(to bottom, ${INK_SOFT} 0 1px, transparent 1px 6px), ` +
      `repeating-linear-gradient(to right, ${INK_SOFT} 0 1px, transparent 1px 6px), #fbfaf6`,
  },
  {
    year: "2023",
    label: "TORONTO · CAMPUS",
    title: "University of Toronto",
    desc: "Enrolled in Chemical Engineering. Process simulation, thermodynamics, transport phenomena — the formal foundation for everything else.",
    tag: "Education",
    ch: "02",
    // Ruled notebook lines.
    swatch: `repeating-linear-gradient(to bottom, ${INK} 0 1px, transparent 1px 7px), #fbfaf6`,
  },
  {
    year: "2024",
    label: "LEOLOGIC · BUILD",
    title: "First Commit",
    desc: "Began building the LeoLogic personal OS: unified dashboard for biometrics, quant signals, and AI command layers. The machine wakes up.",
    tag: "Build",
    ch: "03",
    build: true,
    // Settled crosshatch — this build shipped and is running.
    swatch:
      `repeating-linear-gradient(45deg, ${BUILD} 0 1px, transparent 1px 6px), ` +
      `repeating-linear-gradient(-45deg, ${BUILD_SOFT} 0 1px, transparent 1px 6px), #fbfaf6`,
  },
  {
    year: "2025",
    label: "TORONTO · CORE",
    title: "Core & Black Belt",
    desc: "Core chemical engineering at Toronto — thermodynamics, transport phenomena, reactor design — alongside the Six Sigma Black Belt: DMAIC, statistical process control, variance reduction. The statistics FabTwin now runs on.",
    tag: "Education",
    ch: "04",
    // The stipple that used to sit on 2022, in the education ink. It was
    // written for DMAIC — scattered points brought under control — so it
    // follows the Black Belt to the year it belongs to.
    swatch: `repeating-radial-gradient(circle at 4px 4px, ${INK} 0 1.4px, transparent 1.5px 9px), #fbfaf6`,
  },
  {
    year: "2026",
    label: "HUBEI · PLANT FLOOR",
    title: "Process Engineering Internship",
    desc: "Joined the process engineering department at Hubei Jingrui Microelectronic Materials. P&ID, instrumentation, DCS operations, SOPs — the discipline that theory turns into.",
    tag: "Industry",
    ch: "05",
    // Directional grain — the same steel-floor language as the P&ID panel.
    swatch: `repeating-linear-gradient(100deg, ${INK} 0 1px, transparent 1px 5px), #fbfaf6`,
  },
  {
    year: "NOW",
    label: "LIVE · BUILDING",
    title: "Half-Life & FabTwin",
    desc: "Half-Life is at release-candidate stage — signed iOS archive built, device acceptance next. FabTwin's simulator Gate just opened: a semiconductor SPC/fault-detection engine validated against real public fab data.",
    tag: "Build",
    ch: "06",
    build: true,
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
        borderRadius: 3,
        border: `1px solid ${selected ? "var(--color-accent)" : "var(--color-hairline-bright)"}`,
        background: era.open ? "#fbfaf6" : era.swatch,
        overflow: "hidden",
        transition: "border-color 200ms ease",
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
              borderRadius: 2,
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
        display: "grid",
        gridTemplateColumns: "28px 52px 1fr auto",
        alignItems: "center",
        gap: 14,
        width: "100%",
        textAlign: "left",
        padding: "16px 12px 16px 14px",
        border: "none",
        borderLeft: `2px solid ${selected ? "var(--color-accent)" : "transparent"}`,
        background: selected ? "rgba(10, 12, 15, 0.035)" : "transparent",
        cursor: "pointer",
        font: "inherit",
        color: "inherit",
        transition: "background 200ms ease, border-color 200ms ease",
      }}
    >
      <span style={{ fontSize: 12, letterSpacing: "0.12em", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
        {era.ch}
      </span>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 16,
          fontWeight: 600,
          color: era.year === "NOW" ? "var(--color-accent-ink)" : "var(--color-text-primary)",
        }}
      >
        {era.year}
      </span>
      {/* Wraps instead of truncating — "SELANGOR · A-LE…" told the reader
          less than either half of the label would have on its own. */}
      <span
        style={{
          fontSize: 12,
          letterSpacing: "0.1em",
          lineHeight: 1.5,
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
          minWidth: 0,
        }}
      >
        {era.label.split(" · ").map((part, i) => (
          <span key={part}>
            {i > 0 && " · "}
            {/* Break between the halves, never inside one ("A-/LEVEL"). */}
            <span style={{ whiteSpace: "nowrap" }}>{part}</span>
          </span>
        ))}
      </span>
      <Swatch era={era} selected={selected} />
    </button>
  );
}

function EraDetail({ era, reduced }: { era: Era; reduced: boolean | null }) {
  return (
    <motion.div
      key={era.year}
      initial={{ opacity: 0, x: reduced ? 0 : 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
    >
      <Eyebrow style={{ marginBottom: 14 }}>
        Chapter {era.ch} / {String(ERAS.length).padStart(2, "0")}
      </Eyebrow>

      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "var(--type-display-s)",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          color: era.year === "NOW" ? "var(--color-accent-ink)" : "rgba(10, 12, 15, 0.22)",
          marginBottom: 12,
        }}
      >
        {era.year}
      </div>

      <Eyebrow tone={era.build ? "accent" : "muted"} style={{ marginBottom: 20 }}>
        {era.tag} · {era.label}
      </Eyebrow>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--type-heading-m)",
          fontWeight: 600,
          letterSpacing: "-0.015em",
          lineHeight: 1.2,
          color: "var(--color-text-primary)",
          margin: "0 0 12px",
        }}
      >
        {era.title}
      </h3>

      <p style={{ fontSize: "var(--type-body-m)", color: "var(--text-body)", lineHeight: 1.75, maxWidth: "56ch", margin: 0 }}>
        {era.desc}
      </p>

      {era.year === "NOW" && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 20 }}>
          <span
            aria-hidden
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "var(--color-accent)",
              animation: reduced ? "none" : "timeline-pulse 2s ease-in-out infinite",
            }}
          />
          <Eyebrow as="span" tone="accent">In progress — still forming</Eyebrow>
        </div>
      )}
    </motion.div>
  );
}

export function TimelineSection() {
  const reduced = useReducedMotion();
  const [selectedYear, setSelectedYear] = useState(ERAS[0].year);
  const era = ERAS.find((e) => e.year === selectedYear)!;

  return (
    <section id="timeline" style={{ background: "var(--surface-engineering)" }}>
      <div className="section-shell">
        <motion.div {...reveal(reduced)} style={{ marginBottom: "clamp(32px, 5vw, 56px)" }}>
          <Eyebrow style={{ marginBottom: 20 }}>Chronicle</Eyebrow>
          <h2
            style={{
              fontSize: "var(--type-heading-l)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              margin: "0 0 14px",
            }}
          >
            The build log.
          </h2>
          <p style={{ fontSize: "var(--type-body-m)", color: "var(--text-muted)", lineHeight: 1.7, maxWidth: "58ch", margin: 0 }}>
            A core sample rather than a scrapbook — each layer is a select. The texture is what that
            year actually was, not a rating of it.
          </p>
        </motion.div>

        <motion.div
          {...reveal(reduced, 1)}
          className="grid grid-cols-1 lg:grid-cols-[minmax(300px,400px)_1fr]"
          style={{ gap: "clamp(24px, 5vw, 72px)", alignItems: "start" }}
        >
          <ol style={{ listStyle: "none", margin: 0, padding: 0, borderBottom: "1px solid var(--color-hairline)" }}>
            {ERAS.map((e) => (
              <li key={e.year} style={{ borderTop: "1px solid var(--color-hairline)" }}>
                <EraRow era={e} selected={e.year === selectedYear} onSelect={() => setSelectedYear(e.year)} />
                {/* Below lg the detail opens under its own row. With the
                    panel stacked after the whole list, a tap on 2026
                    changed text a full screen further down — off-screen,
                    so the tap appeared to do nothing. */}
                {e.year === selectedYear && (
                  <div className="lg:hidden" style={{ padding: "8px 14px 28px 16px" }}>
                    <EraDetail era={e} reduced={reduced} />
                  </div>
                )}
              </li>
            ))}
          </ol>

          <div
            className="hidden lg:block"
            style={{ borderTop: "1px solid var(--color-hairline)", paddingTop: "clamp(24px, 3vw, 36px)" }}
          >
            <EraDetail era={era} reduced={reduced} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
