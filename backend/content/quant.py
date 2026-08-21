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
        label="SIGNAL ENGINE",
        value="v0.2",
        sub="SwingSniper — one strategy lineage, iterated twice, pre-promotion",
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

# The real interaction model is a private Discord bot, not a web dashboard —
# this page visualizes that architecture, it isn't the operator interface
# itself. Layer names and descriptions match the actual LQC_Core modules.
ENGINE_LAYERS = [
    EngineLayer(
        layer="01",
        name="DISCORD OPERATOR CONSOLE",
        tech="Python / discord.py",
        description=(
            "The entire remote-operate interface. Commands like !price, !signal, !backtest, "
            "!kill and !unlock are typed into a private Discord channel; the bot replies with "
            "text or Embeds. There is no separate web front end."
        ),
        status=ModuleStatus.HEALTHY,
        implementation="Implemented",
    ),
    EngineLayer(
        layer="02",
        name="IBKR CONNECTION LAYER",
        tech="Python / ib_insync",
        description=(
            "Maintains the paper-gateway session to Interactive Brokers — live quotes, "
            "historical bars, and account summary, with duration/bar-size validation and "
            "connection timeouts. Read-only; does not place orders on its own."
        ),
        status=ModuleStatus.HEALTHY,
        implementation="Implemented",
    ),
    EngineLayer(
        layer="03",
        name="SAFETY INTERLOCK",
        tech="Python / DataGuard + SafetyState",
        description=(
            "DataGuard grades every incoming bar PASS/WARN/FAIL — blacklisted tickers, "
            "non-positive volume or OHLC values, and snapshot-price deviation over 1% all "
            "fail closed. SafetyState is a persistent kill switch (atomic write to a local "
            "JSON file, survives restarts) that sits in front of the trading logic."
        ),
        status=ModuleStatus.HEALTHY,
        implementation="Implemented",
    ),
    EngineLayer(
        layer="04",
        name="SIGNAL ENGINE",
        tech="Python / pandas",
        description=(
            "SwingSniper technical-indicator strategy — EMA, RSI, MACD, and ATR-based entry "
            "logic. Iterated from v0.1 to a stricter-filter v0.2; both versions remain "
            "backtest-only, neither has been promoted to paper execution."
        ),
        status=ModuleStatus.HEALTHY,
        implementation="Implemented",
    ),
    EngineLayer(
        layer="05",
        name="BACKTEST FRAMEWORK",
        tech="Python / pandas",
        description=(
            "Historical replay with ATR trailing stops, sample-size grading "
            "(INSUFFICIENT / WEAK / PASS / FAIL), 81-combination parameter sweeps, and "
            "per-trade MFE/MAE diagnostics that flag entry, exit, or over-filtering problems."
        ),
        status=ModuleStatus.HEALTHY,
        implementation="Implemented",
    ),
    EngineLayer(
        layer="06",
        name="JOURNAL LEDGER",
        tech="Python / SQLite",
        description=(
            "Local, append-only trade and account log. No external database or hosted "
            "service — the ledger lives on the same machine that runs the bot."
        ),
        status=ModuleStatus.HEALTHY,
        implementation="Implemented",
    ),
    EngineLayer(
        layer="07",
        name="ORDER GATE",
        tech="Python / ib_insync",
        description=(
            "Order construction against the IBKR paper gateway is implemented, but every "
            "path checks ENABLE_ORDER_EXECUTION first. The flag has stayed false through "
            "every commit — the live order path exists in code but has never fired."
        ),
        status=ModuleStatus.STANDBY,
        implementation="Paper gateway only",
    ),
]

COMMAND_FLOW = [
    FlowStep(
        step="01",
        node="DISCORD MESSAGE",
        type=FlowStepType.INPUT,
        detail="Operator types a command in a private channel — e.g. !signal AAPL, !backtest SwingSniper_v0.2",
    ),
    FlowStep(
        step="02",
        node="COMMAND ROUTER",
        type=FlowStepType.INTERNAL,
        detail="discord.py dispatches to the matching handler — connection, journal, safety, signal, or backtest",
    ),
    FlowStep(
        step="03",
        node="DATA GUARD",
        type=FlowStepType.CONTROL,
        detail="Any bar pulled via ib_insync is graded PASS/WARN/FAIL before it reaches strategy logic",
    ),
    FlowStep(
        step="04",
        node="SIGNAL / BACKTEST",
        type=FlowStepType.COMPUTE,
        detail="SwingSniper evaluates indicators, or SniperBacktester replays history with the requested parameters",
    ),
    FlowStep(
        step="05",
        node="ORDER GATE",
        type=FlowStepType.OUTPUT,
        detail="If a command would place a live order: ENABLE_ORDER_EXECUTION check → blocked while false → nothing sent to IBKR",
    ),
    FlowStep(
        step="06",
        node="DISCORD REPLY",
        type=FlowStepType.CONFIRM,
        detail="Result formatted as text/Embed and posted back to the channel; journal entry written to SQLite",
    ),
]

# One real strategy lineage (Sniper -> SwingSniper), not several independent
# alpha models. v0.1 is superseded by v0.2's stricter entry filters; neither
# has cleared the safety gate, so neither is ACTIVE.
STRATEGIES = [
    Strategy(
        name="SwingSniper_v0.1",
        version="0.1.0",
        universe="Equities",
        lookback="Not recorded",
        params="EMA / RSI / MACD / ATR — baseline entry filters",
        status=StrategyStatus.RETIRED,
    ),
    Strategy(
        name="SwingSniper_v0.2",
        version="0.2.0",
        universe="Equities",
        lookback="Not recorded",
        params="EMA / RSI / MACD / ATR — stricter filters, tuned via 81-combination sweep",
        status=StrategyStatus.STAGED,
    ),
]

# "detail" carries build state. The project has no benchmark harness, so the
# previous per-module millisecond figures were fabricated.
MODULES = [
    ModuleHealth(name="DISCORD CONSOLE", status=ModuleStatus.HEALTHY, detail="Implemented"),
    ModuleHealth(name="IBKR CONNECTION", status=ModuleStatus.HEALTHY, detail="Implemented"),
    ModuleHealth(name="SAFETY INTERLOCK", status=ModuleStatus.HEALTHY, detail="Implemented"),
    ModuleHealth(name="SIGNAL ENGINE", status=ModuleStatus.HEALTHY, detail="v0.2"),
    ModuleHealth(name="JOURNAL LEDGER", status=ModuleStatus.HEALTHY, detail="SQLite, local"),
    ModuleHealth(name="BACKTEST VALIDATION", status=ModuleStatus.PENDING, detail="No out-of-sample run yet"),
    ModuleHealth(name="LIVE EXECUTION", status=ModuleStatus.STANDBY, detail="Gated off"),
]


def get_dashboard() -> QuantDashboard:
    """Assemble the full quant dashboard payload."""
    return QuantDashboard(
        status_cards=STATUS_CARDS,
        safety_gate=SAFETY_GATE,
        engine_layers=ENGINE_LAYERS,
        ibkr_flow=COMMAND_FLOW,
        strategies=STRATEGIES,
        modules=MODULES,
    )
