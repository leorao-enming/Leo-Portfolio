from fastapi import APIRouter
from typing import Literal

router = APIRouter(
    prefix="/quant",
    tags=["Quant Engine"],
)


@router.get(
    "/status",
    summary="Get trading engine status",
    response_description="Current operational state of the automated trading engine",
)
async def get_engine_status() -> dict:
    """
    Returns the current status of the Leologic automated trading engine.
    Placeholder — replace with real engine state lookup.
    """
    return {
        "engine": "leologic-quant-v1",
        "status": "idle",          # e.g. "running" | "idle" | "error"
        "active_strategies": 0,
        "message": "Engine status endpoint is live. Integration pending.",
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
