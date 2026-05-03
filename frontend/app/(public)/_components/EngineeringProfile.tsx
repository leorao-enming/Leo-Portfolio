const ACADEMIC = {
  institution: "University of Toronto",
  program: "Chemical Engineering",
  standing: "3rd Year · Candidate",
  focus: "Process Systems · Thermodynamics · Transport Phenomena",
};

const CERTIFICATIONS = [
  {
    id: "C-01",
    title: "Six Sigma Black Belt",
    body: "CSSBB",
    domain: "Process Optimization · Statistical Control · DMAIC",
    status: "CERTIFIED",
    statusClass: "terminal-text",
  },
];

const TECHNICAL_ARSENAL = [
  { key: "CORE LANG", val: "Pure Python — system architecture, automation pipelines" },
  { key: "WEB LAYER", val: "Next.js 16 · App Router · TypeScript" },
  { key: "API LAYER", val: "FastAPI · RESTful microservices · async/await" },
  { key: "TRADING",   val: "IBKR API — algorithmic order management" },
  { key: "PARADIGM",  val: "Data-driven logic · Signal processing · Automation" },
];

const TECH_KEYWORDS = ["Python", "FastAPI", "Next.js", "TypeScript", "IBKR API"];

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

export function EngineeringProfile() {
  return (
    <section>
      <p className="text-xs tracking-[0.3em] mb-6 text-secondary">
        ── ENGINEERING PROFILE
      </p>

      {/* Three-column grid: Academic / Certifications / Technical */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">

        {/* Academic */}
        <div className="card-surface p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs tracking-widest terminal-cyan">ACADEMIC</span>
            <span className="text-xs dim-label">·</span>
            <span className="text-xs tracking-widest text-zinc-400">ACTIVE</span>
          </div>
          <p className="text-sm font-semibold mb-1 text-white">
            {ACADEMIC.program}
          </p>
          <p className="text-xs mb-3 text-zinc-400">
            {ACADEMIC.institution}
          </p>
          <div
            className="text-xs tracking-[0.15em] px-2 py-1 inline-block mb-3"
            style={{ background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.2)", color: "var(--color-terminal-cyan)" }}
          >
            {ACADEMIC.standing}
          </div>
          <p className="text-xs leading-relaxed text-zinc-300">
            {ACADEMIC.focus}
          </p>
        </div>

        {/* Certifications */}
        <div className="card-surface p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs tracking-widest terminal-amber">CERTIFICATIONS</span>
          </div>
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.id}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold mb-1 text-white">
                    {cert.title}
                  </p>
                  <p className="text-xs font-mono text-zinc-400">
                    {cert.body}
                  </p>
                </div>
                <span className={`text-xs tracking-widest shrink-0 ml-2 ${cert.statusClass}`}>
                  {cert.status}
                </span>
              </div>
              <div
                className="h-px my-3"
                style={{ background: "linear-gradient(to right, rgba(255,176,0,0.3), transparent)" }}
              />
              <p className="text-xs leading-relaxed text-zinc-300">
                {cert.domain}
              </p>
            </div>
          ))}
        </div>

        {/* Technical Arsenal */}
        <div className="card-surface p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs tracking-widest terminal-text">TECHNICAL ARSENAL</span>
          </div>
          <div className="space-y-0">
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
        </div>
      </div>

      {/* Competency bar strip */}
      <div className="card-surface p-4">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {[
            { label: "Process Engineering", color: "terminal-cyan" },
            { label: "Statistical Analysis", color: "terminal-cyan" },
            { label: "Python Automation", color: "terminal-text" },
            { label: "Systems Architecture", color: "terminal-text" },
            { label: "Quant Strategy", color: "terminal-amber" },
            { label: "DMAIC / Six Sigma", color: "terminal-amber" },
            { label: "API Integration", color: "terminal-text" },
            { label: "Next.js / FastAPI", color: "terminal-text" },
          ].map((tag) => (
            <span
              key={tag.label}
              className={`text-xs tracking-wider ${tag.color}`}
              style={{ opacity: 0.8 }}
            >
              #{tag.label.replace(/\s+/g, "_").toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
