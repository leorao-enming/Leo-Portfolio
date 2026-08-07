"""
Half-Life bio-metrics content.

Edit this file to change what /dashboard/biometrics shows. TRAINING_LOG is the
list that grows as sessions are actually logged — append newest entries at the
end; the API serves them newest-first.
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
        name="Creatine Monohydrate",
        dose="5000mg",
        frequency="Daily",
        half_life="36h",
        purpose="ATP resynthesis, strength output",
    ),
    Supplement(
        name="Vitamin D3",
        dose="5000 IU",
        frequency="Daily",
        half_life="720h",
        purpose="Hormonal regulation, immune function",
    ),
    Supplement(
        name="Artichoke Extract",
        dose="320mg",
        frequency="As needed",
        half_life="4h",
        purpose="PDE4 inhibition, cAMP elevation",
    ),
]

HALFLIFE_PARAMS = [
    HalfLifeParam(
        param="COMPOUND",
        half_life="48h",
        category="CNS FATIGUE",
        notes="Neurological recovery window",
    ),
    HalfLifeParam(
        param="GLYCOGEN",
        half_life="24h",
        category="METABOLIC",
        notes="Full repletion with nutrition",
    ),
    HalfLifeParam(
        param="MUSCLE DAMAGE",
        half_life="72h",
        category="STRUCTURAL",
        notes="Eccentric-dominant sessions",
    ),
    HalfLifeParam(
        param="HORMONAL STRESS",
        half_life="6h",
        category="ENDOCRINE",
        notes="Cortisol acute response",
    ),
    HalfLifeParam(
        param="CARDIO FATIGUE",
        half_life="12h",
        category="CARDIOVASCULAR",
        notes="Aerobic system load",
    ),
    HalfLifeParam(
        param="CREATINE SATURATION",
        half_life="36h",
        category="SUPPLEMENT",
        notes="Phosphocreatine pool depletion",
    ),
    HalfLifeParam(
        param="VITAMIN D3",
        half_life="720h",
        category="SUPPLEMENT",
        notes="Stored in adipose; slow decay",
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
