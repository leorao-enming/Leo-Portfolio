"""Response models for the command-center overview and the activity feed."""

from enum import Enum

from pydantic import BaseModel, Field

from .common import MetricPair, Tone


class ActivityCategory(str, Enum):
    """What kind of work an activity entry records."""

    BUILD = "BUILD"
    RESEARCH = "RESEARCH"
    TRAINING = "TRAINING"
    LEARNING = "LEARNING"
    OPS = "OPS"


class LogLevel(str, Enum):
    INFO = "INFO"
    WARN = "WARN"
    ERROR = "ERROR"


class ActivityEntry(BaseModel):
    """
    One recorded piece of work.

    This is the feed that gets appended to as work actually happens — see
    backend/content/system.py. Entries are stored newest-last and served
    newest-first.
    """

    date: str = Field(..., description="ISO date, YYYY-MM-DD")
    category: ActivityCategory
    level: LogLevel = LogLevel.INFO
    title: str = Field(..., description="One-line summary of what was done")
    detail: str = Field("", description="Optional longer context")
    tags: list[str] = Field(default_factory=list)


class SubsystemSummary(BaseModel):
    """A subsystem card on the command-center overview."""

    id: str = Field(..., description="Canonical codename, e.g. 'LQC-CORE'")
    label: str
    description: str
    href: str
    status_label: str
    tone: Tone = Tone.NEUTRAL
    metrics: list[MetricPair] = Field(default_factory=list)


class SystemOverview(BaseModel):
    """Everything /dashboard renders."""

    subsystems: list[SubsystemSummary]
    activity: list[ActivityEntry]
