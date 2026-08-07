from fastapi import APIRouter

from content import quant as quant_content
from schemas import ModuleStatus, QuantDashboard, StrategyStatus

router = APIRouter(
    prefix="/quant",
    tags=["Quant Engine"],
)


@router.get(
    "/dashboard",
    summary="Full quant dashboard payload",
    response_model=QuantDashboard,
    response_description="Status cards, engine layers, IBKR flow, strategies, signals, and module health",
)
async def get_quant_dashboard() -> QuantDashboard:
    """Everything /dashboard/quant renders, in one round trip."""
    return quant_content.get_dashboard()


@router.get(
    "/status",
    summary="Get trading engine status",
    response_description="Current operational state of the automated trading engine",
)
async def get_engine_status() -> dict:
    """
    Returns the current status of the Leologic automated trading engine.

    Strategy and module counts are derived from the registry in
    `content/quant.py` so this endpoint cannot drift from the dashboard.
    """
    active_strategies = sum(
        1 for s in quant_content.STRATEGIES if s.status == StrategyStatus.ACTIVE
    )
    execution_standby = any(
        m.name == "EXECUTION ENGINE" and m.status == ModuleStatus.STANDBY
        for m in quant_content.MODULES
    )

    return {
        "engine": "leologic-quant-v1",
        "status": "standby" if execution_standby else "running",
        "active_strategies": active_strategies,
        "registered_strategies": len(quant_content.STRATEGIES),
        "active_signals": len(quant_content.SIGNALS),
        "message": "Engine status endpoint is live. Broker integration pending.",
    }


@router.get(
    "/ibkr/connection",
    summary="Get IBKR API connection state",
    response_description="Current connection state between the backend and Interactive Brokers TWS/Gateway",
)
async def get_ibkr_connection_state() -> dict:
    """
    Returns whether the backend currently has an active connection to the
    Interactive Brokers TWS or IB Gateway API.
    Placeholder — replace with real IB connection probe.
    """
    return {
        "broker": "IBKR",
        "connected": False,         # True when IB socket is established
        "host": "127.0.0.1",
        "port": 7497,               # 7497 = TWS paper / 7496 = TWS live / 4002 = Gateway
        "client_id": 1,
        "message": "IBKR connection endpoint is live. IB client integration pending.",
    }
