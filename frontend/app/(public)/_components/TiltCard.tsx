"use client";

import { useRef, ReactNode } from "react";
import { useReducedMotion } from "motion/react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  intensity?: number;
}

export function TiltCard({ children, className = "", style, intensity = 10 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = -(y - 0.5) * intensity;
    const tiltY = (x - 0.5) * intensity;
    const px = x * 100;
    const py = y * 100;
    el.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(6px)`;
    el.style.backgroundImage = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.045) 0%, transparent 55%), none`;
  };

  const handleLeave = () => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    el.style.backgroundImage = "none";
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: "transform 0.15s ease-out, box-shadow 0.2s ease",
        willChange: "transform",
        ...style,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}
