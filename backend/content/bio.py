"""
Half-Life bio-metrics content.

Edit this file to change what /dashboard/biometrics shows. This is an
architecture demo — it renders static content, not a connection to the real
Half-Life app's database (see Leo-Portfolio Overview in the knowledge vault).
The substances below match what the real app actually tracks: caffeine intake
against sleep schedule, plus sodium and sugar as secondary intake checks — not
a bodybuilding supplement stack. Caffeine is the only one of the three that is
genuinely modelled as first-order decay; sodium and sugar are threshold checks
(daily reset / per-dose cap), and are labelled as such rather than given a
fabricated half-life. TRAINING_LOG is the list that grows as sessions are
actually logged — append newest entries at the end; the API serves them
newest-first.
"""

from schemas import (
    BioDashboard,
    BioModule,
    HalfLifeParam,
    ModuleStatus,
    StatCard,
    Supplement,
    Tone,
    TrainingEntry,
)

METRIC_CARDS = [
    StatCard(
        label="READINESS SCORE",
        value="—",
        sub="Awaiting biometric data",
        tone=Tone.CYAN,
    ),
    StatCard(
        label="FATIGUE LOAD",
        value="NOMINAL",
        sub="Acute:Chronic ratio: —",
        tone=Tone.GREEN,
    ),
    StatCard(
        label="METABOLIC AGE",
        value="—",
        sub="Half-life decay index",
        tone=Tone.AMBER,
    ),
    StatCard(
        label="RECOVERY STATUS",
        value="UNKNOWN",
        sub="HRV feed pending",
        tone=Tone.NEUTRAL,
    ),
]

SUPPLEMENTS = [
    Supplement(
        name="Caffeine",
        dose="Logged per intake",
        frequency="Rolling 24h window",
        half_life="~5h",
        purpose="Primary tracked stimulant — modelled as first-order decay against sleep timing",
    ),
    Supplement(
        name="Sodium",
        dose="Logged per intake",
        frequency="Resets each calendar day",
        half_life="N/A — daily reset, not decay-modelled",
        purpose="Secondary intake check, tracked against a calendar-day total rather than elimination",
    ),
    Supplement(
        name="Sugar",
        dose="Logged per intake",
        frequency="Per-dose cap",
        half_life="N/A — per-dose cap, not decay-modelled",
        purpose="Secondary intake check, capped per dose rather than a daily limit",
    ),
]

HALFLIFE_PARAMS = [
    HalfLifeParam(
        param="CAFFEINE",
        half_life="~5h",
        category="STIMULANT",
        notes="Rolling 24h window, not a calendar-day reset",
    ),
    HalfLifeParam(
        param="SODIUM",
        half_life="N/A",
        category="ELECTROLYTE",
        notes="Resets each calendar day — threshold check, not decay",
    ),
    HalfLifeParam(
        param="SUGAR",
        half_life="N/A",
        category="METABOLIC",
        notes="Single-dose cap, not a daily total — threshold check, not decay",
    ),
    HalfLifeParam(
        param="SLEEP LATENCY",
        half_life="N/A",
        category="SLEEP",
        notes="Time-to-sleep, tracked against evening caffeine cutoff",
    ),
]

# Append new sessions at the end. Empty is a valid state — the UI renders an
# explicit "no entries logged" panel rather than pretending to have data.
TRAINING_LOG: list[TrainingEntry] = []

MODULES = [
    BioModule(name="HRV MONITOR", status=ModuleStatus.PENDING),
    BioModule(name="TRAINING LOGGER", status=ModuleStatus.ACTIVE),
    BioModule(name="METABOLIC DECAY MODEL", status=ModuleStatus.ACTIVE),
    BioModule(name="SUPPLEMENT TRACKER", status=ModuleStatus.ACTIVE),
    BioModule(name="SLEEP TRACKER (EXT)", status=ModuleStatus.PENDING),
    BioModule(name="NUTRITION INTAKE (EXT)", status=ModuleStatus.PENDING),
    BioModule(name="WEARABLE FEED (EXT)", status=ModuleStatus.PENDING),
    BioModule(name="BLOODWORK API (EXT)", status=ModuleStatus.PENDING),
]


def get_dashboard() -> BioDashboard:
    """Assemble the full bio dashboard payload, newest training entries first."""
    return BioDashboard(
        metric_cards=METRIC_CARDS,
        supplements=SUPPLEMENTS,
        halflife_params=HALFLIFE_PARAMS,
        training_log=list(reversed(TRAINING_LOG)),
        modules=MODULES,
    )
