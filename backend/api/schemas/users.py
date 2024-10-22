from pydantic import BaseModel

class User(BaseModel):
    id: str
    name: str
    password: str
    role: str
    gender: int
    classes_enrolled: list = []
    class_scores: dict = {}
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
    gender: str

class UserUpdateRequest(BaseModel):
    id: str
    name: str
    password: str
    gender: str
    classes_enrolled: list
    class_scores: dict
    total_score: int
    action: str # UPDATE, ENROLL_COURSE, ENROLL_CLASS, UPDATE_SCORE, SCORES_SUM