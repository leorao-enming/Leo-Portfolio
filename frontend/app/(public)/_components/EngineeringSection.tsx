"use client";

import { motion, useReducedMotion } from "motion/react";
import { TiltCard } from "./TiltCard";
import {
  CAREER_TARGET,
  CERTIFICATIONS,
  COMPETENCIES,
  INTERNSHIP,
  LEVEL_STEPS,
  type Competency,
} from "../../_data/engineering";

const ease = [0.16, 1, 0.3, 1] as const;
const ACCENT = "#c084fc";
const TOTAL_STEPS = 4;

function formatMonth(iso: string): string {
  const [year, month] = iso.split("-");
  const names = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${names[Number(month) - 1]} ${year}`;
}

/** A four-step meter. Honest levels beat flattering ones on a portfolio. */
function LevelMeter({ level }: { level: Competency["level"] }) {
  const filled = LEVEL_STEPS[level];
  return (
    <span
      style={{ display: "inline-flex", gap: 3, alignItems: "center" }}
      role="img"
      aria-label={`${level} — ${filled} of ${TOTAL_STEPS}`}
    >
      {Array.from({ length: TOTAL_STEPS }, (_, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            width: 14,
            height: 3,
            borderRadius: 2,
            background: i < filled ? ACCENT : "rgba(255,255,255,0.09)",
            boxShadow: i < filled ? `0 0 6px ${ACCENT}55` : "none",
          }}
        />
      ))}
    </span>
  );
}

export function EngineeringSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="engineering"
      style={{
        padding: "clamp(80px, 12vw, 160px) clamp(24px, 5vw, 80px)",
        maxWidth: "1280px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* ── Section header ──────────────────────────────────────── */}
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
            fontSize: 10,
            letterSpacing: "0.24em",
            color: "rgba(255,255,255,0.4)",
            fontFamily: "var(--font-display)",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Process Engineering
        </span>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "var(--color-text-primary)",
            margin: "0 0 18px",
          }}
        >
          The other half of the stack.
        </h2>
        <p
          style={{
            fontSize: "clamp(14px, 1.2vw, 16px)",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.7,
            maxWidth: "56ch",
            margin: 0,
          }}
        >
          Chemical engineering is the degree and the destination — software is how I
          make it measurable. Below is where that half actually stands today, graded
          honestly rather than generously.
        </p>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "clamp(16px, 2vw, 24px)",
        }}
        className="lg:grid-cols-[1.15fr_1fr]"
      >
        {/* ── Internship ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: reduced ? 0 : 0.8, ease }}
        >
          <TiltCard intensity={5} className="bezel-outer" style={{ height: "100%" }}>
            <div
              className="bezel-inner"
              style={{
                padding: "clamp(24px, 3.5vw, 38px)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 240,
                  height: 240,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${ACCENT}14 0%, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 12,
                  flexWrap: "wrap",
                  marginBottom: 20,
                }}
              >
                <span
                  style={{
                    padding: "3px 10px",
                    borderRadius: "9999px",
                    border: `1px solid ${ACCENT}33`,
                    background: `${ACCENT}0d`,
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    color: ACCENT,
                    fontFamily: "var(--font-display)",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  Internship
                </span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    color: "rgba(0,255,65,0.6)",
                    fontFamily: "var(--font-mono)",
                    textTransform: "uppercase",
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "var(--color-terminal-green)",
                      boxShadow: "0 0 6px rgba(0,255,65,0.6)",
                    }}
                  />
                  {formatMonth(INTERNSHIP.startDate)} — Present
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(19px, 2.4vw, 26px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  color: "var(--color-text-primary)",
                  marginBottom: 6,
                }}
              >
                {INTERNSHIP.company}
              </h3>
              <p
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.32)",
                  fontFamily: "var(--font-mono)",
                  marginBottom: 4,
                }}
              >
                {INTERNSHIP.companyLocal}
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: ACCENT,
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.02em",
                  marginBottom: 18,
                }}
              >
                {INTERNSHIP.department} Department
              </p>

              <p
                style={{
                  fontSize: "clamp(13px, 1.1vw, 15px)",
                  color: "rgba(255,255,255,0.48)",
                  lineHeight: 1.7,
                  marginBottom: 24,
                }}
              >
                {INTERNSHIP.summary}
              </p>

              <p
                style={{
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  color: "rgba(255,255,255,0.3)",
                  fontFamily: "var(--font-display)",
                  textTransform: "uppercase",
                  marginBottom: 12,
                  marginTop: "auto",
                }}
              >
                Focus areas
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 8px" }}>
                {INTERNSHIP.focusAreas.map((area) => (
                  <span
                    key={area}
                    style={{
                      padding: "4px 10px",
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.035)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      fontSize: 11,
                      color: "rgba(255,255,255,0.5)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* ── Competency matrix + trajectory ───────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(16px, 2vw, 24px)",
            alignContent: "start",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.1, ease }}
          >
            <TiltCard intensity={5} className="bezel-outer">
              <div
                className="bezel-inner"
                style={{ padding: "clamp(22px, 3vw, 30px)" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: 12,
                    flexWrap: "wrap",
                    marginBottom: 20,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(15px, 1.7vw, 19px)",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      color: "var(--color-text-primary)",
                      margin: 0,
                    }}
                  >
                    Competency matrix
                  </h3>
                  <span
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      color: "rgba(255,255,255,0.28)",
                      fontFamily: "var(--font-mono)",
                      textTransform: "uppercase",
                    }}
                  >
                    Self-assessed
                  </span>
                </div>

                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {COMPETENCIES.map((c, i) => (
                    <li
                      key={c.name}
                      style={{
                        paddingTop: i === 0 ? 0 : 14,
                        paddingBottom: i === COMPETENCIES.length - 1 ? 0 : 14,
                        borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.055)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 12,
                          marginBottom: 5,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 13,
                            color: "rgba(255,255,255,0.82)",
                            fontFamily: "var(--font-display)",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {c.name}
                        </span>
                        <LevelMeter level={c.level} />
                      </div>
                      <p
                        style={{
                          fontSize: 11,
                          color: "rgba(255,255,255,0.34)",
                          fontFamily: "var(--font-mono)",
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {c.evidence}
                        <span style={{ color: "rgba(255,255,255,0.18)" }}> → </span>
                        <span style={{ color: ACCENT, opacity: 0.75 }}>{c.nextStep}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.18, ease }}
          >
            <TiltCard intensity={5} className="bezel-outer">
              <div
                className="bezel-inner"
                style={{ padding: "clamp(22px, 3vw, 30px)" }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(15px, 1.7vw, 19px)",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    color: "var(--color-text-primary)",
                    margin: "0 0 18px",
                  }}
                >
                  Trajectory
                </h3>

                {CERTIFICATIONS.map((cert) => (
                  <div key={cert.name} style={{ marginBottom: 18 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        gap: 10,
                        marginBottom: 3,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 13,
                          color: "rgba(255,255,255,0.82)",
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        {cert.name}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: ACCENT,
                          fontFamily: "var(--font-mono)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {cert.target}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.34)",
                        fontFamily: "var(--font-mono)",
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {cert.body} — {cert.rationale}
                    </p>
                  </div>
                ))}

                <div
                  style={{
                    paddingTop: 16,
                    borderTop: "1px solid rgba(255,255,255,0.055)",
                  }}
                >
                  <p
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      color: "rgba(255,255,255,0.3)",
                      fontFamily: "var(--font-display)",
                      textTransform: "uppercase",
                      marginBottom: 10,
                    }}
                  >
                    Target roles — class of {CAREER_TARGET.graduationYear}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 8px" }}>
                    {CAREER_TARGET.roleFamilies.map((role) => (
                      <span
                        key={role}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "9999px",
                          background: `${ACCENT}0c`,
                          border: `1px solid ${ACCENT}25`,
                          fontSize: 11,
                          color: ACCENT,
                          fontFamily: "var(--font-display)",
                          opacity: 0.85,
                        }}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
