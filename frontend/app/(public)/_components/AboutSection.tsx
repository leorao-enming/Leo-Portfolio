"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
  { value: "3rd", label: "Year ChemEng" },
  { value: "2+", label: "Years Quant Research" },
  { value: "6σ", label: "Black Belt Certified" },
  { value: "∞", label: "Systems Built" },
];

function StatCard({
  value,
  label,
  index,
  reduced,
}: {
  value: string;
  label: string;
  index: number;
  reduced: boolean | null;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : index * 0.08, ease }}
      className="bezel-outer"
      style={{ flex: "1 1 120px" }}
    >
      <div
        className="bezel-inner"
        style={{
          padding: "20px 18px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 700,
            color: "var(--color-terminal-green)",
            lineHeight: 1,
            marginBottom: 6,
            textShadow: "0 0 24px rgba(0,255,65,0.3)",
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.35)",
            fontFamily: "var(--font-display)",
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
      </div>
    </motion.div>
  );
}

export function AboutSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="about"
      style={{
        padding: "clamp(80px, 12vw, 160px) clamp(24px, 5vw, 80px)",
        maxWidth: "1280px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "clamp(40px, 6vw, 80px)",
          alignItems: "start",
        }}
        className="md:grid-cols-[1fr_1fr]"
      >
        {/* Left — statement */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduced ? 0 : 0.8, ease }}
            style={{ marginBottom: 20 }}
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
                marginBottom: 28,
              }}
            >
              The System
            </span>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4.5vw, 56px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "var(--color-text-primary)",
                margin: 0,
              }}
            >
              Engineering meets
              <br />
              <span style={{ color: "var(--color-terminal-green)", textShadow: "0 0 40px rgba(0,255,65,0.25)" }}>
                intelligence.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.15, ease }}
          >
            <p
              style={{
                fontSize: "clamp(15px, 1.3vw, 17px)",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.75,
                maxWidth: 440,
                marginBottom: 20,
              }}
            >
              I'm Leo — a Chemical Engineering student at the University of Toronto
              who builds systems at the boundary of science and software.
            </p>
            <p
              style={{
                fontSize: "clamp(15px, 1.3vw, 17px)",
                color: "rgba(255,255,255,0.38)",
                lineHeight: 1.75,
                maxWidth: 440,
                marginBottom: 32,
              }}
            >
              From quant trading engines to AI-powered lab tools, I design precision
              pipelines that turn data and theory into deployable systems.
            </p>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--color-terminal-green)",
                  boxShadow: "0 0 8px rgba(0,255,65,0.6)",
                  animation: "pulse-green 2s ease-in-out infinite",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  letterSpacing: "0.16em",
                  color: "rgba(255,255,255,0.3)",
                  fontFamily: "var(--font-display)",
                  textTransform: "uppercase",
                }}
              >
                University of Toronto · 3T7
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right — stat cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(16px, 2vw, 24px)",
          }}
        >
          <div style={{ display: "flex", gap: "clamp(12px, 2vw, 20px)", flexWrap: "wrap" }}>
            {stats.map((s, i) => (
              <StatCard key={s.value} {...s} index={i} reduced={reduced} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.3, ease }}
            className="bezel-outer"
          >
            <div className="bezel-inner" style={{ padding: "22px 24px" }}>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.24em",
                  color: "rgba(0,255,65,0.5)",
                  fontFamily: "var(--font-mono)",
                  marginBottom: 12,
                  textTransform: "uppercase",
                }}
              >
                Currently
              </div>
              <div
                style={{
                  fontSize: "clamp(13px, 1.2vw, 15px)",
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.7,
                  fontFamily: "var(--font-sans)",
                }}
              >
                Building <span style={{ color: "var(--color-terminal-green)" }}>LQC</span> — a live quant platform
                tracking options flow, earnings catalysts, and market microstructure signals.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
