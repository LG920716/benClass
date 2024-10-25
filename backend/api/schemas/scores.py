from pydantic import BaseModel
from typing import List, Dict

class RoundUpdate(BaseModel):
    round_number: int
    scores: Dict[str, int]  # 例如 {"A": 20, "B": 15}

class MatchUpdate(BaseModel):
    match_number: int
    rounds: List[RoundUpdate]

class ScoreUpdateRequest(BaseModel):
    matches: List[MatchUpdate]

class ScoreCreateRequest(BaseModel):
    class_id: str
    matches: List[MatchUpdate]

class ScoreResponse(BaseModel):
    class_id: str
    matches: List[MatchUpdate]
