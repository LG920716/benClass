from pydantic import BaseModel
from typing import List, Dict

class User(BaseModel):
    id: str
    name: str
    password: str
    role: str
    gender: int
    courses_enrolled: List[str] = []
    classes_enrolled: List[str] = []
    class_scores: Dict[str, int] = {}
    total_score: int = 0

class UserResponse(BaseModel):
    id: str
    name: str
    role: str
    gender: int
    courses_enrolled: List[str] = []
    classes_enrolled: List[str] = []
    class_scores: Dict[str, int] = {}
    total_score: int = 0

class UserLoginRequest(BaseModel):
    id: str
    password: str

class UserLoginResponse(BaseModel):
    id: str
    name: str
    role: str
    token: str = None

class UserCreateRequest(BaseModel):
    id: str
    name: str
    password: str
    role: str
    gender: int

class UserUpdateRequest(BaseModel):
    name: str = None
    password: str = None
    gender: int = None
    class_scores: Dict[str, int] = {}
    total_score: int = 0
    action: str = None  # UPDATE, UPDATE_SCORE, SCORES_SUM

class UserEnrollRequest(BaseModel):
    enroll_type:str # COURSE, CLASS
    enroll_id: str
