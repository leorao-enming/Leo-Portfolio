"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
}

export function ScrollReveal({ children, delay = 0, direction = "up" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const initial: Record<string, string> = {
    up: "translateY(28px)",
    left: "translateX(-28px)",
    right: "translateX(28px)",
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0)" : initial[direction],
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
        willChange: "opacity, transform",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
}
