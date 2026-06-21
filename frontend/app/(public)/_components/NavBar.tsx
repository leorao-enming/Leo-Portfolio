"use client";

import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { EmployeeIdCard } from "./EmployeeIdCard";

export function NavBar() {
  const [cardOpen, setCardOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const close = useCallback(() => setCardOpen(false), []);

  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0.4, 0.75]);
  const blur = useTransform(scrollY, [0, 80], [12, 20]);

  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      {/* Floating pill nav */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        style={{ paddingTop: "16px", paddingLeft: "16px", paddingRight: "16px" }}
      >
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between gap-6 w-full"
          style={{
            maxWidth: "900px",
            padding: "10px 16px 10px 20px",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.09)",
            backdropFilter: mounted ? `blur(${blur.get()}px)` : "blur(12px)",
            WebkitBackdropFilter: mounted ? `blur(${blur.get()}px)` : "blur(12px)",
            background: mounted
              ? `rgba(5,5,7,${bgOpacity.get()})`
              : "rgba(5,5,7,0.4)",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => setCardOpen(v => !v)}
            className="glitch-hover flex items-center gap-2 focus:outline-none"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            aria-label="Open ID card"
          >
            <span
              className="font-display font-bold text-sm tracking-tight"
              style={{ color: "var(--color-terminal-green)", textShadow: "0 0 12px rgba(0,255,65,0.35)" }}
            >
              LeoLogic
            </span>
          </button>

          {/* Nav links — hidden on small screens */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { label: "Work", href: "#projects" },
              { label: "About", href: "#about" },
              { label: "Timeline", href: "#timeline" },
              { label: "Contact", href: "#contact" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-xs px-3 py-1.5 rounded-full transition-all duration-300"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Enter OS CTA */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs font-medium rounded-full transition-all duration-300 group"
            style={{
              padding: "8px 16px",
              background: "rgba(0,255,65,0.1)",
              border: "1px solid rgba(0,255,65,0.2)",
              color: "var(--color-terminal-green)",
              fontFamily: "var(--font-display)",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(0,255,65,0.16)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,65,0.35)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(0,255,65,0.1)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,65,0.2)";
            }}
          >
            Enter OS
            <span
              className="flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5"
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "rgba(0,255,65,0.15)",
                fontSize: "10px",
              }}
            >
              →
            </span>
          </Link>
        </motion.nav>
      </div>

      <EmployeeIdCard open={cardOpen} onClose={close} />
    </>
  );
}
