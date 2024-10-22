from pydantic import BaseModel

class Score(BaseModel):
    class_id: str
    group_scores: dict