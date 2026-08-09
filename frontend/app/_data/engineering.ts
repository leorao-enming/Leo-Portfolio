// ─────────────────────────────────────────────────────────────────────────────
// Process engineering track — the chemical engineering half of the portfolio.
//
// Kept in step with the Obsidian vault (03 Career/ and 02 Projects/Internship/).
// Competency levels are the honest self-assessment from the competency matrix,
// not aspirational ones: a graded matrix with named next steps reads as
// engineering discipline, an inflated one collapses in a technical interview.
// ─────────────────────────────────────────────────────────────────────────────

export type CompetencyLevel = "Beginner" | "Developing" | "Proficient" | "Advanced";

export type Competency = {
  name: string;
  level: CompetencyLevel;
  evidence: string;
  nextStep: string;
};

export type Internship = {
  company: string;
  companyLocal: string;
  department: string;
  startDate: string;
  /** Null while ongoing. */
  endDate: string | null;
  summary: string;
  focusAreas: string[];
};

export type Certification = {
  name: string;
  body: string;
  target: string;
  rationale: string;
  tier: 1 | 2;
};

export const INTERNSHIP: Internship = {
  company: "Hubei Jingrui Microelectronic Materials",
  companyLocal: "湖北晶瑞微电子材料",
  department: "Process Engineering",
  startDate: "2026-07-01",
  endDate: null,
  summary:
    "Process engineering internship in semiconductor-grade materials manufacturing — " +
    "building hands-on grounding in plant instrumentation, control room operations, and " +
    "the documentation discipline that production engineering runs on.",
  focusAreas: [
    "P&ID reading and interpretation",
    "Process instrumentation — PT / TT / LT / FT",
    "DCS and central control room operation",
    "Level, pressure, temperature and flow control",
    "Alarm response and handling",
    "Plant inspection rounds",
    "SOP authoring and execution",
    "HSE safety standards",
    "Equipment and production line familiarity",
  ],
};

export const COMPETENCIES: Competency[] = [
  {
    name: "P&ID Reading",
    level: "Beginner",
    evidence: "Internship exposure",
    nextStep: "Study real plant P&IDs",
  },
  {
    name: "Process Instrumentation",
    level: "Beginner",
    evidence: "PT, TT and equipment labels",
    nextStep: "Learn common instrument tags",
  },
  {
    name: "DCS Operations",
    level: "Beginner",
    evidence: "Observed control room operations",
    nextStep: "Understand alarm and control logic",
  },
  {
    name: "Process Safety",
    level: "Beginner",
    evidence: "Safety training and plant inspection",
    nextStep: "Study HAZOP and LOPA",
  },
  {
    name: "Data Analysis",
    level: "Developing",
    evidence: "University and project experience",
    nextStep: "Strengthen SQL, Power BI and Python",
  },
  {
    name: "Technical Documentation",
    level: "Developing",
    evidence: "Internship and project records",
    nextStep: "Build structured engineering logs",
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "EIT — Engineer in Training",
    body: "NCEES",
    target: "2027",
    rationale: "First step toward North American professional engineering licensure",
    tier: 1,
  },
];

/** Graduation year and the role families this track is aimed at. */
export const CAREER_TARGET = {
  graduationYear: "2028",
  roleFamilies: [
    "Process Engineering",
    "Manufacturing Engineering",
    "Operations Engineering",
    "Materials / Chemical Process Engineering",
    "Industrial Technology",
  ],
};

/** Competency level → position on a 4-step scale, for the meter rendering. */
export const LEVEL_STEPS: Record<CompetencyLevel, number> = {
  Beginner: 1,
  Developing: 2,
  Proficient: 3,
  Advanced: 4,
};
