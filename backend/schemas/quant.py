"""Response models for the LQC quant engine dashboard."""

from enum import Enum

from pydantic import BaseModel, Field

from .common import ModuleHealth, ModuleStatus, StatCard


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
    implementation: str = Field(
        "—",
        description=(
            "Build state of this layer, e.g. 'Implemented' or 'Paper gateway only'. "
            "Deliberately not a latency figure: the project has no benchmark harness, "
            "so quoting one would be inventing a measurement."
        ),
    )


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


class GateCondition(BaseModel):
    """One precondition that must clear before live execution is permitted."""

    label: str
    target: str = Field(..., description="The threshold being measured against")
    met: bool = False


class SafetyGate(BaseModel):
    """
    The interlock standing between the engine and real capital.

    LQC ships with order execution disabled. This is a deliberate engineering
    decision, not an unfinished feature, so the dashboard states it plainly
    rather than implying the engine is trading live.
    """

    flag: str = Field(..., description="The env flag that controls execution")
    flag_value: str
    mode: str = Field(..., description="Human-readable execution mode")
    summary: str
    conditions: list[GateCondition]
    review_date: str


class QuantDashboard(BaseModel):
    """
    Everything /dashboard/quant renders.

    There is deliberately no live-signal feed here. The engine runs against the
    paper gateway with execution gated off, so publishing a table of scored
    signals with confidence percentages would be presenting fabricated state as
    telemetry — and it would contradict the safety gate rendered beside it.
    """

    status_cards: list[StatCard]
    safety_gate: SafetyGate
    engine_layers: list[EngineLayer]
    ibkr_flow: list[FlowStep]
    strategies: list[Strategy]
    modules: list[ModuleHealth]
