import math
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from content import bio as bio_content
from schemas import BioDashboard

router = APIRouter(
    prefix="/bio",
    tags=["Bio Metrics"],
)


@router.get(
    "/dashboard",
    summary="Full bio-metrics dashboard payload",
    response_model=BioDashboard,
    response_description="Metric cards, supplement stack, half-life parameters, training log, and module status",
)
async def get_bio_dashboard() -> BioDashboard:
    """Everything /dashboard/biometrics renders, in one round trip."""
    return bio_content.get_dashboard()

# Secondary router that powers the Half-Life Bio-Metrics interactive showcase.
api_router = APIRouter(
    prefix="/api",
    tags=["Half-Life Bio-Metrics"],
)


# ---------------------------------------------------------------------------
# Request / Response schemas
# ---------------------------------------------------------------------------

class MetabolicDecayRequest(BaseModel):
    compound: str = Field(..., examples=["caffeine"], description="Name of the compound being tracked")
    initial_dose_mg: float = Field(..., gt=0, description="Initial dose in milligrams")
    half_life_hours: float = Field(..., gt=0, description="Known half-life of the compound in hours")
    elapsed_hours: float = Field(..., ge=0, description="Hours elapsed since administration")


class MetabolicDecayResponse(BaseModel):
    compound: str
    initial_dose_mg: float
    elapsed_hours: float
    remaining_mg: float
    percent_remaining: float


class PhysiologicalUpdateRequest(BaseModel):
    metric: str = Field(
        ...,
        examples=["bone_weight", "muscle_hypertrophy"],
        description="The physiological parameter to update (e.g. 'bone_weight', 'muscle_hypertrophy')",
    )
    value: float = Field(..., description="New measurement value")
    unit: str = Field(..., examples=["kg", "cm", "mm"], description="Unit of measurement")
    notes: str | None = Field(default=None, description="Optional context or session notes")


class PhysiologicalUpdateResponse(BaseModel):
    metric: str
    value: float
    unit: str
    status: str
    message: str


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@router.post(
    "/metabolic-decay",
    summary="Calculate metabolic decay",
    response_model=MetabolicDecayResponse,
    response_description="Estimated remaining concentration of a compound using first-order decay",
)
async def calculate_metabolic_decay(payload: MetabolicDecayRequest) -> MetabolicDecayResponse:
    """
    Estimates remaining compound concentration using the standard
    first-order half-life formula:

        remaining = initial × (0.5 ^ (elapsed / half_life))

    Placeholder — extend with per-compound pharmacokinetic profiles,
    individual metabolic rate factors, and persistence to a time-series store.
    """
    remaining = payload.initial_dose_mg * (0.5 ** (payload.elapsed_hours / payload.half_life_hours))
    percent = (remaining / payload.initial_dose_mg) * 100

    return MetabolicDecayResponse(
        compound=payload.compound,
        initial_dose_mg=payload.initial_dose_mg,
        elapsed_hours=payload.elapsed_hours,
        remaining_mg=round(remaining, 4),
        percent_remaining=round(percent, 2),
    )


@router.post(
    "/physiological-update",
    summary="Update a physiological parameter",
    response_model=PhysiologicalUpdateResponse,
    response_description="Confirmation that the physiological metric has been recorded",
)
async def update_physiological_parameter(payload: PhysiologicalUpdateRequest) -> PhysiologicalUpdateResponse:
    """
    Records or updates a physiological parameter such as bone density, body weight,
    or hypertrophy measurements.

    Placeholder — replace with real DB write (e.g. TimescaleDB / Postgres),
    validation against historical baselines, and trend analysis.
    """
    return PhysiologicalUpdateResponse(
        metric=payload.metric,
        value=payload.value,
        unit=payload.unit,
        status="recorded",
        message=f"Physiological parameter '{payload.metric}' logged at {payload.value} {payload.unit}. Persistence layer pending.",
    )


# ---------------------------------------------------------------------------
# Half-Life Bio-Metrics showcase  —  POST /api/decay
# ---------------------------------------------------------------------------

# Empirical half-lives (hours) sourced from published pharmacokinetic literature.
# Caffeine and melatonin are the two compounds actually relevant to Half-Life's
# real subject — caffeine intake weighed against sleep timing — so this demo
# models substances the app's premise is actually about, rather than an
# unrelated supplement stack.
_SUBSTANCE_HALF_LIVES: dict[str, float] = {
    "caffeine":  5.0,    # healthy-adult plasma half-life (~3-7 h, commonly cited as ~5 h)
    "melatonin": 0.75,   # exogenous oral half-life (~40-60 min)
}

_PROJECTION_HOURS = list(range(0, 73, 12))   # [0, 12, 24, 36, 48, 60, 72]


