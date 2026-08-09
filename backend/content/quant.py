"""
LQC quant engine content.

Edit this file to change what /dashboard/quant shows. Values are built as
typed models, so a typo fails at import rather than silently reaching the UI.
"""

from schemas import (
    EngineLayer,
    FlowStep,
    FlowStepType,
    GateCondition,
    ModuleHealth,
    ModuleStatus,
    QuantDashboard,
    SafetyGate,
    StatCard,
    Strategy,
    StrategyStatus,
    Tone,
)

# Headline figures describe the state of the build, not a live trading floor.
# Position counts, signal counts, and latency figures were removed: the engine
# has no live capital, no benchmark harness, and 0 of 4 validation gates
# cleared, so any such number would have been invented.
STATUS_CARDS = [
    StatCard(
        label="EXECUTION MODE",
        value="PAPER ONLY",
        sub="Live order routing disabled by design",
        tone=Tone.AMBER,
    ),
    StatCard(
        label="PROJECT PHASE",
        value="BACKTEST VALIDATION",
        sub="Strategy set not yet cleared for promotion",
        tone=Tone.CYAN,
    ),
    StatCard(
        label="SAFETY GATE",
        value="0 / 4 CLEARED",
        sub="Live execution stays gated until all four pass",
        tone=Tone.AMBER,
    ),
    StatCard(
        label="STRATEGY MODELS",
        value="4",
        sub="Implemented in the registry, all pre-promotion",
        tone=Tone.GREEN,
    ),
]

# Mirrors the "Keep LQC Live Trading Disabled" decision record. Live execution
# is gated behind measurable criteria rather than a ship date, so the dashboard
# publishes the gate instead of implying the engine trades real capital.
SAFETY_GATE = SafetyGate(
    flag="ENABLE_ORDER_EXECUTION",
    flag_value="false",
    mode="PAPER / RESEARCH",
    summary=(
        "Live order execution stays off until the strategy set clears validation. "
        "This is a standing engineering decision, not an unfinished feature — the "
        "order path is implemented and tested against the paper gateway."
    ),
    conditions=[
        GateCondition(
            label="Full-universe backtest",
            target="Sharpe > 1.5",
            met=False,
        ),
        GateCondition(
            label="Risk module stress test",
            target="Pass under simulated shock scenarios",
            met=False,
        ),
        GateCondition(
            label="Paper trading track record",
            target="90 consecutive profitable days",
            met=False,
        ),
        GateCondition(
            label="Capital management rules",
            target="Documented and version-controlled",
            met=False,
        ),
    ],
    review_date="2026-Q4",
)

ENGINE_LAYERS = [
    EngineLayer(
        layer="01",
        name="DATA INGESTION LAYER",
        tech="Python / asyncio / aiohttp",
        description=(
            "Streams live OHLCV, order book depth, and macro event feeds. Normalises tick "
            "data into a unified internal schema before dispatch."
        ),
        status=ModuleStatus.HEALTHY,
        implementation="Implemented",
    ),
    EngineLayer(
        layer="02",
        name="SIGNAL PROCESSOR",
        tech="Python / NumPy / pandas",
        description=(
            "Runs configurable alpha models — momentum, mean-reversion, breakout, and "
            "statistical arbitrage. Outputs scored signal objects with confidence metrics."
        ),
        status=ModuleStatus.HEALTHY,
        implementation="Implemented",
    ),
    EngineLayer(
        layer="03",
        name="RISK MANAGER",
        tech="Python / scipy",
        description=(
            "Pre-trade risk gate. Enforces position limits, max drawdown thresholds, "
            "correlation constraints, and Kelly fraction sizing before any order is dispatched."
        ),
        status=ModuleStatus.HEALTHY,
        implementation="Implemented",
    ),
    EngineLayer(
        layer="04",
        name="EXECUTION ENGINE",
        tech="Python / ib_insync / IBKR paper gateway",
        description=(
            "Translates approved signal objects into IBKR order types (MKT, LMT, VWAP) and "
            "handles partial fills, re-queuing, and confirmation acknowledgement. Routes to "
            "the paper gateway only — ENABLE_ORDER_EXECUTION gates the live path."
        ),
        status=ModuleStatus.STANDBY,
        implementation="Paper gateway only",
    ),
    EngineLayer(
        layer="05",
        name="PORTFOLIO TRACKER",
        tech="Python / SQLite / FastAPI",
        description=(
            "Maintains real-time P&L ledger, position register, and attribution analytics. "
            "Exposes internal REST API consumed by the LEOLOGIC OS dashboard."
        ),
        status=ModuleStatus.HEALTHY,
        implementation="Implemented",
    ),
    EngineLayer(
        layer="06",
        name="STRATEGY REGISTRY",
        tech="Python / YAML config",
        description=(
            "Version-controlled strategy library. Each strategy is a self-contained module "
            "with defined alpha logic, parameter space, and backtest metadata."
        ),
        status=ModuleStatus.HEALTHY,
        implementation="Implemented",
    ),
]

