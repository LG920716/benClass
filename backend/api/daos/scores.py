from api.database import db
from api.schemas.scores import ScoreResponse

class ScoreDao:
    collection_name = "scores"

    def create_score(self, score_data: dict) -> ScoreResponse:
        db.collection(self.collection_name).document(score_data["class_id"]).set(score_data)
        return ScoreResponse(**score_data)

    def get_scores_by_class(self, class_id: str) -> ScoreResponse:
        doc_ref = db.collection(self.collection_name).document(class_id)
        doc = doc_ref.get()

        if doc.exists:
            return ScoreResponse(**doc.to_dict())
        return None

    def update_score(self, class_id: str, updated_data: dict):
        doc_ref = db.collection(self.collection_name).document(class_id)
        doc_ref.update(updated_data)

    def delete_scores(self, class_id: str):
        db.collection(self.collection_name).document(class_id).delete()
