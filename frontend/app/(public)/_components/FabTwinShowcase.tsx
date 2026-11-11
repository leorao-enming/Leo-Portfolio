"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { reveal } from "./motion";
import { LAB_ENTRIES } from "../../_data/lab";
import { Wafer, SpcPanel } from "./project-art/FabTwinArt";

/* Module style: MICROGRAPHICS.
 *
 * FabTwin is set as a board of technical label panels — the vocabulary of
 * equipment nameplates and wafer-lot stickers: hard 1px frames, a heavy
 * condensed grotesque instead of the serif used elsewhere, mono field
 * labels over large values, a hazard-stripe status block. A fab is a place
 * where everything carries a label, so the section is built out of them.
 *
 * Every value is taken from the L-03 entry in _data/lab.ts. */

const fabTwin = LAB_ENTRIES.find((e) => e.id === "L-03")!;

const INK = "#0a0c0f";
const FRAME = `1px solid ${INK}`;

const SPECS = [
  { field: "Test suite", value: "158 passing", note: "Local + CI · simulator and SPC milestones closed" },
  { field: "Validation target", value: "SECOM · LAM9600", note: "Public fab datasets — not run yet" },
  { field: "Methods", value: "PCA · T² · SPE", note: "Multivariate fault detection" },
  { field: "Companion build", value: "FabChem", note: "IPA / water separation techno-economic optimizer" },
];

const field = {
  fontFamily: "var(--font-mono)",
  fontSize: 10.5,
  letterSpacing: "0.16em",
  textTransform: "uppercase" as const,
  margin: 0,
};

/* Each panel reveals on its own, in reading order. The board used to fade
   in as one ~900px block, which on a fast scroll meant an empty titanium
   field followed by everything at once. */
function Panel({
  children,
  className,
  dark = false,
  style,
  index = 0,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  style?: React.CSSProperties;
  index?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      {...reveal(reduced, index)}
      className={className}
      style={{
        border: FRAME,
        background: dark ? "var(--surface-fabtwin-dark)" : "rgba(255,255,255,0.34)",
        padding: "clamp(16px, 2vw, 24px)",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

export function FabTwinShowcase() {

  return (
    <section style={{ background: "var(--surface-fabtwin)" }}>
      <div
        className="section-shell"
        style={{
          paddingTop: "clamp(64px, 9vw, 112px)",
          paddingBottom: "clamp(64px, 9vw, 112px)",
        }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-12" style={{ gap: 10 }}>
          {/* ── Nameplate ─────────────────────────────────────── */}
          <Panel className="col-span-2 lg:col-span-7 lg:row-span-2" style={{ justifyContent: "space-between", gap: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <p style={{ ...field, color: "var(--accent-fabtwin-ink)" }}>02 / FabTwin</p>
              <p style={{ ...field, color: "var(--text-muted)" }}>Ref {fabTwin.id}</p>
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "var(--type-display-m)",
                  lineHeight: 0.86,
                  letterSpacing: "-0.035em",
                  textTransform: "uppercase",
                  color: INK,
                  margin: "0 0 22px",
                }}
              >
                Process
                <br />
                under
                <br />
                <span style={{ color: "var(--accent-fabtwin-ink)" }}>control.</span>
              </h2>
              <p
                style={{
                  fontSize: "var(--type-body-m)",
                  lineHeight: 1.6,
                  color: "var(--text-body)",
                  maxWidth: "46ch",
                  margin: "0 0 20px",
                }}
              >
                A plasma-etch SPC and fault-detection simulator, built to be checked against
                public fab datasets rather than only against its own synthetic data.
              </p>
              <Link
                href="/lab"
                className="group"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  minHeight: 44,
                  padding: "0 16px",
                  border: FRAME,
                  background: INK,
                  color: "#fff",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                View project
                <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>↗</span>
              </Link>
            </div>
          </Panel>

          {/* ── Instrument ────────────────────────────────────── */}
          <Panel dark index={1} className="col-span-2 lg:col-span-5" style={{ padding: 10 }}>
            <SpcPanel />
          </Panel>

          {/* ── Wafer ─────────────────────────────────────────── */}
          <Panel index={2} className="col-span-1 lg:col-span-2" style={{ alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <p style={{ ...field, color: "var(--text-muted)", alignSelf: "flex-start" }}>Wafer</p>
            <div style={{ width: "100%", maxWidth: 150 }}>
              <Wafer idPrefix="fabtwin-board-wafer" />
            </div>
          </Panel>

          {/* ── Status block ──────────────────────────────────── */}
          <Panel
            index={3}
            className="col-span-1 lg:col-span-3"
            style={{
              justifyContent: "space-between",
              gap: 16,
              /* Hazard stripe in the section's own violet rather than
                 safety yellow: it marks "work in progress", not danger. */
              background:
                "repeating-linear-gradient(135deg, rgba(78,71,128,0.16) 0 10px, rgba(255,255,255,0.34) 10px 20px)",
            }}
          >
            <p style={{ ...field, color: "var(--text-muted)" }}>Status</p>
            {/* fabTwin.status keeps this honest if the build's phase
                changes — IN PROGRESS today, not asserted as shipped. */}
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(20px, 2.4vw, 30px)",
                lineHeight: 0.95,
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
                color: INK,
                margin: 0,
              }}
            >
              {fabTwin.status}
            </p>
          </Panel>

          {/* ── Spec labels ───────────────────────────────────── */}
          {SPECS.map((s, i) => (
            <Panel key={s.field} index={i} className="col-span-2 sm:col-span-1 lg:col-span-3" style={{ gap: 10 }}>
              <p style={{ ...field, color: "var(--accent-fabtwin-ink)" }}>{s.field}</p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(20px, 2.1vw, 28px)",
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                  color: INK,
                  margin: 0,
                }}
              >
                {s.value}
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.45, color: "var(--text-body)", margin: 0 }}>{s.note}</p>
            </Panel>
          ))}
        </div>
      </div>
    </section>
  );
}
