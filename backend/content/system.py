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
        label="QUANT TRADING ENGINE",
        description=(
            "LeoLogic Quantitative Core — Systematic execution, signal routing, and live "
            "portfolio metrics."
        ),
        href="/dashboard/quant",
        status_label="LIVE",
        tone=Tone.GREEN,
        metrics=[
            MetricPair(key="SIGNALS", value="14 ACTIVE"),
            MetricPair(key="POSITIONS", value="3 OPEN"),
            MetricPair(key="DRAWDOWN", value="—"),
        ],
    ),
    SubsystemSummary(
        id="HALFLIFE",
        label="BIO-METRICS TRACKER",
        description=(
            "Half-Life protocol — Metabolic decay modeling, training stress load, and "
            "physiological optimization."
        ),
        href="/dashboard/biometrics",
        status_label="TRACKING",
        tone=Tone.CYAN,
        metrics=[
            MetricPair(key="FATIGUE", value="NOMINAL"),
            MetricPair(key="READINESS", value="—"),
            MetricPair(key="LAST LOG", value="—"),
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
