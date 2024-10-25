from fastapi import HTTPException
from api.daos.scores import ScoreDao
from api.schemas.scores import ScoreCreateRequest, ScoreUpdateRequest, ScoreResponse, MatchUpdate

class ScoreService:
    def __init__(self):
        self.score_dao = ScoreDao()

    def create_score(self, score_request: ScoreCreateRequest) -> ScoreResponse:
        score_data = {
            "class_id": score_request.class_id,
            "matches": [match.model_dump() for match in score_request.matches]
        }
        return self.score_dao.create_score(score_data)

    def update_score(self, class_id: str, score_update: ScoreUpdateRequest) -> ScoreResponse:
        existing_scores = self.score_dao.get_scores_by_class(class_id)

        if not existing_scores:
            raise HTTPException(status_code=404, detail=f"Scores for class ID {class_id} not found")

        existing_scores.matches = score_update.matches

        self.score_dao.update_scores(class_id, existing_scores)
        return ScoreResponse(**existing_scores)

    def delete_score(self, class_id: str) -> str:
        if not self.score_dao.get_score_by_class_id(class_id):
            raise HTTPException(status_code=404, detail=f"Score with class ID {class_id} not found")

        self.score_dao.delete_score(class_id)
        return f"Scores for class ID {class_id} have been successfully deleted."

    def query_score_by_class_id(self, class_id: str) -> ScoreResponse:
        score = self.score_dao.get_score_by_class_id(class_id)
        if not score:
            raise HTTPException(status_code=404, detail=f"Score with class ID {class_id} not found")
        return ScoreResponse(**score)
