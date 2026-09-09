"""
Command-center content: subsystem registry and the activity feed.

ACTIVITY_LOG is the running record of work actually done. Append new entries at
the end — the API serves them newest-first. Keep `date` accurate; it is what the
UI sorts and displays.

Entries seeded here are derived from the repository's own commit history, so
every one of them corresponds to work that is verifiable in `git log`.
"""

from schemas import (
    ActivityCategory,
    ActivityEntry,
    LogLevel,
    MetricPair,
    SubsystemSummary,
    SystemOverview,
    Tone,
)

SUBSYSTEMS = [
    SubsystemSummary(
        id="LQC-CORE",
        label="QUANT RESEARCH BOT",
        description=(
            "LeoLogic Quantitative Core — a private Discord-bot operator console for "
            "Interactive Brokers. Parked since May 2026; live execution stays gated off by "
            "design, not by incompleteness."
        ),
        href="/dashboard/quant",
        status_label="PARKED",
        tone=Tone.AMBER,
        metrics=[
            MetricPair(key="STATUS", value="Parked since 2026-05"),
            MetricPair(key="EXECUTION", value="Paper only"),
            MetricPair(key="SAFETY GATE", value="0 / 4 cleared"),
        ],
    ),
    SubsystemSummary(
        id="HALFLIFE",
        label="BIO-METRICS TRACKER",
        description=(
            "Half-Life protocol — models caffeine intake against sleep timing as first-order "
            "exponential decay."
        ),
        href="/dashboard/biometrics",
        status_label="RELEASE CANDIDATE",
        tone=Tone.CYAN,
        metrics=[
            MetricPair(key="MODEL", value="A(t) = A0 · e^(-0.693t/t1/2)"),
            MetricPair(key="TRACKED", value="Caffeine · sodium · sugar"),
            MetricPair(key="APP STATUS", value="Signed archive built"),
        ],
    ),
]

# ---------------------------------------------------------------------------
# Activity feed — append new work here.
# ---------------------------------------------------------------------------

