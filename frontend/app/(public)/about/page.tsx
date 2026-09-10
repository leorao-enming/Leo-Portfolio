import type { Metadata } from "next";
import { AboutSection } from "../_components/AboutSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Leo Rao — Chemical Engineering student at the University of Toronto, building systems at the boundary of science and software.",
};

export default function AboutPage() {
  return (
    <div className="page-shell">
      <AboutSection />
    </div>
  );
}
