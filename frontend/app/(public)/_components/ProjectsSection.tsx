"use client";

import { motion, useReducedMotion } from "motion/react";
import { TiltCard } from "./TiltCard";

const ease = [0.16, 1, 0.3, 1] as const;

const projects = [
  {
    id: "lqc",
    tag: "Flagship",
    name: "LQC — Live Quant Center",
    desc: "Real-time options flow analysis, earnings catalyst tracking, and market microstructure signals. Built on Next.js with a Python FastAPI backend and live WebSocket feeds.",
    stack: ["Next.js", "FastAPI", "Python", "WebSocket"],
    status: "In Development",
    accent: "var(--color-terminal-green)",
    featured: true,
  },
  {
    id: "leologic-os",
    tag: "System",
    name: "LeoLogic OS",
    desc: "Personal operating system: biometrics dashboard, quant engine, and AI command center in one unified interface.",
    stack: ["Next.js", "Supabase", "Tailwind"],
    status: "Active",
    accent: "#60a5fa",
    featured: false,
  },
  {
    id: "chem-sim",
    tag: "Research",
    name: "ChemSim Agent",
    desc: "AI agent for chemical process simulation and optimization. Automates HYSYS workflows using Python scripting and LLM reasoning.",
    stack: ["Python", "GPT-4", "HYSYS COM"],
    status: "Prototype",
    accent: "#c084fc",
    featured: false,
  },
];

function ProjectTag({ label, accent }: { label: string; accent: string }) {
  return (
    <span
      style={{
        padding: "3px 10px",
        borderRadius: "9999px",
        border: `1px solid ${accent}33`,
        background: `${accent}0d`,
        fontSize: 10,
        letterSpacing: "0.18em",
        color: accent,
        fontFamily: "var(--font-display)",
        textTransform: "uppercase",
        fontWeight: 500,
      }}
    >
      {label}
    </span>
  );
}

function FeaturedCard({ project, reduced }: { project: typeof projects[0]; reduced: boolean | null }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: reduced ? 0 : 0.9, ease }}
    >
      <TiltCard intensity={6} className="bezel-outer" style={{ height: "100%" }}>
        <div
          className="bezel-inner"
          style={{
            padding: "clamp(28px, 4vw, 44px)",
            minHeight: 380,
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle bg glow */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: -40,
              right: -40,
              width: 280,
              height: 280,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,255,65,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, gap: 12, flexWrap: "wrap" }}>
            <ProjectTag label={project.tag} accent={project.accent} />
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.2em",
                color: "rgba(0,255,65,0.6)",
                fontFamily: "var(--font-mono)",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "var(--color-terminal-green)",
                  boxShadow: "0 0 6px rgba(0,255,65,0.6)",
                  animation: "pulse-green 2s ease-in-out infinite",
                }}
              />
              {project.status}
            </span>
          </div>

          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(24px, 3.5vw, 38px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: "var(--color-text-primary)",
              marginBottom: 16,
            }}
          >
            {project.name}
          </h3>

          <p
            style={{
              fontSize: "clamp(14px, 1.2vw, 16px)",
              color: "rgba(255,255,255,0.48)",
              lineHeight: 1.7,
              marginBottom: "auto",
              paddingBottom: 28,
            }}
          >
            {project.desc}
          </p>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: "auto" }}>
            {project.stack.map(s => (
              <span
                key={s}
                style={{
                  padding: "4px 10px",
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

function SmallCard({
  project,
  index,
  reduced,
}: {
  project: typeof projects[0];
  index: number;
  reduced: boolean | null;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : index * 0.1, ease }}
    >
      <TiltCard intensity={8} className="bezel-outer" style={{ height: "100%" }}>
        <div
          className="bezel-inner"
          style={{
            padding: "24px 24px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            minHeight: 200,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <ProjectTag label={project.tag} accent={project.accent} />
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: project.accent,
                opacity: 0.6,
              }}
            />
          </div>

          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(16px, 1.8vw, 21px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
              color: "var(--color-text-primary)",
              marginBottom: 10,
            }}
          >
            {project.name}
          </h3>

          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.65,
              marginBottom: "auto",
              paddingBottom: 16,
            }}
          >
            {project.desc}
          </p>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: "auto" }}>
            {project.stack.slice(0, 3).map(s => (
              <span
                key={s}
                style={{
                  padding: "3px 8px",
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  fontSize: 10,
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export function ProjectsSection() {
  const reduced = useReducedMotion();
  const [featured, ...rest] = projects;

  return (
    <section
      id="projects"
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
          Featured Work
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
          Systems that ship.
        </h2>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "clamp(16px, 2vw, 24px)",
        }}
        className="lg:grid-cols-[1.6fr_1fr]"
      >
        <FeaturedCard project={featured} reduced={reduced} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(16px, 2vw, 24px)",
          }}
          className="sm:grid-cols-2 lg:grid-cols-1"
        >
          {rest.map((p, i) => (
            <SmallCard key={p.id} project={p} index={i} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  );
}
