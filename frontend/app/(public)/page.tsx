import { Hero }                from "./_components/Hero";
import { AboutTeaser }         from "./_components/AboutTeaser";
import { ProjectsSection }     from "./_components/ProjectsSection";
import { EngineeringTeaser }   from "./_components/EngineeringTeaser";
import { LabTeaser }           from "./_components/LabTeaser";
import { CapabilitiesSection } from "./_components/CapabilitiesSection";
import { TimelineSection }     from "./_components/TimelineSection";
import { ContactSection }      from "./_components/ContactSection";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <AboutTeaser />
      <ProjectsSection />
      <EngineeringTeaser />
      <LabTeaser />
      <CapabilitiesSection />
      <TimelineSection />
      <ContactSection />
    </>
  );
}
