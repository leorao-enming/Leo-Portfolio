"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";
import { FlowField } from "./HeroFlowField";
import { DURATION, EASE } from "./motion";

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
    /* 0.15, down from 0.28: at 0.28 the button visibly chased the cursor
       across a third of its own width, which read as the page reacting
       more than the content did. */
    const x = (e.clientX - r.left - r.width  / 2) * 0.15;
    const y = (e.clientY - r.top  - r.height / 2) * 0.15;
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
    /* The site's one curve, not an overshooting spring: settling past the
       rest position and back made the pull feel springy-loose. */
    transition: `transform 0.35s cubic-bezier(${EASE.join(",")}), background 0.2s, box-shadow 0.2s`,
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
      data-rail-label="Leo Rao"
      ref={heroRef}
      /* Full-viewport from md up; content-height on phones. Bottom-anchored
         in a full 844px phone screen, the name started 40% of the way down
         with nothing above it but the field. Sized to its content, the
         hero starts under the nav and lets the manifesto show at the
         bottom edge, which is the scroll cue a phone actually needs. */
      className="pt-[132px] md:pt-0 md:min-h-[100dvh]"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
        background: "var(--surface-base)",
      }}
    >
      {/* ── Generative process-flow field ──────────────────────────
          Streamlines and instrumentation nodes, not decoration for its
          own sake — flow + measurement is literally the subject matter.
          See HeroFlowField. Replaces a dark "cinematic" gradient tuned
          for the old near-black ground. */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-10% 0",
          background:
            "radial-gradient(ellipse 70% 60% at 18% 28%, rgba(255,122,24,0.045) 0%, transparent 60%)," +
            "radial-gradient(ellipse 60% 55% at 86% 74%, rgba(10,12,15,0.025) 0%, transparent 55%)",
          pointerEvents: "none",
          zIndex: 1,
          willChange: "transform",
          ...fieldStyle,
        }}
      >
        <FlowField reduced={reduced} />
      </motion.div>

      {/* ── Location + status, top right ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.base, delay: reduced ? 0 : 0.4, ease: EASE }}
        style={{
          position: "absolute",
          top: "clamp(88px, 12vh, 140px)",
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
        {/* Text constrained to a left column rather than stretched full
            width — the credential that used to sit to its right is gone
            (see Hero object removal below); this keeps the "large
            typography on the left, substantial negative space" composition
            the brief asks for without needing an object to fill that
            space. The credential itself already has a home: the lanyard
            drop that opens from the nav logo. Duplicating it here, always
            visible on load, read as a second, unexplained copy of the same
            artifact rather than a deliberate hero object — worse than
            just leaving the space open. */}
        <div style={{ maxWidth: 720 }}>
          {/* Headline — name set large and stacked, editorial rather than a
              dashboard title bar. Contrast against section h2s (which run
              26-56px) is the point: this is the one moment on the page
              allowed to be this big. Still one h1, still real text in the
              server HTML. */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.base, ease: EASE }}
            style={{ marginBottom: "clamp(28px, 4vh, 48px)" }}
          >
            <h1
              style={{
                fontSize: "var(--type-display-xl)",
                letterSpacing: "-0.04em",
                lineHeight: 0.92,
                color: "rgba(10, 12, 15,0.94)",
                margin: 0,
              }}
            >
              <span style={{ display: "block" }}>Leo</span>
              <span style={{ display: "block" }}>Rao</span>
            </h1>

            {/* The statement — Layer A, dominant over everything else on
                the page including this same line's own supporting copy
                below it. */}
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                fontSize: "var(--type-heading-l)",
                lineHeight: 1.16,
                letterSpacing: "-0.01em",
                color: "rgba(10, 12, 15,0.86)",
                margin: "clamp(20px, 3vh, 32px) 0 0",
                maxWidth: "13ch",
              }}
            >
              Engineering the{" "}
              <span style={{ color: "var(--color-accent-ink)" }}>invisible.</span>
            </p>

            {/* Layer B — information, one supporting line, well below the
                statement's weight. */}
            <p
              style={{
                fontSize: "var(--type-body-m)",
                lineHeight: 1.6,
                color: "var(--text-body)",
                margin: "clamp(14px, 2vh, 20px) 0 0",
                maxWidth: "34ch",
              }}
            >
              Chemical engineering, physical systems, software and intelligence.
            </p>
          </motion.div>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.base, delay: reduced ? 0 : 0.6, ease: EASE }}
            style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}
          >
            <MagneticBtn href="#projects" variant="primary">View Work</MagneticBtn>
            <MagneticBtn href="#contact" variant="ghost">Get in Touch</MagneticBtn>
          </motion.div>
        </div>

        {/* Bottom bar — nirnor-style horizontal rule + scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION.base, delay: reduced ? 0 : 1, ease: EASE }}
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
