import type { Metadata } from "next";
import Link from "next/link";
import { AboutSection } from "../_components/AboutSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Leo Rao — Chemical Engineering student at the University of Toronto, building systems at the boundary of science and software.",
};

export default function AboutPage() {
  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(96px, 11vw, 128px) clamp(24px, 5vw, 80px) 0" }}>
      <Link
        href="/"
        className="text-xs tracking-widest font-mono inline-flex items-center gap-2"
        style={{ color: "rgba(255,255,255,0.32)" }}
      >
        ← LEOLOGIC.ORG
      </Link>
      <AboutSection />
    </div>
  );
}
