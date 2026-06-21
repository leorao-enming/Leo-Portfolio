"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

/* ── Count-up hook (exebenus-style) ─────────────────────────────── */
function useCountUp(target: number, inView: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    let raf: number;
    const tick = () => {
      const t = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return val;
}

const stats = [
  { raw: 3,   display: (n: number) => `${n}rd`, label: "Year ChemEng",      accent: "#60a5fa" },
  { raw: 2,   display: (n: number) => `${n}+`,  label: "Yrs Quant Res.",    accent: "var(--color-terminal-green)" },
  { raw: 6,   display: (n: number) => `6σ`,     label: "Black Belt",        accent: "#c084fc" },
  { raw: 100, display: (n: number) => `∞`,      label: "Systems Mindset",   accent: "#fb923c" },
];

function StatCard({ stat, inView, index, reduced }: { stat: typeof stats[0]; inView: boolean; index: number; reduced: boolean | null }) {
  const count = useCountUp(stat.raw, inView && !reduced);
  const displayed = reduced ? stat.display(stat.raw) : (inView ? stat.display(count) : "0");

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
          {displayed}
        </div>
        <div
          style={{
            fontSize: 9,
            letterSpacing: "0.22em",
            color: "rgba(255,255,255,0.3)",
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
      style={{
        padding: "clamp(80px, 12vw, 160px) clamp(24px, 5vw, 80px)",
        maxWidth: "1280px",
        margin: "0 auto",
        width: "100%",
      }}
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
                fontSize: 9,
                letterSpacing: "0.26em",
                color: "rgba(255,255,255,0.35)",
                fontFamily: "var(--font-display)",
                textTransform: "uppercase",
                marginBottom: 24,
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
                color: "rgba(255,255,255,0.9)",
                marginBottom: 20,
              }}
            >
              Engineering meets{" "}
              <span style={{ color: "var(--color-terminal-green)", textShadow: "0 0 40px rgba(0,255,65,0.22)" }}>
                intelligence.
              </span>
            </h2>

            <p style={{ fontSize: "clamp(14px, 1.2vw, 16px)", color: "rgba(255,255,255,0.45)", lineHeight: 1.78, maxWidth: 420, marginBottom: 16 }}>
              I'm Leo — a Chemical Engineering student at the University of Toronto who builds systems at the boundary of science and software.
            </p>
            <p style={{ fontSize: "clamp(14px, 1.2vw, 16px)", color: "rgba(255,255,255,0.3)", lineHeight: 1.78, maxWidth: 420, marginBottom: 28 }}>
              From quant trading engines to AI-powered lab tools, I design precision pipelines that turn data and theory into deployable systems.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--color-terminal-green)", boxShadow: "0 0 8px rgba(0,255,65,0.6)", animation: "pulse-green 2s ease-in-out infinite" }} />
              <span style={{ fontSize: 9, letterSpacing: "0.22em", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-display)", textTransform: "uppercase" }}>
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
              <div style={{ fontSize: 8.5, letterSpacing: "0.28em", color: "rgba(0,255,65,0.45)", fontFamily: "var(--font-mono)", marginBottom: 10, textTransform: "uppercase" }}>
                Currently Building
              </div>
              <div style={{ fontSize: "clamp(13px, 1.1vw, 15px)", color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
                <span style={{ color: "var(--color-terminal-green)", fontWeight: 600 }}>LQC</span> — a live quant platform tracking options flow, earnings catalysts, and market microstructure signals.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
