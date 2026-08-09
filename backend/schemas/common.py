"""Shared value types used across every dashboard payload."""

from enum import Enum

from pydantic import BaseModel, Field


class Tone(str, Enum):
    """
    Semantic colour intent.

    The API deliberately does not emit CSS class names — the frontend owns the
    mapping from tone to presentation.
    """

    GREEN = "green"
    AMBER = "amber"
    CYAN = "cyan"
    RED = "red"
    NEUTRAL = "neutral"


class ModuleStatus(str, Enum):
    """Operational state of a subsystem module."""

    HEALTHY = "HEALTHY"
    ACTIVE = "ACTIVE"
    STANDBY = "STANDBY"
    PENDING = "PENDING"
    ERROR = "ERROR"


class StatCard(BaseModel):
    """A single headline figure on a dashboard."""

    label: str = Field(..., description="Short uppercase caption, e.g. 'ENGINE STATUS'")
    value: str = Field(..., description="Headline value. Use '—' when unknown.")
    sub: str = Field("", description="Supporting line rendered beneath the value")
    tone: Tone = Tone.NEUTRAL


class MetricPair(BaseModel):
    """A compact key/value shown in subsystem summary cards."""

    key: str
    value: str


class ModuleHealth(BaseModel):
    """One row of a module-health grid."""

    name: str
    status: ModuleStatus
    detail: str = Field(
        "—",
        description=(
            "What is actually known about this module — implementation state or a "
            "measured figure. Never a performance number the project has not measured."
        ),
    )
