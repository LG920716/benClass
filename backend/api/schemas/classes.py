from pydantic import BaseModel
from datetime import date

class Class(BaseModel):
    id: str
    course_id: str
    date: date
    enrolled_students: list = []
    groups: list[dict[str, list[str]]] = []
    
class ClassUpdateRequest(BaseModel):
    action: str  # ADD, DELETE, UPDATE
    date: date
    student: str = None
    students: list[str] = []