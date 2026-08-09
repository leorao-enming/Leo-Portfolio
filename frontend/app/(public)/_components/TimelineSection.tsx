"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useInView } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

const events = [
  {
    year: "2022",
    label: "SHENZHEN · ORIGIN",
    title: "Six Sigma Black Belt",
    desc: "Completed intensive DMAIC certification — applying statistical process control and variance reduction to real manufacturing systems.",
    tag: "Certification",
    accent: "#c084fc",
    ch: "01",
  },
  {
    year: "2023",
    label: "TORONTO · CAMPUS",
    title: "University of Toronto",
    desc: "Enrolled in Chemical Engineering. Process simulation, thermodynamics, transport phenomena — the formal foundation for everything else.",
    tag: "Education",
    accent: "#60a5fa",
    ch: "02",
  },
  {
    year: "2024",
    label: "LEOLOGIC · BUILD",
    title: "First Commit",
    desc: "Began building the LeoLogic personal OS: unified dashboard for biometrics, quant signals, and AI command layers. The machine wakes up.",
    tag: "Build",
    accent: "var(--color-terminal-green)",
    ch: "03",
  },
  {
    year: "2024",
    label: "MARKETS · QUANT",
    title: "Quant Research Begins",
    desc: "Systematic research into market data pipelines, signal construction, and backtest methodology. Data as signal, not noise.",
    tag: "Research",
    accent: "#fb923c",
    ch: "04",
  },
  {
    year: "2026",
    label: "HUBEI · PLANT FLOOR",
    title: "Process Engineering Internship",
    desc: "Joined the process engineering department at Hubei Jingrui Microelectronic Materials. P&ID, instrumentation, DCS operations, SOPs — the discipline that theory turns into.",
    tag: "Industry",
    accent: "#c084fc",
    ch: "05",
  },
  {
    year: "NOW",
    label: "LIVE · BUILDING",
    title: "LQC & Half-Life",
    desc: "A containerised quant research stack running paper-only by design, and an iOS metabolism app on HealthKit. Still uncertain — productively.",
    tag: "Build",
    accent: "var(--color-terminal-green)",
    ch: "06",
  },
];

function TimelineEntry({
  ev,
  index,
  reduced,
}: {
  ev: typeof events[0];
  index: number;
  reduced: boolean | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 0,
        paddingBottom: "clamp(48px, 8vh, 96px)",
        overflow: "hidden",
      }}
      className="md:grid-cols-[1fr_1.6fr]"
    >
      {/* Giant year backdrop — Wang-13 style */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: reduced ? 0 : 1.2, ease }}
        style={{
          position: "absolute",
          top: "50%",
          left: "clamp(-20px, -2vw, -40px)",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(100px, 18vw, 220px)",
          fontWeight: 800,
          letterSpacing: "-0.05em",
          color: "rgba(255,255,255,0.025)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        {ev.year}
      </motion.div>

      {/* Left — year + chapter */}
      <motion.div
        initial={{ opacity: 0, x: reduced ? 0 : -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.1, ease }}
        style={{ position: "relative", zIndex: 1, paddingTop: 4, paddingBottom: 12 }}
      >
        <div style={{ fontSize: 8, letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mono)", marginBottom: 8, textTransform: "uppercase" }}>
          CHAPTER {ev.ch} / 05
        </div>

        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(52px, 9vw, 96px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: ev.year === "NOW" ? "var(--color-terminal-green)" : "rgba(255,255,255,0.12)",
            textShadow: ev.year === "NOW" ? "0 0 60px rgba(0,255,65,0.25)" : undefined,
          }}
        >
          {ev.year}
        </div>

        <div style={{ fontSize: 8, letterSpacing: "0.22em", color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mono)", marginTop: 8, textTransform: "uppercase" }}>
          {ev.label}
        </div>
      </motion.div>

      {/* Right — content */}
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.2, ease }}
        style={{
          position: "relative",
          zIndex: 1,
          paddingTop: "clamp(0px, 2vw, 16px)",
          paddingLeft: "clamp(0px, 3vw, 40px)",
          borderLeft: "1px solid rgba(255,255,255,0.06)",
        }}
        className="md:border-l"
      >
        <span
          style={{
            display: "inline-block",
            padding: "2px 9px",
            borderRadius: 9999,
            border: `1px solid ${ev.accent}30`,
            background: `${ev.accent}0d`,
            fontSize: 9,
            letterSpacing: "0.2em",
            color: ev.accent,
            fontFamily: "var(--font-display)",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          {ev.tag}
        </span>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(18px, 2.5vw, 28px)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.2,
            color: "rgba(255,255,255,0.88)",
            marginBottom: 12,
          }}
        >
          {ev.title}
        </h3>

        <p
          style={{
            fontSize: "clamp(13px, 1.1vw, 15px)",
            color: "rgba(255,255,255,0.38)",
            lineHeight: 1.75,
            maxWidth: 480,
          }}
        >
          {ev.desc}
        </p>

        {/* Active pulse for "NOW" */}
        {ev.year === "NOW" && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--color-terminal-green)", boxShadow: "0 0 10px rgba(0,255,65,0.7)", animation: "timeline-pulse 2s ease-in-out infinite" }} />
            <span style={{ fontSize: 9, letterSpacing: "0.28em", color: "rgba(0,255,65,0.6)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
              IN PROGRESS
            </span>
          </div>
        )}
      </motion.div>

      {/* Bottom separator line */}
      {index < events.length - 1 && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "linear-gradient(to right, rgba(255,255,255,0.05), rgba(255,255,255,0.02), transparent)",
          }}
        />
      )}
    </div>
  );
}

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
            borderRadius: 9999,
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: 9,
            letterSpacing: "0.26em",
            color: "rgba(255,255,255,0.35)",
            fontFamily: "var(--font-display)",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Chronicle
        </span>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "rgba(255,255,255,0.88)",
            margin: 0,
          }}
        >
          The build log.
        </h2>
      </motion.div>

      <div>
        {events.map((ev, i) => (
          <TimelineEntry key={`${ev.year}-${i}`} ev={ev} index={i} reduced={reduced} />
        ))}
      </div>
    </section>
  );
}
