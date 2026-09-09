import { Hero }               from "./_components/Hero";
import { AboutTeaser }        from "./_components/AboutTeaser";
import { ProjectsSection }    from "./_components/ProjectsSection";
import { EngineeringTeaser }  from "./_components/EngineeringTeaser";
import { LabTeaser }          from "./_components/LabTeaser";
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
      <AboutTeaser />
      <MarqueeStrip reverse />
      <ProjectsSection />
      <MarqueeStrip />
      <EngineeringTeaser />
      <LabTeaser />
      <CapabilitiesSection />
      <MarqueeStrip />
      <TimelineSection />
      <ContactSection />
    </>
  );
}
