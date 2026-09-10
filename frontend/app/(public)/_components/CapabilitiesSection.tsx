"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

// Tags name tools and methods actually in use. Anything aspirational belongs in
// the competency matrix's "next step" column, not here.
const capabilities = [
  {
    id: "chem",
    label: "Process Engineering",
    tags: ["P&ID Reading", "Process Instrumentation", "DCS Operations", "SOP & HSE"],
    accent: "#c084fc",
  },
  {
    id: "ai",
    label: "AI & Agents",
    tags: ["LLM Orchestration", "Agent Workflows", "AI-Assisted Authoring"],
    accent: "#60a5fa",
  },
  {
    id: "sys",
    label: "Full-Stack Systems",
    tags: ["Next.js", "FastAPI", "React Native", "Supabase", "Docker"],
    accent: "#fb923c",
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
        <span
          style={{
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: 12,
            letterSpacing: "0.24em",
            color: "var(--text-muted)",
            fontFamily: "var(--font-display)",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Capabilities
        </span>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 700,
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
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "clamp(12px, 1.8vw, 20px)",
        }}
        className="sm:grid-cols-2 lg:grid-cols-3"
      >
        {capabilities.map((cap, i) => (
          <motion.div
            key={cap.id}
            initial={{ opacity: 0, y: reduced ? 0 : 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : i * 0.07, ease }}
          >
            <div
              className="bezel-outer"
              style={{ height: "100%" }}
            >
              <div
                className="bezel-inner"
                style={{
                  padding: "clamp(22px, 3vw, 32px)",
                  height: "100%",
                  minHeight: 180,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Subtle accent glow */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    bottom: -30,
                    right: -30,
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${cap.accent}18 0%, transparent 70%)`,
                    pointerEvents: "none",
                  }}
                />

                <div>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: cap.accent,
                      marginBottom: 16,
                      boxShadow: `0 0 12px ${cap.accent}66`,
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(16px, 2vw, 22px)",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                      color: "var(--color-text-primary)",
                      marginBottom: 18,
                    }}
                  >
                    {cap.label}
                  </h3>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px 8px",
                    marginTop: "auto",
                  }}
                >
                  {cap.tags.map(tag => (
                    <span
                      key={tag}
                      style={{
                        padding: "4px 10px",
                        borderRadius: "9999px",
                        background: `${cap.accent}0c`,
                        border: `1px solid ${cap.accent}25`,
                        fontSize: 11,
                        color: cap.accent,
                        fontFamily: "var(--font-display)",
                        opacity: 0.85,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
