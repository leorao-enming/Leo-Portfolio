"""Response models for the LQC quant engine dashboard."""

from enum import Enum

from pydantic import BaseModel, Field

from .common import ModuleHealth, ModuleStatus, StatCard


class SignalDirection(str, Enum):
    LONG = "LONG"
    SHORT = "SHORT"
    NEUTRAL = "NEUTRAL"


class SignalStatus(str, Enum):
    ACTIVE = "ACTIVE"
    TRIGGERED = "TRIGGERED"
    PENDING = "PENDING"
    SCANNING = "SCANNING"


class StrategyStatus(str, Enum):
    ACTIVE = "ACTIVE"
    STAGED = "STAGED"
    RESEARCH = "RESEARCH"
    RETIRED = "RETIRED"


class FlowStepType(str, Enum):
    INPUT = "INPUT"
    INTERNAL = "INTERNAL"
    COMPUTE = "COMPUTE"
    CONTROL = "CONTROL"
    OUTPUT = "OUTPUT"
    CONFIRM = "CONFIRM"


class EngineLayer(BaseModel):
    """One tier of the Python execution stack."""

    layer: str = Field(..., description="Zero-padded ordinal, e.g. '01'")
    name: str
    tech: str = Field(..., description="Implementation stack for this layer")
    description: str
    status: ModuleStatus
    latency: str = "—"


class FlowStep(BaseModel):
    """One hop in the IBKR order lifecycle."""

    step: str
    node: str
    type: FlowStepType
    detail: str


class Strategy(BaseModel):
    """A registered alpha module."""

    name: str
    version: str
    universe: str
    lookback: str
    params: str
    status: StrategyStatus


class Signal(BaseModel):
    """A scored signal emitted by the alpha layer."""

    id: str
    type: str
    asset: str
    direction: SignalDirection
    confidence: str = Field("—", description="Percentage string, or '—' while scanning")
    status: SignalStatus


class QuantDashboard(BaseModel):
    """Everything /dashboard/quant renders."""

    status_cards: list[StatCard]
    engine_layers: list[EngineLayer]
    ibkr_flow: list[FlowStep]
    strategies: list[Strategy]
    signals: list[Signal]
    modules: list[ModuleHealth]
