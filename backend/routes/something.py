from fastapi import APIRouter

from utils import something_crud as crud
from backend.schemas import Something

router = APIRouter(
    tags=["something"],
    responses={404: {"description": "Endpoint not found!"}},
)

@router.post("/api/something", response_model = Something)
def some_route(some_var: str):
    return crud.somethin_crud(some_var=some_var)