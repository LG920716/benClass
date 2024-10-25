from pydantic import BaseModel
from typing import Dict

class ScoreCreateRequest(BaseModel):
    class_id: str
    group_scores: Dict[str, int]

class ScoreUpdateRequest(BaseModel):
    group: str
    score: int

class ScoreResponse(BaseModel):
    class_id: str
    group_scores: Dict[str, int]