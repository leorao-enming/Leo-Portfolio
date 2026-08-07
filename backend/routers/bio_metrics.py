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
_SUBSTANCE_HALF_LIVES: dict[str, float] = {
    "creatine":          3.0,   # plasma clearance post-loading (~2-4 h)
    "vitamin d3":       24.0,   # initial distribution half-life (~24 h)
    "omega-3":           1.5,   # EPA/DHA plasma half-life (~1-2 h)
    "artichoke extract": 2.5,   # cynarin / luteolin clearance (~2-3 h)
}

_PROJECTION_HOURS = list(range(0, 73, 12))   # [0, 12, 24, 36, 48, 60, 72]


class DecayRequest(BaseModel):
    substance: str = Field(
        ...,
        examples=["Creatine", "Vitamin D3", "Omega-3", "Artichoke Extract"],
        description="Supplement or compound to model. Case-insensitive.",
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
            "Physiological baseline parameter (default 4.5 kg). "
            "Acts as a variance multiplier on the effective decay rate: "
            "higher bone mass slightly slows clearance via increased volume of distribution."
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

    The bone_weight_modifier rescales the effective half-life relative to the
    reference baseline of 4.5 kg.  A heavier skeletal mass increases the apparent
    volume of distribution, proportionally extending the effective half-life:

        effective_half_life = half_life × (bone_weight_modifier / 4.5)

    Formula per time point:
        remaining = dosage × exp(−λ × t),   where λ = ln(2) / effective_half_life
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
    Projects the exponential metabolic decay of a supplement over **72 hours**,
    returning concentration estimates at 12-hour intervals.

    Supported substances: `Creatine`, `Vitamin D3`, `Omega-3`, `Artichoke Extract`.

    The `bone_weight_modifier` (default **4.5 kg**) acts as a physiological
    volume-of-distribution proxy.  Values above the baseline proportionally extend
    the effective half-life; values below it accelerate clearance.
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
