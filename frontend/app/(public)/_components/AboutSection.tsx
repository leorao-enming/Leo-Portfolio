"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useInView } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
  { raw: 3,   display: (n: number) => `${n}rd`, label: "Year ChemEng",      accent: "#60a5fa" },
  { raw: 1,   display: () => `1st`,    label: "Industry Internship", accent: "var(--color-accent)" },
  { raw: 6,   display: () => `6σ`,     label: "Black Belt",        accent: "#c084fc" },
  { raw: 100, display: () => `∞`,      label: "Systems Mindset",   accent: "#fb923c" },
];

function StatCard({ stat, inView, index, reduced }: { stat: typeof stats[0]; inView: boolean; index: number; reduced: boolean | null }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: reduced ? 0 : 0.65, delay: reduced ? 0 : index * 0.07, ease }}
      className="bezel-outer"
      style={{ flex: "1 1 110px" }}
    >
      <div className="bezel-inner" style={{ padding: "18px 14px", textAlign: "center" }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(26px, 4vw, 40px)",
            fontWeight: 800,
            color: stat.accent,
            lineHeight: 1,
            marginBottom: 6,
            textShadow: `0 0 24px ${stat.accent}55`,
            letterSpacing: "-0.02em",
          }}
        >
          {stat.display(stat.raw)}
        </div>
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "var(--text-muted)",
            fontFamily: "var(--font-display)",
            textTransform: "uppercase",
          }}
        >
          {stat.label}
        </div>
      </div>
    </motion.div>
  );
}

export function AboutSection() {
  const reduced = useReducedMotion();
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <section
      id="about"
      className="section-shell"
    >
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(40px, 6vw, 80px)", alignItems: "start" }}
        className="md:grid-cols-[1fr_1fr]"
      >
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduced ? 0 : 0.8, ease }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "4px 12px",
                borderRadius: 9999,
                border: "1px solid rgba(255,255,255,0.1)",
                fontSize: 11,
                letterSpacing: "0.26em",
                color: "var(--text-muted)",
                fontFamily: "var(--font-display)",
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              The System
            </span>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4.5vw, 56px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "rgba(255,255,255,0.9)",
                marginBottom: 20,
              }}
            >
              Engineering meets{" "}
              <span style={{ color: "var(--color-accent)", textShadow: "0 0 40px rgba(255,122,24,0.22)" }}>
                intelligence.
              </span>
            </h1>

            <p style={{ fontSize: "clamp(14px, 1.2vw, 16px)", color: "var(--text-body)", lineHeight: 1.78, maxWidth: 420, marginBottom: 16 }}>
              I&apos;m Leo — a Chemical Engineering student at the University of Toronto who builds systems at the boundary of science and software.
            </p>
            <p style={{ fontSize: "clamp(14px, 1.2vw, 16px)", color: "var(--text-muted)", lineHeight: 1.78, maxWidth: 420, marginBottom: 28 }}>
              From plant-floor process control to AI-powered lab tools, I design precision pipelines that turn data and theory into deployable systems.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--color-accent)", boxShadow: "0 0 8px rgba(255,122,24,0.6)", animation: "pulse-green 2s ease-in-out infinite" }} />
              <span style={{ fontSize: 11, letterSpacing: "0.22em", color: "var(--text-muted)", fontFamily: "var(--font-display)", textTransform: "uppercase" }}>
                University of Toronto · 3T7
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 2vw, 20px)" }}>
          {/* Stats row */}
          <div ref={statsRef} style={{ display: "flex", gap: "clamp(10px, 1.5vw, 16px)", flexWrap: "wrap" }}>
            {stats.map((s, i) => (
              <StatCard key={s.label} stat={s} inView={statsInView} index={i} reduced={reduced} />
            ))}
          </div>

          {/* Currently building card */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.28, ease }}
            className="bezel-outer"
          >
            <div className="bezel-inner" style={{ padding: "20px 22px" }}>
              <div style={{ fontSize: 11, letterSpacing: "0.22em", color: "rgba(255,122,24,0.85)", fontFamily: "var(--font-mono)", marginBottom: 10, textTransform: "uppercase" }}>
                Currently Building
              </div>
              <div style={{ fontSize: "clamp(13px, 1.1vw, 15px)", color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
                <span style={{ color: "var(--color-accent)", fontWeight: 600 }}>Half-Life</span> — an iOS app modelling caffeine intake against sleep timing as first-order decay. Signed 1.0.4 release archive is built; device acceptance and TestFlight are the open items.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
