"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { DURATION, EASE, VIEWPORT, reveal } from "./motion";
import { SystemTopology } from "./project-art/SystemTopology";

/* Module style: DESKTOP.
 *
 * An operating system is shown as one: a screen with a menu bar and three
 * windows — a readme carrying the pitch, the topology drawing, and a
 * terminal listing the system split. Sans and mono only; the serif used by
 * the other chapters does not appear here, because nothing on a desktop is
 * set in a book face.
 *
 * The terminal is an illustration of the registry entry in
 * _data/projects.ts (its metrics and architecture layers), labelled as
 * such in the window title — it is not output from the real OS. */

const MENU = ["Tasks", "Priorities", "Agents", "Automation"];

const SPLIT: [string, string, string][] = [
  ["execution", "LeoLogic OS", "tasks · priorities · agent workflows"],
  ["knowledge", "Obsidian", "decisions · project context"],
  ["code", "Git", "implementation · commit history"],
];

const PIPELINE = ["goal", "acceptance checklist", "test", "commit", "tag", "changelog"];

const LINE = "1px solid rgba(255,255,255,0.12)";
const mono = { fontFamily: "var(--font-mono)" } as const;

function Window({
  title,
  children,
  className,
  bodyStyle,
  index = 0,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  bodyStyle?: React.CSSProperties;
  /** Order in which the window opens once the screen is in view. */
  index?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      /* Windows open, they do not slide: a small scale from the centre
         plus the fade, staggered so they arrive one after another. */
      initial={{ opacity: 0, scale: reduced ? 1 : 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: reduced ? 0 : DURATION.base, delay: reduced ? 0 : 0.15 + index * 0.12, ease: EASE }}
      className={className}
      style={{
        border: LINE,
        borderRadius: 10,
        background: "var(--surface-leologic-elevated)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
        overflow: "hidden",
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "9px 12px",
          borderBottom: LINE,
          background: "rgba(255,255,255,0.03)",
        }}
      >
        <span aria-hidden style={{ display: "flex", gap: 6 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
          ))}
        </span>
        <span style={{ ...mono, fontSize: 11, letterSpacing: "0.06em", color: "var(--text-on-dark-muted)" }}>
          {title}
        </span>
      </div>
      <div style={{ padding: "clamp(16px, 2.2vw, 26px)", flex: 1, ...bodyStyle }}>{children}</div>
    </motion.div>
  );
}

export function LeoLogicOsShowcase() {
  const reduced = useReducedMotion();

  return (
    <section style={{ background: "var(--surface-leologic)" }}>
      <div
        className="section-shell"
        style={{
          paddingTop: "clamp(64px, 9vw, 112px)",
          paddingBottom: "clamp(64px, 9vw, 112px)",
        }}
      >
        {/* ── The screen ───────────────────────────────────────── */}
        <motion.div
          {...reveal(reduced)}
          style={{
            border: LINE,
            borderRadius: 14,
            overflow: "hidden",
            background:
              "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px) 0 0 / 22px 22px, #101113",
          }}
        >
          {/* Menu bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              padding: "8px 14px",
              borderBottom: LINE,
              background: "rgba(23,24,25,0.9)",
              ...mono,
              fontSize: 12,
              color: "var(--text-on-dark-body)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 18, minWidth: 0 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-on-dark-strong)", fontWeight: 600, whiteSpace: "nowrap" }}>
                <span aria-hidden style={{ width: 8, height: 8, borderRadius: 2, background: "var(--accent-leologic)" }} />
                LeoLogic OS
              </span>
              {MENU.map((m) => (
                <span key={m} className="max-md:hidden" style={{ color: "var(--text-on-dark-muted)" }}>
                  {m}
                </span>
              ))}
            </div>
            <span style={{ color: "var(--text-on-dark-muted)", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>03 / SELECTED WORK</span>
          </div>

          {/* Desktop */}
          <div
            className="grid grid-cols-1 lg:grid-cols-12"
            style={{ gap: "clamp(14px, 2vw, 22px)", padding: "clamp(16px, 3vw, 36px)" }}
          >
            <div className="flex flex-col lg:col-span-7" style={{ gap: "clamp(14px, 2vw, 22px)", minWidth: 0 }}>
              <Window title="readme.md">
                <h2
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: "var(--type-display-s)",
                    lineHeight: 0.98,
                    letterSpacing: "-0.04em",
                    color: "var(--text-on-dark-strong)",
                    margin: "0 0 18px",
                  }}
                >
                  Systems <span style={{ color: "var(--accent-leologic)" }}>for one.</span>
                </h2>
                <p
                  style={{
                    fontSize: "var(--type-body-m)",
                    lineHeight: 1.65,
                    color: "var(--text-on-dark-body)",
                    maxWidth: "50ch",
                    margin: "0 0 22px",
                  }}
                >
                  A personal operating system for tasks, priorities, and agent workflows —
                  with Obsidian as the knowledge layer beside it, not duplicated inside it.
                </p>
                <Link
                  href="/projects/leologic-os"
                  className="group"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    minHeight: 40,
                    padding: "0 16px",
                    borderRadius: 8,
                    background: "var(--accent-leologic)",
                    color: "#0d0e10",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: 14,
                    textDecoration: "none",
                  }}
                >
                  Open LeoLogic OS
                  <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
                </Link>
              </Window>

              <Window index={1} title="system-split — illustrative" bodyStyle={{ ...mono, fontSize: 12.5, lineHeight: 1.75 }}>
                <p style={{ margin: 0, color: "var(--text-on-dark-muted)", fontSize: "inherit", lineHeight: "inherit" }}>
                  <span style={{ color: "var(--accent-leologic)" }}>$</span> os split
                </p>
                <div
                  className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_auto_1fr]"
                  style={{ columnGap: 18, margin: "2px 0 12px" }}
                >
                  {SPLIT.map(([layer, owner, scope]) => (
                    <div key={layer} className="contents">
                      <span style={{ color: "var(--text-on-dark-muted)" }}>{layer}</span>
                      <span style={{ color: "var(--text-on-dark-strong)" }}>{owner}</span>
                      <span className="max-sm:hidden" style={{ color: "var(--text-on-dark-body)" }}>{scope}</span>
                    </div>
                  ))}
                </div>
                <p style={{ margin: 0, color: "var(--text-on-dark-muted)", fontSize: "inherit", lineHeight: "inherit" }}>
                  <span style={{ color: "var(--accent-leologic)" }}>$</span> os phases
                </p>
                <p style={{ margin: "2px 0 12px", color: "var(--text-on-dark-strong)", fontSize: "inherit", lineHeight: "inherit" }}>
                  shipped&nbsp;&nbsp;Phase 1–9 + Adventure Mode (A–C)
                </p>
                <p style={{ margin: 0, color: "var(--text-on-dark-muted)", fontSize: "inherit", lineHeight: "inherit" }}>
                  <span style={{ color: "var(--accent-leologic)" }}>$</span> os pipeline
                </p>
                <p style={{ margin: "2px 0 0", color: "var(--text-on-dark-body)", fontSize: "inherit", lineHeight: "inherit" }}>
                  {PIPELINE.join(" → ")}
                  <span aria-hidden className="os-caret" style={{ display: "inline-block", width: 7, height: 14, marginLeft: 6, verticalAlign: "-2px", background: "var(--accent-leologic)" }} />
                </p>
              </Window>
            </div>

            <Window
              index={2}
              title="topology.svg"
              className="lg:col-span-5"
              bodyStyle={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <SystemTopology maxWidth={360} />
            </Window>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
