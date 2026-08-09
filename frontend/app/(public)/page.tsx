import { Hero }               from "./_components/Hero";
import { AboutSection }       from "./_components/AboutSection";
import { ProjectsSection }    from "./_components/ProjectsSection";
import { EngineeringSection } from "./_components/EngineeringSection";
import { LabSection }         from "./_components/LabSection";
import { CapabilitiesSection } from "./_components/CapabilitiesSection";
import { TimelineSection }    from "./_components/TimelineSection";
import { ContactSection }     from "./_components/ContactSection";
import { MarqueeStrip }       from "./_components/MarqueeStrip";
import { NoiseOverlay }       from "./_components/NoiseOverlay";
import { ChapterIndicator }   from "./_components/ChapterIndicator";

export default function LandingPage() {
  return (
    <>
      <NoiseOverlay />
      <ChapterIndicator />
      <Hero />
      <MarqueeStrip />
      <AboutSection />
      <MarqueeStrip reverse />
      <ProjectsSection />
      <MarqueeStrip />
      <EngineeringSection />
      <LabSection />
      <CapabilitiesSection />
      <MarqueeStrip />
      <TimelineSection />
      <ContactSection />
    </>
  );
}
