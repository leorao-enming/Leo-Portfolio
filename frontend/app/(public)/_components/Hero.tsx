"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";

/* ── Magnetic CTA button ─────────────────────────────────────────── */
function MagneticBtn({
  children,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "ghost";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  /* Genuinely pointer-position-driven, so it stays in JS — but the global
     CSS killswitch cannot reach a transform written per event, so honour
     reduced motion explicitly here. */
  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduced) return;
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width  / 2) * 0.28;
    const y = (e.clientY - r.top  - r.height / 2) * 0.28;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };

  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "13px 26px",
    minHeight: 44, /* comfortable touch target on mobile */
    borderRadius: 9999,
    fontFamily: "var(--font-display)",
    fontWeight: 500,
    fontSize: 13,
    letterSpacing: "0.04em",
    textDecoration: "none",
    transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.2s, box-shadow 0.2s",
    willChange: "transform",
    cursor: "pointer",
  };

  if (variant === "primary") {
    return (
      <a ref={ref} href={href} style={{ ...base, background: "var(--color-accent)", color: "#050507", fontWeight: 600, boxShadow: "0 0 28px rgba(255,122,24,0.22)" }} onMouseMove={onMove} onMouseLeave={onLeave}>
        {children}
        <span style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>→</span>
      </a>
    );
  }

  return (
    <a ref={ref} href={href} style={{ ...base, background: "transparent", color: "rgba(10, 12, 15,0.6)", border: "1px solid rgba(10, 12, 15,0.14)" }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
      <span style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(10, 12, 15,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>↗</span>
    </a>
  );
}

/* ── Hero ───────────────────────────────────────────────────────── */
export function Hero() {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  /* Scroll-LINKED, not time-linked. The rest of this page animates with
     whileInView: a one-shot fade that fires once and is finished, with no
     further relationship to the scroll. Tying transforms to scroll position
     instead means the hero keeps responding continuously while it leaves —
     which is the actual mechanism behind the feel being asked for here.

     "start start" -> "end start": progress runs 0 to 1 over exactly the
     stretch where the hero travels from filling the viewport to fully
     above it. */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  /* Springing the input is what stops this reading as a stiff scrubber.
     Position still maps 1:1 to scroll; it just settles rather than snaps. */
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    restDelta: 0.001,
  });

  /* Three layers at three rates. Depth comes from the difference between
     them, not from any one being dramatic: the field drifts down slowly,
     the content lifts away faster, and it fades before it would collide
     with the section beneath. */
  const fieldY = useTransform(progress, [0, 1], ["0%", "18%"]);
  const fieldOpacity = useTransform(progress, [0, 0.9], [1, 0.25]);
  const contentY = useTransform(progress, [0, 1], ["0%", "-24%"]);
  const contentOpacity = useTransform(progress, [0, 0.65], [1, 0]);

  /* Reduced motion: no parallax, no fade-on-exit. Everything stays put and
     fully legible — the CSS killswitch cannot reach transforms written from
     motion values, so this has to be handled here. */
  const fieldStyle = reduced ? undefined : { y: fieldY, opacity: fieldOpacity };
  const contentStyle = reduced ? undefined : { y: contentY, opacity: contentOpacity };

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
        background: "var(--color-bg)",
      }}
    >
      {/* ── Generative process-flow field ──────────────────────────
          Streamlines and instrumentation nodes, not decoration for its
          own sake — flow + measurement is literally the subject matter.
          Pure SVG math, static (no client JS), so it costs nothing and
          is reduced-motion-safe by construction. Replaces a dark
          "cinematic" gradient tuned for the old near-black ground. */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-10% 0",
          background:
            "radial-gradient(ellipse 70% 60% at 18% 28%, rgba(255,122,24,0.045) 0%, transparent 60%)," +
            "radial-gradient(ellipse 60% 55% at 86% 74%, rgba(3,105,161,0.03) 0%, transparent 55%)",
          pointerEvents: "none",
          zIndex: 1,
          willChange: "transform",
          ...fieldStyle,
        }}
      >
        <svg
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%" }}
        >
          <g fill="none" strokeWidth="1.2">
            <path d="M -50,50  C 380,86  660,14  900,70  S 1280,10  1650,60"  stroke="rgba(10,12,15,0.09)" />
            <path d="M -50,112 C 420,166 680,58  920,140 S 1310,64  1650,124" stroke="rgba(10,12,15,0.07)" />
            <path d="M -50,178 C 360,206 640,150 900,190 S 1260,148 1650,182" stroke="var(--color-accent)" strokeOpacity="0.22" strokeWidth="1.4" />
            <path d="M -50,240 C 440,302 700,178 930,268 S 1330,182 1650,254" stroke="rgba(10,12,15,0.08)" />
            <path d="M -50,305 C 390,345 650,265 900,325 S 1290,263 1650,315" stroke="rgba(10,12,15,0.06)" />
            <path d="M -50,368 C 460,438 720,298 940,398 S 1350,300 1650,378" stroke="#6d28d9" strokeOpacity="0.11" />
            <path d="M -50,432 C 370,464 630,400 900,440 S 1270,398 1650,428" stroke="rgba(10,12,15,0.1)" />
            <path d="M -50,498 C 450,558 710,438 930,528 S 1340,440 1650,510" stroke="var(--color-accent)" strokeOpacity="0.26" strokeWidth="1.4" />
            <path d="M -50,562 C 400,604 660,520 900,568 S 1300,518 1650,556" stroke="rgba(10,12,15,0.07)" />
            <path d="M -50,628 C 470,694 730,562 950,656 S 1360,564 1650,634" stroke="#0369a1" strokeOpacity="0.1" />
            <path d="M -50,698 C 380,730 640,668 900,706 S 1280,666 1650,696" stroke="rgba(10,12,15,0.09)" />
            <path d="M -50,762 C 430,818 690,682 920,776 S 1320,684 1650,750" stroke="rgba(10,12,15,0.06)" />
            <path d="M -50,828 C 400,858 650,798 900,832 S 1290,796 1650,824" stroke="var(--color-accent)" strokeOpacity="0.16" strokeWidth="1.4" />
          </g>
          <g>
            <circle cx="900" cy="70"  r="3.2" fill="var(--color-accent)" fillOpacity="0.35" />
            <circle cx="930" cy="268" r="2.6" fill="rgba(10,12,15,0.28)" />
            <circle cx="930" cy="528" r="3.2" fill="var(--color-accent)" fillOpacity="0.4" />
            <circle cx="940" cy="398" r="2.6" fill="#6d28d9" fillOpacity="0.3" />
            <circle cx="950" cy="656" r="2.6" fill="#0369a1" fillOpacity="0.3" />
            <circle cx="900" cy="832" r="2.8" fill="rgba(10,12,15,0.24)" />
          </g>
        </svg>
      </motion.div>

      {/* ── Location + status, top right ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          top: "clamp(90px, 14vh, 140px)",
          right: "clamp(24px, 5vw, 80px)",
          textAlign: "right",
          zIndex: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 7, justifyContent: "flex-end" }}>
          <span style={{ fontSize: 11, letterSpacing: "0.3em", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
            TORONTO · CA
          </span>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--color-accent)", boxShadow: "0 0 8px rgba(255,122,24,0.7)", animation: "pulse-green 2s ease-in-out infinite" }} />
        </div>
      </motion.div>

      {/* ── Main content — BOTTOM LEFT (Wang-13 asymmetric) ──────── */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "0 clamp(24px, 5vw, 80px) clamp(48px, 8vh, 96px)",
          maxWidth: "100%",
          willChange: "transform",
          ...contentStyle,
        }}
      >
        {/* Headline — name set large and stacked, editorial rather than a
            dashboard title bar. Contrast against section h2s (which run
            26-56px) is the point: this is the one moment on the page
            allowed to be this big. Still one h1, still real text in the
            server HTML. */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: "clamp(28px, 4vh, 48px)" }}
        >
          <h1
            style={{
              fontSize: "clamp(52px, 11vw, 148px)",
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
              color: "rgba(10, 12, 15,0.94)",
              margin: 0,
            }}
          >
            <span style={{ display: "block" }}>Leo</span>
            <span style={{ display: "block" }}>Rao</span>
          </h1>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(11px, 1.1vw, 13px)",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              margin: "clamp(16px, 2.4vh, 24px) 0 0",
            }}
          >
            Chemical Engineer — University of Toronto
          </p>

          {/* The statement, broken across short editorial lines rather than
              run as a paragraph — this replaces the old "by day / by
              night" tagline, which said the same thing at lower contrast. */}
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              fontSize: "clamp(22px, 3.2vw, 38px)",
              lineHeight: 1.18,
              letterSpacing: "-0.01em",
              color: "rgba(10, 12, 15,0.82)",
              margin: "clamp(20px, 3vh, 32px) 0 0",
              maxWidth: "14ch",
            }}
          >
            Building systems between{" "}
            <span style={{ color: "var(--color-accent-ink)" }}>matter</span>{" "}
            and software.
          </p>
        </motion.div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: reduced ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}
        >
          <MagneticBtn href="#projects" variant="primary">View Work</MagneticBtn>
          <MagneticBtn href="#contact" variant="ghost">Get in Touch</MagneticBtn>
        </motion.div>

        {/* Bottom bar — nirnor-style horizontal rule + scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: reduced ? 0 : 1.4 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "clamp(40px, 7vh, 72px)",
            paddingTop: 18,
            borderTop: "1px solid rgba(10, 12, 15,0.07)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 1, background: "var(--color-accent)", opacity: 0.4 }} />
            <span style={{ fontSize: 11, letterSpacing: "0.36em", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
              SCROLL TO EXPLORE
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
