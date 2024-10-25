from fastapi import APIRouter, HTTPException
from api.services.scores import ScoreService
from api.schemas.scores import ScoreCreateRequest, ScoreUpdateRequest, ScoreResponse

router = APIRouter()

score_service = ScoreService()

@router.post("/scores", response_model=ScoreResponse, tags=["score"])
def create_score(score_request: ScoreCreateRequest):
    return score_service.create_score(score_request)

@router.patch("/scores/{class_id}", response_model=ScoreResponse, tags=["score"])
def update_score(class_id: str, score_update: ScoreUpdateRequest):
    try:
        updated_score = score_service.update_score(class_id, score_update)
        return updated_score
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/scores/{class_id}", tags=["score"])
def delete_scores(class_id: str):
    return score_service.delete_scores(class_id)

@router.get("/scores/{class_id}", response_model=ScoreResponse, tags=["score"])
def query_scores_by_class(class_id: str):
    return score_service.query_scores_by_class(class_id)