class DecayRequest(BaseModel):
    substance: str = Field(
        ...,
        examples=["Caffeine", "Melatonin"],
        description="Compound to model. Case-insensitive.",
    )
    dosage: float = Field(
        ...,
        gt=0,
        description="Initial dose in milligrams (must be positive).",
    )
    bone_weight_modifier: float = Field(
        default=4.5,
        gt=0,
        description=(
            "Dimensionless scale factor on the half-life, expressed relative to a "
            "baseline of 4.5 so that the default is a no-op (4.5 / 4.5 = 1.0). "
            "This is a tuning knob for exploring the curve, not a physiological "
            "measurement -- see _calculate_decay for why the earlier bone-mass "
            "reading of this parameter was withdrawn."
        ),
    )


class DecayDataPoint(BaseModel):
    time_hours: int
    remaining_mg: float


class DecayResponse(BaseModel):
    substance: str
    dosage_mg: float
    half_life_hours: float
    effective_half_life_hours: float
    bone_weight_modifier: float
    data_points: list[DecayDataPoint]


def _calculate_decay(
    dosage: float,
    half_life_hours: float,
    bone_weight_modifier: float,
    time_points: list[int],
) -> list[DecayDataPoint]:
    """
    Simulate exponential (first-order) metabolic decay over a series of time points.

    bone_weight_modifier rescales the half-life against a baseline of 4.5:

        effective_half_life = half_life × (bone_weight_modifier / 4.5)

    Formula per time point:
        remaining = dosage × exp(−λ × t),   where λ = ln(2) / effective_half_life

    NOTE ON THE NAME. This parameter does not model skeletal mass, and the
    docstring that said it did has been withdrawn as incorrect. Three things
    were wrong with that reading:

      1. Caffeine distributes into total body water. Bone is mineralised
         matrix with low water content and little perfusion, so skeletal mass
         is not a meaningful determinant of its volume of distribution.
      2. The dominant sources of variation in caffeine half-life are CYP1A2
         activity (genotype, smoking, pregnancy, oral contraceptives), hepatic
         function, and age -- not body composition.
      3. Even given a real Vd term, half-life is not proportional to Vd alone:
         t½ = ln(2) · Vd / CL. Scaling t½ by Vd holds only if clearance is
         held constant, which this function assumes and never stated.

    The arithmetic is unchanged and still does what the formula above says --
    it is an honest scale factor on the curve. Only the claim about what it
    physically represents has been removed. Whether to rename the field or
    drop the parameter entirely is a separate, deliberate decision.
    """
    reference_baseline = 4.5
    effective_half_life = half_life_hours * (bone_weight_modifier / reference_baseline)
    decay_constant = math.log(2) / effective_half_life

    return [
        DecayDataPoint(
            time_hours=t,
            remaining_mg=round(dosage * math.exp(-decay_constant * t), 4),
        )
        for t in time_points
    ]


@api_router.post(
    "/decay",
    summary="Simulate metabolic decay over 72 hours",
    response_model=DecayResponse,
    response_description=(
        "Projected remaining concentration at 12-hour intervals from 0 to 72 hours"
    ),
)
async def simulate_decay(payload: DecayRequest) -> DecayResponse:
    """
    Projects the exponential metabolic decay of a compound over **72 hours**,
    returning concentration estimates at 12-hour intervals.

    Supported substances: `Caffeine`, `Melatonin`.

    The `bone_weight_modifier` (default **4.5**) is a dimensionless scale factor
    on the half-life, not a physiological measurement. Values above the 4.5
    baseline proportionally extend the effective half-life; values below it
    shorten it. See `_calculate_decay` for why this is not a bone-mass model.
    """
    key = payload.substance.strip().lower()
    if key not in _SUBSTANCE_HALF_LIVES:
        supported = ", ".join(s.title() for s in _SUBSTANCE_HALF_LIVES)
        raise HTTPException(
            status_code=422,
            detail=(
                f"Unknown substance '{payload.substance}'. "
                f"Supported values: {supported}."
            ),
        )

    half_life = _SUBSTANCE_HALF_LIVES[key]
    reference_baseline = 4.5
    effective_half_life = half_life * (payload.bone_weight_modifier / reference_baseline)

    data_points = _calculate_decay(
        dosage=payload.dosage,
        half_life_hours=half_life,
        bone_weight_modifier=payload.bone_weight_modifier,
        time_points=_PROJECTION_HOURS,
    )

    return DecayResponse(
        substance=payload.substance.title(),
        dosage_mg=payload.dosage,
        half_life_hours=half_life,
        effective_half_life_hours=round(effective_half_life, 4),
        bone_weight_modifier=payload.bone_weight_modifier,
        data_points=data_points,
    )
