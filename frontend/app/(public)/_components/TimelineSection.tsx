"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

const events = [
  {
    year: "2022",
    title: "Six Sigma Black Belt",
    desc: "Completed intensive Six Sigma Black Belt certification, applying DMAIC frameworks to process optimization problems.",
    tag: "Certification",
    accent: "#c084fc",
  },
  {
    year: "2023",
    title: "University of Toronto",
    desc: "Enrolled in Chemical Engineering at UofT, focusing on process simulation, thermodynamics, and applied computing.",
    tag: "Education",
    accent: "#60a5fa",
  },
  {
    year: "2024",
    title: "LeoLogic System — First Commit",
    desc: "Began building the LeoLogic personal OS: a unified dashboard integrating biometrics, quant signals, and AI command layers.",
    tag: "Build",
    accent: "var(--color-terminal-green)",
  },
  {
    year: "2024",
    title: "Quant Research Begins",
    desc: "Started systematic research into options flow, market microstructure, and quantitative alpha generation strategies.",
    tag: "Research",
    accent: "#fb923c",
  },
  {
    year: "2025",
    title: "LQC — Live Quant Center",
    desc: "Launched development of LQC: a real-time quant platform with live data feeds, backtesting engine, and signal dashboards.",
    tag: "Launch",
    accent: "var(--color-terminal-green)",
  },
];

export function TimelineSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="timeline"
      style={{
        padding: "clamp(80px, 12vw, 160px) clamp(24px, 5vw, 80px)",
        maxWidth: "1280px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: reduced ? 0 : 0.7, ease }}
        style={{ marginBottom: "clamp(48px, 7vw, 80px)" }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: 10,
            letterSpacing: "0.24em",
            color: "rgba(255,255,255,0.4)",
            fontFamily: "var(--font-display)",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Timeline
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
          The build log.
        </h2>
      </motion.div>

      <div style={{ position: "relative" }}>
        {/* Vertical line */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 20,
            top: 0,
            bottom: 0,
            width: 1,
            background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 15%, rgba(255,255,255,0.08) 85%, transparent)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(28px, 4vw, 44px)" }}>
          {events.map((ev, i) => (
            <motion.div
              key={`${ev.year}-${i}`}
              initial={{ opacity: 0, x: reduced ? 0 : -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : i * 0.08, ease }}
              style={{
                display: "flex",
                gap: "clamp(20px, 3vw, 40px)",
                alignItems: "flex-start",
                paddingLeft: 0,
              }}
            >
              {/* Dot */}
              <div
                style={{
                  width: 40,
                  flexShrink: 0,
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: 4,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: ev.accent,
                    boxShadow: `0 0 12px ${ev.accent}88`,
                    animation: i === events.length - 1 ? "timeline-pulse 2.5s ease-in-out infinite" : undefined,
                    flexShrink: 0,
                  }}
                />
              </div>

              {/* Content */}
              <div style={{ flex: 1, paddingBottom: 4 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 10,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      color: "rgba(255,255,255,0.25)",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {ev.year}
                  </span>
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: "9999px",
                      background: `${ev.accent}10`,
                      border: `1px solid ${ev.accent}28`,
                      fontSize: 9,
                      letterSpacing: "0.2em",
                      color: ev.accent,
                      fontFamily: "var(--font-display)",
                      textTransform: "uppercase",
                    }}
                  >
                    {ev.tag}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(16px, 2vw, 22px)",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.25,
                    color: "var(--color-text-primary)",
                    marginBottom: 8,
                  }}
                >
                  {ev.title}
                </h3>

                <p
                  style={{
                    fontSize: "clamp(13px, 1.1vw, 15px)",
                    color: "rgba(255,255,255,0.38)",
                    lineHeight: 1.7,
                    maxWidth: 540,
                  }}
                >
                  {ev.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
