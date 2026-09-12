"use client";

import { useState } from "react";
import { COMPETENCIES } from "../../_data/engineering";

/**
 * A simplified P&ID-style process line, replacing a plain competency-card
 * list as the section's lead visual — chemical engineering, instrumentation,
 * and plant exposure should read from the diagram itself, not from a list
 * of skill names. Generic/fictional topology by design (a feed tank feeding
 * a pump, heat exchanger, and reactor) — no confidential plant information,
 * per the brief's own constraint.
 *
 * Every instrument tag here (PT/TT/LT/FT) is one the internship's own focus
 * areas literally name ("Process instrumentation — PT / TT / LT / FT").
 * Detail panels pull their evidence and next-step straight from
 * COMPETENCIES rather than inventing new claims, and stay honest about the
 * real self-assessed level (Beginner across every one of these) rather than
 * dressing up exposure as expertise.
 *
 * Each node is a real <button>, not a hover-only target: brief requires
 * tap-equivalents on mobile and keyboard operability, and hover-only
 * information is invisible to both.
 */

type NodeKind = "equipment" | "instrument";

type SchematicNode = {
  tag: string;
  label: string;
  kind: NodeKind;
  /** Ties into the honest self-assessment already on this page. */
  competency: string;
};

const NODES: SchematicNode[] = [
  { tag: "TK-101", label: "Feed tank", kind: "equipment", competency: "P&ID Reading" },
  { tag: "LT-101", label: "Level transmitter", kind: "instrument", competency: "Process Instrumentation" },
  { tag: "FT-101", label: "Flow transmitter", kind: "instrument", competency: "Process Instrumentation" },
  { tag: "FCV-101", label: "Flow control valve", kind: "equipment", competency: "P&ID Reading" },
  { tag: "P-101", label: "Feed pump", kind: "equipment", competency: "P&ID Reading" },
  { tag: "HX-101", label: "Preheat exchanger", kind: "equipment", competency: "P&ID Reading" },
  { tag: "TT-101", label: "Temperature transmitter", kind: "instrument", competency: "Process Instrumentation" },
  { tag: "R-101", label: "Reactor", kind: "equipment", competency: "P&ID Reading" },
  { tag: "PT-101", label: "Pressure transmitter", kind: "instrument", competency: "Process Instrumentation" },
];

// Vertical position for the main process line; instruments branch off it.
const MAIN_LINE = ["TK-101", "FCV-101", "P-101", "HX-101", "R-101"];

