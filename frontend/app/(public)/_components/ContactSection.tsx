"use client";

import { motion, useReducedMotion } from "motion/react";
import { reveal } from "./motion";


const links = [
  {
    label: "Email",
    value: "leorao2004@gmail.com",
    href: "mailto:leorao2004@gmail.com",
    icon: "→",
  },
  {
    label: "GitHub",
    value: "github.com/leorao-enming",
    href: "https://github.com/leorao-enming",
    icon: "↗",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/enming-rao",
    href: "https://www.linkedin.com/in/enming-rao-677220294/",
    icon: "↗",
  },
];

export function ContactSection() {
  const reduced = useReducedMotion();

  return (
    <section id="contact" style={{ background: "var(--surface-contact)" }}>
      <div
        className="section-shell"
        style={{ paddingTop: "clamp(72px, 10vw, 120px)", paddingBottom: "clamp(72px, 10vw, 120px)" }}
      >
      {/* The divider rule that used to open this section is gone — the
          tone shift from surface-engineering to surface-contact already
          marks the boundary, and this section is meant to read quiet. */}

      {/* Columns in className only — the inline gridTemplateColumns that
          used to sit here silently overrode md:grid-cols-*, so this
          section never went two-column at any width. */}
      <div
        style={{ gap: "clamp(48px, 7vw, 80px)" }}
        className="grid grid-cols-1 items-start md:grid-cols-[1.4fr_1fr]"
      >
        {/* Left — editorial text */}
        <div>
          <motion.div
            {...reveal(reduced)}
            style={{ marginBottom: 16 }}
          >
            <h2
              style={{
                fontSize: "var(--type-display-s)",
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
                color: "var(--color-text-primary)",
                margin: 0,
                marginBottom: 20,
              }}
            >
              Let&apos;s build
              <br />
              <span style={{ color: "var(--color-accent-ink)" }}>
                something real.
              </span>
            </h2>

            <p
              style={{
                fontSize: "var(--type-body-m)",
                color: "var(--text-muted)",
                lineHeight: 1.75,
                maxWidth: 400,
              }}
            >
              Open to research collaborations, internship opportunities, and conversations
              about quant systems, AI pipelines, and process engineering.
            </p>
          </motion.div>

          <motion.div
            {...reveal(reduced, 2)}
            style={{ marginTop: 36 }}
          >
            <a
              href="mailto:leorao2004@gmail.com"
              className="cta-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 28px",
                minHeight: 44,
                borderRadius: "9999px",
                background: "var(--color-accent)",
                color: "var(--color-on-accent)",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: "0.02em",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Send a message
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                }}
              >
                →
              </span>
            </a>
          </motion.div>
        </div>

        {/* Right — links. Hairline rows, not boxed cards: quiet is the
            point of this section, and a bordered/background treatment
            reads as one more UI container on a page trying to have fewer
            of them. */}
        <div>
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              {...reveal(reduced, i)}
              className="index-row group"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "18px 4px",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.2em",
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-display)",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  {link.label}
                </div>
                <div
                  style={{
                    fontSize: "var(--type-body-s)",
                    color: "rgba(10, 12, 15,0.7)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {link.value}
                </div>
              </div>
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  border: "1px solid rgba(10, 12, 15,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  color: "var(--text-muted)",
                  flexShrink: 0,
                }}
              >
                {link.icon}
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* The copyright strip that used to sit here moved into SiteFooter,
          which renders on every public page instead of only this one. */}
      </div>
    </section>
  );
}
