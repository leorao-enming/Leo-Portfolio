"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { SystemTopology } from "./project-art/SystemTopology";

const ease = [0.16, 1, 0.3, 1] as const;

const TAGS = ["Agent workflows", "Automation", "Personal systems"];

export function LeoLogicOsShowcase() {
  const reduced = useReducedMotion();

  return (
    <section style={{ background: "var(--surface-leologic)" }}>
      {/* Columns in className only, same reason as the other two
          showcases. Topology left / text right on desktop (the order
          classes below flip it), vertical topology under the text on
          mobile. */}
      <div
        className="section-shell grid grid-cols-1 items-center lg:grid-cols-[1fr_1fr]"
        style={{
          gap: "clamp(40px, 6vw, 80px)",
          paddingTop: "clamp(80px, 11vw, 130px)",
          paddingBottom: "clamp(80px, 11vw, 130px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduced ? 0 : 0.7, ease }}
          /* order lives only in className — an inline order would always
             beat the responsive class regardless of breakpoint, the same
             bug already fixed once in Hero.tsx. */
          className="order-2 lg:order-1"
        >
          <SystemTopology />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.1, ease }}
          className="order-1 lg:order-2"
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.24em",
              color: "var(--accent-leologic)",
              margin: "0 0 20px",
            }}
          >
            03 / LEOLOGIC OS
          </p>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              fontSize: "clamp(44px, 7vw, 92px)",
              lineHeight: 0.98,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "var(--text-on-dark-strong)",
              margin: "0 0 24px",
            }}
          >
            <span style={{ display: "block" }}>Systems</span>
            <span style={{ display: "block", color: "var(--accent-leologic)" }}>for one.</span>
          </h2>
          <p
            style={{
              fontSize: "clamp(14px, 1.2vw, 16px)",
              lineHeight: 1.7,
              color: "var(--text-on-dark-body)",
              maxWidth: "44ch",
              margin: "0 0 24px",
            }}
          >
            A personal operating system for tasks, priorities, and agent workflows —
            with Obsidian as the knowledge layer beside it, not duplicated inside it.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 8px", marginBottom: 28 }}>
            {TAGS.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-on-dark-muted)",
                }}
              >
                {tag}{tag !== TAGS[TAGS.length - 1] ? " ·" : ""}
              </span>
            ))}
          </div>
          <Link
            href="/projects/leologic-os"
            className="group"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-display)",
              fontSize: 14,
              color: "var(--accent-leologic)",
              textDecoration: "none",
            }}
          >
            Explore LeoLogic OS
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
