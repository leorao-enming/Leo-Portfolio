"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { PROJECTS } from "../../_data/projects";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Three flagship projects, chosen deliberately: each is a registered
 * Project with its own slug and detail page, not a Lab build-queue entry
 * dressed up as finished work. FabTwin (L-03, status IN PROGRESS, no
 * detail page yet) stays in /lab until it actually ships one — this
 * section replaced the six-card ProjectsSection specifically to stop
 * implying every entry carries equal weight, so it can't turn around and
 * do the same thing with an unshipped build.
 */
const FLAGSHIP_SLUGS = ["half-life", "leologic-os", "trace"];

export function SelectedWork() {
  const reduced = useReducedMotion();
  const projects = FLAGSHIP_SLUGS
    .map((slug) => PROJECTS.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

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

      {/* An index, not a card grid: number, title, one line, a link. The
          full stack chips and metric grids live at /projects/[slug] —
          here the work is named, not itemized. */}
      <div>
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: reduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : i * 0.08, ease }}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="index-row group"
              style={{
                display: "grid",
                gridTemplateColumns: "48px 1fr auto",
                alignItems: "baseline",
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
                }}
              >
                {String(i + 1).padStart(2, "0")}
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

              <span
                className="transition-transform duration-300 group-hover:translate-x-1"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  color: "var(--text-muted)",
                  whiteSpace: "nowrap",
                  alignSelf: "center",
                }}
                aria-hidden
              >
                {project.statusLabel} →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
