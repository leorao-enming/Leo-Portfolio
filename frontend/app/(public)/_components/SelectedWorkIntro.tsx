"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Opens the Selected Work chapter and hands off to the three
 * project-specific sections that follow. Deliberately small: the three
 * flagships each carry their own heading, so a second large "Selected
 * work." headline competing with them is exactly the repeated-template
 * language Phase 2 is removing. The "All projects" link is the one piece
 * worth keeping from the old index — it's the route into the registry.
 */
export function SelectedWorkIntro() {
  const reduced = useReducedMotion();

  return (
    <section id="projects" style={{ background: "var(--surface-soft)" }}>
      <motion.div
        className="section-shell"
        initial={{ opacity: 0, y: reduced ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: reduced ? 0 : 0.7, ease }}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          flexWrap: "wrap",
          gap: 20,
          paddingTop: "clamp(48px, 7vw, 88px)",
          paddingBottom: "clamp(32px, 4vw, 48px)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            margin: 0,
          }}
        >
          Selected work
        </p>
        <Link
          href="/projects"
          className="group"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--font-display)",
            fontSize: 13,
            color: "var(--text-body)",
            textDecoration: "none",
          }}
        >
          All projects
          <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>→</span>
        </Link>
      </motion.div>
    </section>
  );
}
