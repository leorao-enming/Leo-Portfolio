"""
LQC quant engine content.

Edit this file to change what /dashboard/quant shows. Values are built as
typed models, so a typo fails at import rather than silently reaching the UI.
"""

from schemas import (
    EngineLayer,
    FlowStep,
    FlowStepType,
    ModuleHealth,
    ModuleStatus,
    QuantDashboard,
    Signal,
    SignalDirection,
    SignalStatus,
    StatCard,
    Strategy,
    StrategyStatus,
    Tone,
)

STATUS_CARDS = [
    StatCard(
        label="ENGINE STATUS",
        value="STANDBY",
        sub="Awaiting live feed integration",
        tone=Tone.AMBER,
    ),
    StatCard(
        label="ACTIVE SIGNALS",
        value="14",
        sub="Momentum + Mean-Reversion",
        tone=Tone.GREEN,
    ),
    StatCard(
        label="OPEN POSITIONS",
        value="3",
        sub="Risk-managed exposure",
        tone=Tone.GREEN,
    ),
    StatCard(
        label="RISK MODE",
        value="CONSERVATIVE",
        sub="Max drawdown: 2% per session",
        tone=Tone.CYAN,
    ),
]

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
        latency="< 5ms",
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
        latency="< 12ms",
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
        latency="< 2ms",
    ),
    EngineLayer(
        layer="04",
        name="EXECUTION ENGINE",
        tech="Python / ib_insync / IBKR TWS API",
        description=(
            "Translates approved signal objects into IBKR order types (MKT, LMT, VWAP). "
            "Handles partial fills, re-queuing, and execution confirmation acknowledgement."
        ),
        status=ModuleStatus.STANDBY,
        latency="N/A",
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
        latency="< 8ms",
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
        latency="—",
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
            "Approved signals → construct IBKR Order object → place via ib_insync "
            "placeOrder() → await fill event"
        ),
    ),
    FlowStep(
        step="06",
        node="FILL HANDLER",
        type=FlowStepType.CONFIRM,
        detail="On execDetails event: update position ledger, log execution, emit to Portfolio Tracker",
    ),
]

STRATEGIES = [
    Strategy(
        name="momentum_v3",
        version="3.2.1",
        universe="Crypto / Equities",
        lookback="20 bars",
        params="ema_fast=8, ema_slow=21",
        status=StrategyStatus.ACTIVE,
    ),
    Strategy(
        name="mean_rev_zscore",
        version="1.4.0",
        universe="Equity Pairs",
        lookback="60 bars",
        params="z_entry=2.0, z_exit=0.5",
        status=StrategyStatus.ACTIVE,
    ),
    Strategy(
        name="breakout_vol",
        version="2.0.0",
        universe="Equities",
        lookback="14 bars",
        params="atr_mult=1.5, vol_filter=True",
        status=StrategyStatus.STAGED,
    ),
    Strategy(
        name="stat_arb_pairs",
        version="0.9.0",
        universe="Crypto",
        lookback="120 bars",
        params="coint_pval=0.05",
        status=StrategyStatus.RESEARCH,
    ),
]

SIGNALS = [
    Signal(
        id="SIG-001",
        type="MOMENTUM",
        asset="BTC/USD",
        direction=SignalDirection.LONG,
        confidence="74%",
        status=SignalStatus.ACTIVE,
    ),
    Signal(
        id="SIG-002",
        type="MEAN-REV",
        asset="ETH/USD",
        direction=SignalDirection.SHORT,
        confidence="61%",
        status=SignalStatus.ACTIVE,
    ),
    Signal(
        id="SIG-003",
        type="BREAKOUT",
        asset="SPY",
        direction=SignalDirection.LONG,
        confidence="88%",
        status=SignalStatus.TRIGGERED,
    ),
    Signal(
        id="SIG-004",
        type="MOMENTUM",
        asset="QQQ",
        direction=SignalDirection.LONG,
        confidence="55%",
        status=SignalStatus.PENDING,
    ),
    Signal(
        id="SIG-005",
        type="ARB",
        asset="BTC-ETH",
        direction=SignalDirection.NEUTRAL,
        confidence="—",
        status=SignalStatus.SCANNING,
    ),
]

MODULES = [
    ModuleHealth(name="DATA INGESTION", status=ModuleStatus.HEALTHY, latency="< 5ms"),
    ModuleHealth(name="SIGNAL PROCESSOR", status=ModuleStatus.HEALTHY, latency="< 12ms"),
    ModuleHealth(name="EXECUTION ENGINE", status=ModuleStatus.STANDBY, latency="N/A"),
    ModuleHealth(name="RISK MANAGER", status=ModuleStatus.HEALTHY, latency="< 2ms"),
    ModuleHealth(name="PORTFOLIO TRACKER", status=ModuleStatus.HEALTHY, latency="< 8ms"),
    ModuleHealth(name="LIVE FEED (EXT)", status=ModuleStatus.PENDING, latency="N/A"),
]


def get_dashboard() -> QuantDashboard:
    """Assemble the full quant dashboard payload."""
    return QuantDashboard(
        status_cards=STATUS_CARDS,
        engine_layers=ENGINE_LAYERS,
        ibkr_flow=IBKR_FLOW,
        strategies=STRATEGIES,
        signals=SIGNALS,
        modules=MODULES,
    )
