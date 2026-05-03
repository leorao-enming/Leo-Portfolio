import Link from "next/link";
import { PhilosophyCard } from "./_components/PhilosophyCard";
import { HalfLifeSimulator } from "./_components/HalfLifeSimulator";
import { QuantEngineWidget } from "./_components/QuantEngineWidget";

const SYSTEMS = [
  {
    id: "01",
    label: "QUANT ENGINE",
    description: "Systematic trading infrastructure. Algorithmic execution, signal processing, and portfolio analytics.",
    href: "/dashboard/quant",
    status: "ACTIVE",
    statusClass: "terminal-text",
    dotClass: "status-dot-online",
    accent: "rgba(0,255,65,0.06)",
    accentBorder: "rgba(0,255,65,0.22)",
  },
  {
    id: "02",
    label: "BIO-METRICS",
    description: "Metabolic half-life modeling. Training load optimization and physiological decay functions.",
    href: "/dashboard/biometrics",
    status: "ACTIVE",
    statusClass: "terminal-text",
    dotClass: "status-dot-online",
    accent: "rgba(0,255,65,0.06)",
    accentBorder: "rgba(0,255,65,0.22)",
  },
  {
    id: "03",
    label: "METHODOLOGY",
    description: "Engineering principles, decision frameworks, and operational protocols.",
    href: "/methodology",
    status: "PUBLIC",
    statusClass: "terminal-cyan",
    dotClass: "status-dot-idle",
    accent: "rgba(0,212,255,0.05)",
    accentBorder: "rgba(0,212,255,0.2)",
  },
  {
    id: "04",
    label: "TECHNICAL LOGS",
    description: "System logs, build journals, and post-mortems. Documented engineering process.",
    href: "/logs",
    status: "PUBLIC",
    statusClass: "terminal-cyan",
    dotClass: "status-dot-idle",
    accent: "rgba(0,212,255,0.05)",
    accentBorder: "rgba(0,212,255,0.2)",
  },
];

const STACK = [
  { key: "KERNEL",  val: "Next.js 16 · App Router",        accent: false },
  { key: "TYPES",   val: "TypeScript 5",                    accent: true  },
  { key: "STYLES",  val: "Tailwind CSS 4",                  accent: false },
  { key: "API",     val: "FastAPI · RESTful",               accent: true  },
  { key: "AUTH",    val: "Cookie-based · Middleware guard", accent: false },
  { key: "STATUS",  val: "OPERATIONAL",                     accent: false },
];

const TECHNICAL_ARSENAL = [
  { key: "CORE LANG", val: "Pure Python — system architecture, automation pipelines" },
  { key: "WEB LAYER", val: "Next.js 16 · App Router · TypeScript" },
  { key: "API LAYER", val: "FastAPI · RESTful microservices · async/await" },
  { key: "TRADING",   val: "IBKR API — algorithmic order management" },
  { key: "PARADIGM",  val: "Data-driven logic · Signal processing · Automation" },
];

const TECH_KEYWORDS = ["Python", "FastAPI", "Next.js", "TypeScript", "IBKR API", "asyncio"];

function HighlightTech({ text }: { text: string }) {
  const regex = new RegExp(`(${TECH_KEYWORDS.join("|")})`, "g");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        TECH_KEYWORDS.includes(part) ? (
          <span key={i} className="tech-accent">{part}</span>
        ) : (
          part
        )
      )}
    </>
  );
}

const COMPETENCY_TAGS = [
  { label: "Process Engineering",   color: "terminal-cyan" },
  { label: "Statistical Analysis",  color: "terminal-cyan" },
  { label: "Python Automation",     color: "terminal-text" },
  { label: "Systems Architecture",  color: "terminal-text" },
  { label: "Quant Strategy",        color: "terminal-amber" },
  { label: "DMAIC / Six Sigma",     color: "terminal-amber" },
  { label: "API Integration",       color: "terminal-text" },
  { label: "Next.js / FastAPI",     color: "terminal-text" },
];


