"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { PROJECTS } from "../../_data/projects";
import { LAB_ENTRIES } from "../../_data/lab";
import { HalfLifeMotif, FabTwinMotif, LeoLogicOsMotif } from "./SelectedWorkArt";

const ease = [0.16, 1, 0.3, 1] as const;

const halfLife = PROJECTS.find((p) => p.slug === "half-life")!;
const leologicOs = PROJECTS.find((p) => p.slug === "leologic-os")!;
const fabTwin = LAB_ENTRIES.find((e) => e.id === "L-03")!;

/**
 * The three flagships named directly by the brief — Half-Life, FabTwin,
 * LeoLogic OS — not the prior three (Half-Life, LeoLogic OS, Trace).
 *
 * FabTwin has no /projects/[slug] page yet: it's Lab entry L-03, status IN
 * PROGRESS, not a registered project with documented architecture. Rather
 * than fabricate a detail page for it or silently link to one that 404s,
 * its card links to /lab, where its real status already lives — the same
 * honesty convention (SelectedWork's own file header, LAB_DISCLOSURE) this
 * codebase already applies everywhere else. That's a deliberate deviation
 * from treating all three as equal-weight registered projects.
 *
 * Each row also carries a small distinct "shape signature" (SelectedWorkArt)
 * instead of a repeated template, so the three read as structurally
 * different compositions — the placeholder each project's eventual full art
 * direction will replace, not three identical cards.
 */
const FLAGSHIPS = [
  {
    number: "01",
    title: "Half-Life",
    href: `/projects/${halfLife.slug}`,
    summary: halfLife.summary,
    statusLabel: halfLife.statusLabel,
    Motif: HalfLifeMotif,
  },
  {
    number: "02",
    title: "FabTwin",
    href: "/lab",
    summary: fabTwin.objective,
    statusLabel: fabTwin.status,
    Motif: FabTwinMotif,
  },
  {
    number: "03",
    title: "LeoLogic OS",
    href: `/projects/${leologicOs.slug}`,
    summary: leologicOs.summary,
    statusLabel: leologicOs.statusLabel,
    Motif: LeoLogicOsMotif,
  },
];

export function SelectedWork() {
  const reduced = useReducedMotion();

  return (
    <section id="projects" className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: reduced ? 0 : 0.7, ease }}
        style={{
          marginBottom: "clamp(40px, 6vw, 64px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "var(--color-text-primary)",
            margin: 0,
          }}
        >
          Selected work.
        </h2>

        <Link
          href="/projects"
          className="group"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 16px",
            borderRadius: "9999px",
            border: "1px solid rgba(10, 12, 15,0.12)",
            background: "rgba(10, 12, 15,0.03)",
            fontFamily: "var(--font-display)",
            fontSize: 12,
            letterSpacing: "0.02em",
            color: "var(--text-muted)",
            whiteSpace: "nowrap",
            transition: "color 240ms ease, border-color 240ms ease, background 240ms ease",
          }}
        >
          All projects
          <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>→</span>
        </Link>
      </motion.div>

      {/* Each flagship gets its own shape signature rather than a repeated
          row template — three structurally distinct shells, not three
          identical cards. */}
      <div>
        {FLAGSHIPS.map((project, i) => (
          <motion.div
            key={project.href}
            initial={{ opacity: 0, y: reduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : i * 0.08, ease }}
          >
            <Link
              href={project.href}
              className="index-row group"
              style={{
                display: "grid",
                gridTemplateColumns: "48px 1fr auto",
                alignItems: "center",
                gap: "clamp(16px, 3vw, 32px)",
                padding: "clamp(24px, 3.5vw, 36px) 4px",
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: "var(--text-muted)",
                  alignSelf: "start",
                  paddingTop: 6,
                }}
              >
                {project.number}
              </span>

              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(22px, 3vw, 34px)",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                    color: "var(--color-text-primary)",
                    margin: "0 0 8px",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontSize: "clamp(13px, 1.1vw, 15px)",
                    lineHeight: 1.6,
                    color: "var(--text-body)",
                    maxWidth: "58ch",
                    margin: 0,
                  }}
                >
                  {project.summary}
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
                <project.Motif />
                <span
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    letterSpacing: "0.1em",
                    color: "var(--text-muted)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {project.statusLabel} →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
