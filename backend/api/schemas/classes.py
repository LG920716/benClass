from pydantic import BaseModel

class Class(BaseModel):
    id: str
    course_id: str
    date: str
    enrolled_students: list = []
    groups: list[dict[str, list[str]]] = []