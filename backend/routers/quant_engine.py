from fastapi import APIRouter

from content import quant as quant_content
from schemas import QuantDashboard

router = APIRouter(
    prefix="/quant",
    tags=["Quant Engine"],
)


@router.get(
    "/dashboard",
    summary="Full quant dashboard payload",
    response_model=QuantDashboard,
    response_description="Status cards, engine layers, IBKR flow, strategies, and module health",
)
async def get_quant_dashboard() -> QuantDashboard:
    """Everything /dashboard/quant renders, in one round trip."""
    return quant_content.get_dashboard()
