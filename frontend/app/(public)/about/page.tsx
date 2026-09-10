import type { Metadata } from "next";
import { AboutSection } from "../_components/AboutSection";
import { TimelineSection } from "../_components/TimelineSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Leo Rao — Chemical Engineering student at the University of Toronto, building systems " +
    "at the boundary of science and software, with a dated build log of how it got here.",
};

export default function AboutPage() {
  return (
    <div className="page-shell">
      <AboutSection />
      {/* The build log lives here rather than on the landing page: it is the
          story of how the work got here, which is what this page is for, and
          it was taking a quarter of the landing page's height on its own. */}
      <TimelineSection />
    </div>
  );
}
