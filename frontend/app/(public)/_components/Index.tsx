"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Replaces AboutTeaser + LabTeaser + CapabilitiesSection on the landing
 * page — together those ran a full competency grid, a build-queue list,
 * and a three-card capability breakdown, none of which need to be lived
 * in full on the homepage when each already has (or, for capabilities,
 * doesn't need) a destination of its own. This keeps the three
 * navigational threads without re-running their content here.
 */
const ENTRIES = [
  {
    href: "/about",
    label: "About",
    body: "Who's building this, and the dated log of how it got here.",
  },
  {
    href: "/lab",
    label: "Lab",
    body: "The open build queue — staged honestly as queued, in progress, or shipped.",
  },
];

const CAPABILITY_GROUPS = [
  { label: "Process Engineering", tags: ["P&ID Reading", "Process Instrumentation", "DCS Operations"] },
  { label: "AI & Agents", tags: ["LLM Orchestration", "Agent Workflows"] },
  { label: "Full-Stack Systems", tags: ["Next.js", "FastAPI", "React Native"] },
];

export function Index() {
  const reduced = useReducedMotion();

  return (
    <section id="index" className="section-shell">
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: reduced ? 0 : 0.7, ease }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0 }}>
          {ENTRIES.map((entry) => (
            <Link
              key={entry.href}
              href={entry.href}
              className="index-row group"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 20,
                padding: "clamp(20px, 3vw, 28px) 4px",
                textDecoration: "none",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(16px, 3vw, 40px)", flex: 1, minWidth: 240 }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(18px, 2vw, 22px)",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    color: "var(--color-text-primary)",
                    margin: 0,
                    flexShrink: 0,
                  }}
                >
                  {entry.label}
                </h3>
                <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
                  {entry.body}
                </p>
              </div>
              <span
                className="transition-transform duration-300 group-hover:translate-x-1"
                style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}
                aria-hidden
              >
                →
              </span>
            </Link>
          ))}
        </div>

        {/* Capabilities — no destination page, so a compact static summary
            rather than a link row. Tools actually in use, nothing
            aspirational. */}
        <div className="index-row" style={{ padding: "clamp(20px, 3vw, 28px) 4px" }}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(18px, 2vw, 22px)",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--color-text-primary)",
              margin: "0 0 14px",
            }}
          >
            Capabilities
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px, 4vw, 40px)" }}>
            {CAPABILITY_GROUPS.map((group) => (
              <div key={group.label} style={{ minWidth: 180 }}>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    margin: "0 0 6px",
                  }}
                >
                  {group.label}
                </p>
                <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0, lineHeight: 1.7 }}>
                  {group.tags.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