/* ─── Reusable bento card wrapper ─────────────────────────────────── */
function BentoCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border p-8 rounded-sm flex flex-col ${className}`}
      style={{
        background: "rgba(24,24,27,0.7)",
        borderColor: "#3f3f46",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 2px 8px rgba(0,0,0,0.5)",
      }}
    >
      {children}
    </div>
  );
}

/* ─── Active system card — slightly elevated visual presence ───────── */
function ActiveBentoCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border p-6 rounded-sm flex flex-col ${className}`}
      style={{
        background: "rgba(16,16,18,0.9)",
        borderColor: "#52525b",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 12px rgba(0,0,0,0.6), 0 0 28px rgba(0,255,65,0.035)",
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs tracking-[0.3em] mb-5 text-secondary">
      ── {children}
    </p>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  return (
    <div className="py-12">

      {/* Boot tag — intentionally watermark-level */}
      <p className="text-xs tracking-[0.35em] mb-8 dim-label">
        SYSTEM BOOT — v0.1.0 &nbsp;·&nbsp; LEOLOGIC OS &nbsp;·&nbsp; ALL SYSTEMS NOMINAL
      </p>

      {/* ═══════════════════ BENTO GRID ═══════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* ── [A] IDENTITY / HERO — 2 cols × 2 rows ── */}
        <BentoCard className="lg:col-span-2 lg:row-span-2 justify-between min-h-[420px]">
          <div>
            <SectionLabel>IDENTITY</SectionLabel>
            <h1
              className="font-bold tracking-tight leading-none mb-4 text-white"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              SYSTEMS &amp;
              <br />
              <span className="terminal-text">PROCESS</span>
              <br />
              ENGINEER
            </h1>
            <p className="text-sm leading-relaxed mb-6 text-zinc-200" style={{ maxWidth: "44ch" }}>
              Chemical engineering foundations fused with computational precision.
              Pure-<span className="tech-accent">Python</span> systems, quantitative trading engines, and data pipelines
              that convert complex process logic into reliable, automated execution.
            </p>

            {/* Discipline badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { label: "DATA-DRIVEN LOGIC",  bg: "rgba(0,255,65,0.07)",   border: "rgba(0,255,65,0.22)",   cls: "terminal-text" },
                { label: "PYTHON AUTOMATION",  bg: "rgba(0,212,255,0.07)",  border: "rgba(0,212,255,0.22)",  cls: "terminal-cyan" },
                { label: "SIX SIGMA BB",       bg: "rgba(255,176,0,0.07)",  border: "rgba(255,176,0,0.22)",  cls: "terminal-amber" },
              ].map(({ label, bg, border, cls }) => (
                <span
                  key={label}
                  className={`text-xs tracking-[0.2em] px-3 py-1.5 ${cls}`}
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs pinned to bottom */}
          <div className="flex flex-col sm:flex-row items-start gap-3 pt-4" style={{ borderTop: "1px solid #27272a" }}>
            <Link
              href="/dashboard"
              className="terminal-text border text-xs tracking-[0.2em] px-5 py-2.5 hover:opacity-80 transition-opacity"
              style={{ borderColor: "var(--color-terminal-green)" }}
            >
              LAUNCH COMMAND CENTER →
            </Link>
            <Link
              href="#"
              className="text-xs tracking-[0.2em] px-5 py-2.5 text-zinc-400 transition-colors cursor-not-allowed opacity-50"
              style={{ border: "1px solid #3f3f46" }}
            >
              READ TECHNICAL LOGS
            </Link>
          </div>
        </BentoCard>

        {/* ── [B] ACADEMIC — 1 col × 1 row ── */}
        <BentoCard>
          <SectionLabel>ACADEMIC</SectionLabel>
          <div className="flex items-center gap-2 mb-4">
            <span className="terminal-cyan text-xs tracking-widest">ACTIVE</span>
          </div>
          <p className="text-base font-semibold mb-1 text-white">
            Chemical Engineering
          </p>
          <p className="text-xs mb-4 text-zinc-400">
            University of Toronto
          </p>
          <div
            className="text-xs tracking-[0.15em] px-2 py-1 inline-block mb-4"
            style={{ background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.2)", color: "var(--color-terminal-cyan)" }}
          >
            3rd Year · Candidate
          </div>
          <p className="text-xs leading-relaxed mt-auto text-zinc-300">
            Process Systems · Thermodynamics · Transport Phenomena
          </p>
        </BentoCard>

        {/* ── [C] SYSTEM MANIFEST — 1 col × 1 row ── */}
        <BentoCard>
          <SectionLabel>SYSTEM MANIFEST</SectionLabel>
          <div className="font-mono text-xs flex-1">
            {STACK.map((item, i) => (
              <div
                key={i}
                className="flex gap-3 py-2"
                style={{ borderBottom: i < STACK.length - 1 ? "1px solid #27272a" : "none" }}
              >
                <span className="w-16 shrink-0 tracking-wider text-zinc-500">
                  {item.key}
                </span>
                <span
                  className={item.key === "STATUS" ? "terminal-text" : item.accent ? "tech-accent" : "text-zinc-200"}
                >
                  {item.val}
                </span>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* ── [D] CERTIFICATIONS — 1 col × 1 row (row 2, col 3) ── */}
        <BentoCard>
          <SectionLabel>CERTIFICATIONS</SectionLabel>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-base font-semibold mb-1 text-white">
                Six Sigma Black Belt
              </p>
              <p className="text-xs font-mono mb-1 text-zinc-400">CSSBB</p>
            </div>
            <span className="text-xs tracking-widest terminal-text shrink-0 ml-2">CERTIFIED</span>
          </div>
          <div
            className="h-px mb-4"
            style={{ background: "linear-gradient(to right, rgba(255,176,0,0.35), transparent)" }}
          />
          <p className="text-xs leading-relaxed text-zinc-300">
            Process Optimization · Statistical Control · DMAIC
          </p>
          <div className="mt-auto pt-4">
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {["DMAIC", "SPC", "DOE", "MSA", "FMEA"].map((tool) => (
                <span key={tool} className="text-xs font-mono terminal-amber" style={{ opacity: 0.75 }}>
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </BentoCard>

        {/* ── [E] TECHNICAL ARSENAL — 1 col × 1 row (row 2, col 4) ── */}
        <BentoCard>
          <SectionLabel>TECHNICAL ARSENAL</SectionLabel>
          <div className="space-y-0 flex-1">
            {TECHNICAL_ARSENAL.map((item, i) => (
              <div
                key={i}
                className="py-2 flex flex-col gap-0.5"
                style={{ borderBottom: i < TECHNICAL_ARSENAL.length - 1 ? "1px solid #27272a" : "none" }}
              >
                <span className="text-xs tracking-wider text-zinc-500">
                  {item.key}
                </span>
                <span className="text-xs leading-relaxed text-zinc-200">
                  <HighlightTech text={item.val} />
                </span>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* ── [F] REGISTERED SUBSYSTEMS — 2 cols × 1 row ── */}
        <BentoCard className="lg:col-span-2">
          <SectionLabel>REGISTERED SUBSYSTEMS</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
            {SYSTEMS.map((sys) => (
              <Link
                key={sys.id}
                href={sys.href}
                className="group flex flex-col p-4 transition-all duration-200"
                style={{
                  background: sys.accent,
                  border: `1px solid ${sys.accentBorder}`,
                  textDecoration: "none",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono dim-label">[{sys.id}]</span>
                    <span className="text-xs font-semibold tracking-wider text-zinc-100">
                      {sys.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`status-dot ${sys.dotClass}`} />
                    <span className={`text-xs tracking-widest ${sys.statusClass}`}>{sys.status}</span>
                  </div>
                </div>
                <p className="text-xs leading-relaxed flex-1 text-zinc-300">
                  {sys.description}
                </p>
                <div className="mt-3 text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity terminal-text">
                  OPEN SUBSYSTEM →
                </div>
              </Link>
            ))}
          </div>
        </BentoCard>

        {/* ── [G] PHILOSOPHY CARD — 2 cols × 1 row ── */}
        <BentoCard className="lg:col-span-2">
          <PhilosophyCard />
        </BentoCard>

        {/* ── [H] HALF-LIFE SIMULATOR — 2 cols × 1 row ── */}
        <ActiveBentoCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-1">
            <SectionLabel>BIO-METRICS · LIVE SIMULATOR</SectionLabel>
            <div className="flex items-center gap-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
              <span className="text-[10px] tracking-[0.25em] text-green-400 font-mono">ONLINE</span>
            </div>
          </div>
          <HalfLifeSimulator />
        </ActiveBentoCard>

        {/* ── [I] QUANT ENGINE STATUS — 2 cols × 1 row ── */}
        <ActiveBentoCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-1">
            <SectionLabel>LEOLOGIC QUANTITATIVE CORE</SectionLabel>
            <div className="flex items-center gap-1.5 mb-5">
              <span className="text-[10px] tracking-[0.2em] text-zinc-500 font-mono">ARCH ONLY</span>
            </div>
          </div>
          <QuantEngineWidget />
        </ActiveBentoCard>

        {/* ── [J] COMPETENCY TAGS — full width 4 cols ── */}
        <BentoCard className="lg:col-span-4">
          <SectionLabel>COMPETENCY MAP</SectionLabel>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {COMPETENCY_TAGS.map((tag) => (
              <span
                key={tag.label}
                className={`text-xs tracking-wider ${tag.color}`}
                style={{ opacity: 0.8 }}
              >
                #{tag.label.replace(/\s+/g, "_").toUpperCase()}
              </span>
            ))}
          </div>
        </BentoCard>

      </div>
      {/* ═══════════════════ END BENTO GRID ═══════════════════ */}

      {/* Terminal prompt — decorative watermark */}
      <div className="mt-12 pt-6" style={{ borderTop: "1px solid #1a1a1a" }}>
        <p className="text-xs font-mono dim-label">
          <span>leologic@sys</span>
          <span className="mx-1" style={{ color: "#3f3f46" }}>~</span>
          <span className="cursor-blink" />
        </p>
      </div>
    </div>
  );
}
