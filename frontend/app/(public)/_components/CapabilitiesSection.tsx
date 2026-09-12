"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

// Tags name tools and methods actually in use. Anything aspirational belongs in
// the competency matrix's "next step" column, not here.
// One accent (the site's) rather than a different hue per card — three
// competing colors on three identical boxes was decoration standing in
// for genuine layout variety, not adding to it.
const capabilities = [
  {
    id: "chem",
    label: "Process Engineering",
    tags: ["P&ID Reading", "Process Instrumentation", "DCS Operations", "SOP & HSE"],
    featured: true,
  },
  {
    id: "ai",
    label: "AI & Agents",
    tags: ["LLM Orchestration", "Agent Workflows", "AI-Assisted Authoring"],
    featured: false,
  },
  {
    id: "sys",
    label: "Full-Stack Systems",
    tags: ["Next.js", "FastAPI", "React Native", "Supabase", "Docker"],
    featured: false,
  },
];

export function CapabilitiesSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="capabilities"
      className="section-shell"
    >
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: reduced ? 0 : 0.7, ease }}
        style={{ marginBottom: "clamp(40px, 6vw, 64px)" }}
      >
        <span className="eyebrow" style={{ marginBottom: 20 }}>
          Capabilities
        </span>
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "var(--color-text-primary)",
            margin: 0,
          }}
        >
          The stack behind the work.
        </h2>
      </motion.div>

      <div
        className="sm:grid-cols-2"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "clamp(12px, 1.8vw, 20px)",
        }}
      >
        {capabilities.map((cap, i) => (
          <motion.div
            key={cap.id}
            className="sm:col-span-2"
            initial={{ opacity: 0, y: reduced ? 0 : 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : i * 0.07, ease }}
            style={cap.featured ? undefined : { gridColumn: "span 1" }}
          >
            {/* Single hairline border with a thin accent rule on top, not the
                double bezel used for the project gallery — a different shape
                system for spec/capability content, used consistently. */}
            <div
              style={{
                height: "100%",
                border: "1px solid var(--color-hairline)",
                borderTop: `2px solid ${cap.featured ? "var(--color-accent)" : "var(--color-hairline-bright)"}`,
                padding: cap.featured ? "clamp(26px, 3.4vw, 36px)" : "clamp(22px, 3vw, 28px)",
                display: "flex",
                flexDirection: cap.featured ? "row" : "column",
                justifyContent: "space-between",
                alignItems: cap.featured ? "flex-end" : "stretch",
                gap: cap.featured ? "clamp(16px, 3vw, 32px)" : 18,
                flexWrap: "wrap",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: cap.featured ? "clamp(20px, 2.6vw, 28px)" : "clamp(16px, 2vw, 20px)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  color: "var(--color-text-primary)",
                  margin: 0,
                  flexShrink: 0,
                }}
              >
                {cap.label}
              </h3>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px 8px",
                  justifyContent: cap.featured ? "flex-end" : "flex-start",
                }}
              >
                {cap.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      padding: "4px 10px",
                      borderRadius: 4,
                      background: "rgba(10, 12, 15,0.035)",
                      border: "1px solid rgba(10, 12, 15,0.08)",
                      fontSize: 11,
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
