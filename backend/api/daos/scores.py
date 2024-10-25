from api.database import db
from api.schemas.scores import ScoreResponse

class ScoreDao:
    collection_name = "scores"

    def create_score(self, score_data: dict) -> ScoreResponse:
        doc_ref = db.collection(self.collection_name).document(score_data["class_id"])
        doc_ref.set(score_data)
        return ScoreResponse(**score_data)

    def get_score_by_class_id(self, class_id: str) -> dict:
        doc_ref = db.collection(self.collection_name).document(class_id)
        doc = doc_ref.get()
        if doc.exists:
            return doc.to_dict()
        return None

    def get_scores_by_class(self, class_id: str) -> ScoreResponse:
        return self.get_score_by_class_id(class_id)

    def update_scores(self, class_id: str, score_data: ScoreResponse):
        doc_ref = db.collection(self.collection_name).document(class_id)
        doc_ref.set(score_data.model_dump())

    def delete_score(self, class_id: str):
        db.collection(self.collection_name).document(class_id).delete()
