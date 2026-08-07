"""Response models for the Half-Life bio-metrics dashboard."""

from pydantic import BaseModel, Field

from .common import ModuleStatus, StatCard


class Supplement(BaseModel):
    """An entry in the active supplement stack."""

    name: str
    dose: str
    frequency: str
    half_life: str = Field(..., description="Elimination half-life, e.g. '36h'")
    purpose: str


class HalfLifeParam(BaseModel):
    """A physiological stressor modelled as first-order decay."""

    param: str
    half_life: str
    category: str
    notes: str


class BioModule(BaseModel):
    """One row of the bio module-status grid. These carry no latency figure."""

    name: str
    status: ModuleStatus


class TrainingEntry(BaseModel):
    """A logged training session."""

    date: str = Field(..., description="ISO date, YYYY-MM-DD")
    type: str
    duration: str
    load: str
    half_life: str = Field(..., description="Recovery half-life for this session")
    decay: str = Field(..., description="Residual fatigue at time of writing")


class BioDashboard(BaseModel):
    """Everything /dashboard/biometrics renders."""

    metric_cards: list[StatCard]
    supplements: list[Supplement]
    halflife_params: list[HalfLifeParam]
    training_log: list[TrainingEntry]
    modules: list[BioModule]