export function ProcessSchematicArt() {
  const [selected, setSelected] = useState<string>(NODES[0].tag);
  const node = NODES.find((n) => n.tag === selected)!;
  const competency = COMPETENCIES.find((c) => c.name === node.competency);

  const rowH = 56;
  const svgH = MAIN_LINE.length * rowH + 24;
  const lineX = 90;

  return (
    <div
      className="lg:grid-cols-[1.1fr_1fr]"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "clamp(20px, 3vw, 36px)",
        marginBottom: "clamp(28px, 4vw, 40px)",
      }}
    >
      {/* ── The schematic ─────────────────────────────────────────── */}
      <div className="bezel-outer">
        {/* material-steel only on the diagram side — the detail panel
            keeps plain paper so its text stays at full, undiluted contrast. */}
        <div className="bezel-inner material-steel" style={{ padding: "clamp(20px, 3vw, 30px)" }}>
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.22em",
              color: "var(--text-muted)",
              fontFamily: "var(--font-display)",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Process line — feed to reactor (illustrative topology)
          </p>

          <svg
            viewBox={`0 0 320 ${svgH}`}
            style={{ width: "100%", height: "auto", display: "block" }}
            role="group"
            aria-label="Simplified process and instrumentation diagram. Select a tag below to see the corresponding competency."
          >
            {/* Main process line */}
            <line x1={lineX} y1={20} x2={lineX} y2={svgH - 20} stroke="var(--color-hairline-bright)" strokeWidth="2" />
            {/* Flow direction arrow */}
            <path d={`M ${lineX - 4} ${svgH - 26} L ${lineX} ${svgH - 18} L ${lineX + 4} ${svgH - 26}`} fill="none" stroke="var(--color-hairline-bright)" strokeWidth="2" />

            {MAIN_LINE.map((tag, i) => {
              const y = 24 + i * rowH;
              const n = NODES.find((x) => x.tag === tag)!;
              const isSel = selected === tag;
              return (
                <g key={tag} className="schematic-node" role="button" tabIndex={0} aria-pressed={isSel} aria-label={`${tag} — ${n.label}`}
                   onClick={() => setSelected(tag)}
                   onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(tag); } }}
                   style={{ cursor: "pointer" }}
                >
                  <rect
                    x={lineX - 46} y={y - 14} width="92" height="28" rx="3"
                    fill={isSel ? "rgba(3,105,161,0.1)" : "#fbfaf6"}
                    stroke={isSel ? "#0369a1" : "var(--color-hairline-bright)"}
                    strokeWidth={isSel ? 1.5 : 1}
                  />
                  <text x={lineX} y={y + 4} textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fontWeight={isSel ? 700 : 500} fill={isSel ? "#0369a1" : "var(--color-text-primary)"}>
                    {tag}
                  </text>
                </g>
              );
            })}

            {/* Instrument branches — circles per ISA convention for a
                field-mounted instrument, offset from the line they measure. */}
            {[
              { tag: "LT-101", atIndex: 0, dx: 90 },
              { tag: "FT-101", atIndex: 0.5, dx: -90 },
              { tag: "TT-101", atIndex: 3, dx: 90 },
              { tag: "PT-101", atIndex: 4, dx: -90 },
            ].map(({ tag, atIndex, dx }) => {
              const n = NODES.find((x) => x.tag === tag)!;
              const y = 24 + atIndex * rowH;
              const cx = lineX + dx;
              const isSel = selected === tag;
              return (
                <g key={tag} className="schematic-node" role="button" tabIndex={0} aria-pressed={isSel} aria-label={`${tag} — ${n.label}`}
                   onClick={() => setSelected(tag)}
                   onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(tag); } }}
                   style={{ cursor: "pointer" }}
                >
                  <line x1={lineX + (dx > 0 ? 6 : -6)} y1={y} x2={cx + (dx > 0 ? -22 : 22)} y2={y} stroke="var(--color-hairline-bright)" />
                  <circle
                    cx={cx} cy={y} r="21"
                    fill={isSel ? "rgba(3,105,161,0.1)" : "#fbfaf6"}
                    stroke={isSel ? "#0369a1" : "var(--color-hairline-bright)"}
                    strokeWidth={isSel ? 1.5 : 1}
                  />
                  <text x={cx} y={y + 4} textAnchor="middle" fontSize="9.5" fontFamily="var(--font-mono)" fontWeight={isSel ? 700 : 500} fill={isSel ? "#0369a1" : "var(--color-text-primary)"}>
                    {tag}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* ── Detail panel — reacts to the selected tag, not a tooltip, so
          it works identically for click, tap, and keyboard focus ──── */}
      <div className="bezel-outer">
        <div className="bezel-inner" style={{ padding: "clamp(22px, 3vw, 30px)", minHeight: "100%" }}>
          <p style={{ fontSize: 12, letterSpacing: "0.2em", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: 4 }}>
            {node.tag}
          </p>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, margin: "0 0 4px", color: "var(--color-text-primary)" }}>
            {node.label}
          </h3>
          <p style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: 18, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            {node.kind === "instrument" ? "Field instrument" : "Process equipment"}
          </p>

          {competency && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10, gap: 12, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, color: "var(--color-text-primary)", fontFamily: "var(--font-display)" }}>
                  {competency.name}
                </span>
                <span style={{ fontSize: 11, letterSpacing: "0.15em", color: "#6d28d9", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
                  {competency.level}
                </span>
              </div>
              <p style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-mono)", lineHeight: 1.7, marginBottom: 6 }}>
                Plant exposure — {competency.evidence}
              </p>
              <p style={{ fontSize: 12, color: "#6d28d9", fontFamily: "var(--font-mono)", lineHeight: 1.7, margin: 0 }}>
                Next step — {competency.nextStep}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
