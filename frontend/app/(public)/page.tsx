import { Hero }              from "./_components/Hero";
import { SelectedWork }      from "./_components/SelectedWork";
import { EngineeringTeaser } from "./_components/EngineeringTeaser";
import { Index }             from "./_components/Index";
import { ContactSection }    from "./_components/ContactSection";

// 01 Hero / 02 Selected work / 03 Engineering / 04 Index / 05 Contact.
// Previously seven sections including a full competency grid, a build
// queue, and a three-card capability breakdown — the homepage behaved
// like a sitemap. Those three folded into Index; the six-project grid
// narrowed to three registered flagships in SelectedWork.
export default function LandingPage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <EngineeringTeaser />
      <Index />
      <ContactSection />
    </>
  );
}