IBKR_FLOW = [
    FlowStep(
        step="01",
        node="MARKET FEED",
        type=FlowStepType.INPUT,
        detail="IBKR TWS Market Data → ib_insync subscription → normalised tick/bar objects",
    ),
    FlowStep(
        step="02",
        node="DATA BUS",
        type=FlowStepType.INTERNAL,
        detail=(
            "asyncio queue dispatches normalised data to Signal Processor and Portfolio "
            "Tracker concurrently"
        ),
    ),
    FlowStep(
        step="03",
        node="ALPHA MODEL",
        type=FlowStepType.COMPUTE,
        detail=(
            "Strategy modules consume bar data → compute indicators → emit "
            "ScoredSignal(asset, dir, confidence, expiry)"
        ),
    ),
    FlowStep(
        step="04",
        node="RISK GATE",
        type=FlowStepType.CONTROL,
        detail=(
            "RiskManager validates ScoredSignal against portfolio state, drawdown limits, "
            "and position caps"
        ),
    ),
    FlowStep(
        step="05",
        node="ORDER ROUTER",
        type=FlowStepType.OUTPUT,
        detail=(
            "Approved signals → construct IBKR Order object → ENABLE_ORDER_EXECUTION check → "
            "placeOrder() against the paper gateway (live path gated off)"
        ),
    ),
    FlowStep(
        step="06",
        node="FILL HANDLER",
        type=FlowStepType.CONFIRM,
        detail="On execDetails event: update position ledger, log execution, emit to Portfolio Tracker",
    ),
]

# No strategy is marked ACTIVE: nothing has cleared the safety gate, so the
# strongest honest status is STAGED — implemented and running in backtest.
STRATEGIES = [
    Strategy(
        name="momentum_v3",
        version="0.3.0",
        universe="Crypto / Equities",
        lookback="20 bars",
        params="ema_fast=8, ema_slow=21",
        status=StrategyStatus.STAGED,
    ),
    Strategy(
        name="mean_rev_zscore",
        version="0.2.0",
        universe="Equity Pairs",
        lookback="60 bars",
        params="z_entry=2.0, z_exit=0.5",
        status=StrategyStatus.STAGED,
    ),
    Strategy(
        name="breakout_vol",
        version="0.2.0",
        universe="Equities",
        lookback="14 bars",
        params="atr_mult=1.5, vol_filter=True",
        status=StrategyStatus.STAGED,
    ),
    Strategy(
        name="stat_arb_pairs",
        version="0.1.0",
        universe="Crypto",
        lookback="120 bars",
        params="coint_pval=0.05",
        status=StrategyStatus.RESEARCH,
    ),
]

# "detail" carries build state. The project has no benchmark harness, so the
# previous per-module millisecond figures were fabricated.
MODULES = [
    ModuleHealth(name="DATA INGESTION", status=ModuleStatus.HEALTHY, detail="Implemented"),
    ModuleHealth(name="SIGNAL PROCESSOR", status=ModuleStatus.HEALTHY, detail="Implemented"),
    ModuleHealth(name="RISK MANAGER", status=ModuleStatus.HEALTHY, detail="Implemented"),
    ModuleHealth(name="PORTFOLIO TRACKER", status=ModuleStatus.HEALTHY, detail="Implemented"),
    ModuleHealth(name="CONTAINER RUNTIME", status=ModuleStatus.HEALTHY, detail="Docker"),
    ModuleHealth(name="BACKTEST VALIDATION", status=ModuleStatus.PENDING, detail="In progress"),
    ModuleHealth(name="LIVE EXECUTION", status=ModuleStatus.STANDBY, detail="Gated off"),
]


def get_dashboard() -> QuantDashboard:
    """Assemble the full quant dashboard payload."""
    return QuantDashboard(
        status_cards=STATUS_CARDS,
        safety_gate=SAFETY_GATE,
        engine_layers=ENGINE_LAYERS,
        ibkr_flow=IBKR_FLOW,
        strategies=STRATEGIES,
        modules=MODULES,
    )
