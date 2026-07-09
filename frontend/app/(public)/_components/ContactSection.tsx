"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

const links = [
  {
    label: "Email",
    value: "leorao2004@gmail.com",
    href: "mailto:leorao2004@gmail.com",
    icon: "→",
  },
  {
    label: "GitHub",
    value: "github.com/leo-rao",
    href: "https://github.com/leo-rao",
    icon: "↗",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/leo-rao",
    href: "https://linkedin.com/in/leo-rao",
    icon: "↗",
  },
];

export function ContactSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="contact"
      style={{
        padding: "clamp(80px, 12vw, 160px) clamp(24px, 5vw, 80px)",
        maxWidth: "1280px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* Divider */}
      <div
        aria-hidden
        style={{
          height: 1,
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)",
          marginBottom: "clamp(60px, 9vw, 120px)",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "clamp(48px, 7vw, 80px)",
          alignItems: "start",
        }}
        className="md:grid-cols-[1.4fr_1fr]"
      >
        {/* Left — editorial text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduced ? 0 : 0.8, ease }}
            style={{ marginBottom: 16 }}
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
                marginBottom: 24,
              }}
            >
              Contact
            </span>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 5vw, 64px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
                color: "var(--color-text-primary)",
                margin: 0,
                marginBottom: 20,
              }}
            >
              Let&apos;s build
              <br />
              <span style={{ color: "var(--color-terminal-green)", textShadow: "0 0 40px rgba(0,255,65,0.25)" }}>
                something real.
              </span>
            </h2>

            <p
              style={{
                fontSize: "clamp(14px, 1.3vw, 17px)",
                color: "rgba(255,255,255,0.42)",
                lineHeight: 1.75,
                maxWidth: 400,
              }}
            >
              Open to research collaborations, internship opportunities, and conversations
              about quant systems, AI pipelines, and process engineering.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.2, ease }}
            style={{ marginTop: 36 }}
          >
            <a
              href="mailto:leorao2004@gmail.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 28px",
                borderRadius: "9999px",
                background: "var(--color-terminal-green)",
                color: "#050507",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: "0.02em",
                textDecoration: "none",
                boxShadow: "0 0 32px rgba(0,255,65,0.2)",
                transition: "box-shadow 0.25s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                cursor: "pointer",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 48px rgba(0,255,65,0.35)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(0,255,65,0.2)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
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

        {/* Right — links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px, 1.5vw, 16px)" }}>
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, x: reduced ? 0 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : i * 0.1, ease }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "18px 22px",
                borderRadius: 16,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                textDecoration: "none",
                transition: "background 0.2s, border-color 0.2s, transform 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.04)";
                el.style.borderColor = "rgba(255,255,255,0.12)";
                el.style.transform = "translateX(4px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.02)";
                el.style.borderColor = "rgba(255,255,255,0.06)";
                el.style.transform = "translateX(0)";
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.25)",
                    fontFamily: "var(--font-display)",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  {link.label}
                </div>
                <div
                  style={{
                    fontSize: "clamp(13px, 1.1vw, 15px)",
                    color: "rgba(255,255,255,0.7)",
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
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.4)",
                  flexShrink: 0,
                }}
              >
                {link.icon}
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Footer strip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : 0.4 }}
        style={{
          marginTop: "clamp(60px, 9vw, 120px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          paddingTop: 28,
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "rgba(255,255,255,0.18)",
            fontFamily: "var(--font-display)",
            textTransform: "uppercase",
          }}
        >
          LeoLogic © {new Date().getFullYear()}
        </span>
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "rgba(255,255,255,0.18)",
            fontFamily: "var(--font-display)",
            textTransform: "uppercase",
          }}
        >
          System Online
        </span>
      </motion.div>
    </section>
  );
}
