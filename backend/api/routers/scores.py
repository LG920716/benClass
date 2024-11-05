from fastapi import APIRouter, HTTPException
from api.services.scores import ScoreService
from api.schemas.scores import ScoreCreateRequest, ScoreUpdateRequest, ScoreResponse

router = APIRouter()
score_service = ScoreService()

@router.patch("/{class_id}", response_model=ScoreResponse, tags=["score"])
def update_score(class_id: str, score_update: ScoreUpdateRequest):
    return score_service.update_score(class_id, score_update)

@router.get("/{class_id}", response_model=ScoreResponse, tags=["score"])
def query_score_by_class_id(class_id: str):
    return score_service.query_score_by_class_id(class_id)
