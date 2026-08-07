from fastapi import APIRouter, Query

from content import system as system_content
from schemas import ActivityEntry, SystemOverview

router = APIRouter(
    prefix="/system",
    tags=["System"],
)


@router.get(
    "/overview",
    summary="Command-center overview",
    response_model=SystemOverview,
    response_description="Subsystem registry plus the most recent activity entries",
)
async def get_overview(
    activity_limit: int = Query(
        5, ge=1, le=50, description="How many activity entries to include"
    ),
) -> SystemOverview:
    """Powers the /dashboard landing view."""
    return system_content.get_overview(activity_limit=activity_limit)


@router.get(
    "/activity",
    summary="Activity feed",
    response_model=list[ActivityEntry],
    response_description="Recorded work, newest first",
)
async def get_activity(
    limit: int | None = Query(
        None, ge=1, le=200, description="Cap the number of entries returned"
    ),
) -> list[ActivityEntry]:
    """
    The running record of work actually done, sourced from
    `backend/content/system.py`.
    """
    return system_content.get_activity(limit=limit)
