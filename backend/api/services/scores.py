from fastapi import HTTPException
from api.daos.scores import ScoreDao
from api.schemas.scores import ScoreCreateRequest, ScoreUpdateRequest, ScoreResponse

class ScoreService:
    def __init__(self):
        self.score_dao = ScoreDao()

    def create_score(self, score_request: ScoreCreateRequest) -> ScoreResponse:
        new_score = {
            "class_id": score_request.class_id,
            "group_scores": score_request.group_scores
        }
        return self.score_dao.create_score(new_score)

    def update_score(self, class_id: str, score_update: ScoreUpdateRequest) -> ScoreResponse:
        score_data = self.score_dao.get_scores_by_class(class_id)

        if not score_data:
            raise HTTPException(status_code=404, detail=f"Score for class ID {class_id} not found")

        score_data.group_scores[score_update.group] = score_update.score
        self.score_dao.update_score(class_id, {"group_scores": score_data.group_scores})

        return score_data

    def delete_scores(self, class_id: str) -> str:
        score = self.score_dao.get_scores_by_class(class_id)
        if not score:
            raise HTTPException(status_code=404, detail=f"Score for class ID {class_id} not found")

        self.score_dao.delete_scores(class_id)
        return f"Scores for class ID {class_id} have been successfully deleted."

    def query_scores_by_class(self, class_id: str) -> ScoreResponse:
        score = self.score_dao.get_scores_by_class(class_id)
        if not score:
            raise HTTPException(status_code=404, detail=f"Score for class ID {class_id} not found")
        return score