ACTIVITY_LOG: list[ActivityEntry] = [
    ActivityEntry(
        date="2026-05-03",
        category=ActivityCategory.BUILD,
        title="Leologic system architecture scaffolded",
        detail=(
            "Stood up the Next.js frontend and FastAPI backend, wired CORS between them, "
            "and established the quant/bio router split."
        ),
        tags=["nextjs", "fastapi", "architecture"],
    ),
    ActivityEntry(
        date="2026-06-21",
        category=ActivityCategory.BUILD,
        title="Premium landing page redesign",
        detail=(
            "Rebuilt the public landing page: 3D tilt interactions, cursor glow, marquee "
            "strips, and the interactive employee ID card with spring pull-down."
        ),
        tags=["frontend", "design", "motion"],
    ),
    ActivityEntry(
        date="2026-07-10",
        category=ActivityCategory.BUILD,
        title="Portfolio theme and interaction pass",
        detail="Refined the terminal palette, surface scale, and hover/focus behaviour across the site.",
        tags=["frontend", "design"],
    ),
    ActivityEntry(
        date="2026-08-06",
        category=ActivityCategory.OPS,
        title="Site structure audit and repair",
        detail=(
            "Removed the orphaned /systems route tree, unified three conflicting project "
            "datasets into one source of truth, fixed a logout that never cleared its "
            "cookie, migrated middleware to proxy for Next 16, and replaced the wildcard "
            "CORS policy with an explicit origin list."
        ),
        tags=["refactor", "auth", "security", "nextjs"],
    ),
    ActivityEntry(
        date="2026-09-09",
        category=ActivityCategory.BUILD,
        title="Content sync with the Obsidian knowledge vault, plus site restructure",
        detail=(
            "Corrected two content gaps the vault had already flagged: LQC's status changed "
            "from 'In Development' to 'Parked' (idle since May 2026), and the Half-Life "
            "biometrics dashboard/decay simulator were switched from an unrelated supplement "
            "stack (creatine, vitamin D3) to the substances the real app actually tracks "
            "(caffeine, sodium, sugar). Added Trace and Tiny Trials as project registry "
            "entries and FabTwin & FabChem to the Lab build queue. Split Engineering and Lab "
            "out of the single-page scroll into standalone routes (/engineering, /lab) to "
            "match /projects, with condensed teasers left on the landing page and the nav "
            "cleaned up to one link per destination."
        ),
        tags=["content", "obsidian-sync", "nextjs", "ia"],
    ),
    ActivityEntry(
        date="2026-09-09",
        category=ActivityCategory.BUILD,
        title="Mobile nav, /about page, honest identity copy, and basic SEO",
        detail=(
            "Added a mobile menu — the nav had no fallback below 768px. Split About out into "
            "its own page (/about) to match Projects/Engineering/Lab, with a teaser left on "
            "the landing page. Labeled the dashboard CTA and the login screen as a demo rather "
            "than an operational tool, since the personal-use login-panel idea behind it was "
            "abandoned once the activity log moved to this chat-to-content workflow. Removed a "
            "false 'quant research experience' identity claim that had spread across the site "
            "(Hero headline and tagline, an About stat card, a Capabilities pillar sized as the "
            "largest card, a fabricated Timeline milestone, the employee ID card, marquee copy, "
            "and page metadata) — LQC is a real parked side project, not professional quant "
            "experience, and the copy now says that. Fixed the /dashboard command-center cards "
            "still showing invented LQC numbers (14 active signals, 3 open positions, LIVE "
            "status) that contradicted the parked status and the already-honest /dashboard/quant "
            "page. Added sitemap.ts, robots.ts, and a generated OG image; deleted the unused "
            "default Next.js starter SVGs from public/."
        ),
        tags=["content", "honesty", "nextjs", "seo", "ia"],
    ),
    ActivityEntry(
        date="2026-09-09",
        category=ActivityCategory.BUILD,
        title="Fixed logo/ID-card bug, mined the vault for more project detail",
        detail=(
            "Fixed the NavBar logo: clicking it from another page navigated home but also "
            "popped the employee ID card at the same time, since the same onClick handled "
            "both. Now the card only toggles when already on the home page. Pulled fresh "
            "detail from project overview files that had accumulated more evidence than the "
            "site reflected: Trace's 'frozen gold set' claim was wrong (the gold set is still "
            "pending human double-review, not frozen) and now says so, plus a real extraction-"
            "score metric (Object F1 0.25 / Relation F1 0.01) was added instead of hiding the "
            "gap. LeoLogic OS's tech-stack pills were conflating this portfolio's Next.js/"
            "FastAPI stack with the actual private leologic-os repo's Vite+React+TypeScript+"
            "Vitest client — split apart, with real evidence added (Phase 1-9 + Adventure Mode "
            "shipped, real daily/weekly review files, not templates). Half-Life's project card "
            "now names its real build (1.0.4 (6)) and links its public repo. FabTwin & FabChem's "
            "Lab entry got real evidence (42/42 tests passing, CI green) and links to both public "
            "repos, via a new evidence/links field on lab entries. Also caught and fixed a real "
            "conflation on /engineering: the certification card had called the FE exam an 'EIT' "
            "credential 'via NCEES' — NCEES administers the FE, not EIT, and Canadian EIT/"
            "licensure is a separate province-specific track; the vault explicitly flags this "
            "exact mistake. ECCC NPRI PFAS was deliberately left off the site — it's a pre-"
            "application research plan with zero execution evidence yet, not a project."
        ),
        tags=["content", "obsidian-sync", "honesty", "bugfix"],
    ),
]


def get_activity(limit: int | None = None) -> list[ActivityEntry]:
    """Return activity entries newest-first, optionally capped at `limit`."""
    entries = sorted(ACTIVITY_LOG, key=lambda e: e.date, reverse=True)
    return entries[:limit] if limit else entries


def get_overview(activity_limit: int = 5) -> SystemOverview:
    """Assemble the command-center overview payload."""
    return SystemOverview(
        subsystems=SUBSYSTEMS,
        activity=get_activity(limit=activity_limit),
    )
