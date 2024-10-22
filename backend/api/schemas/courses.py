from pydantic import BaseModel

class Course(BaseModel):
    id: str
    course_name: str
    teacher_name: str
    students: list = []
    classes: list = []