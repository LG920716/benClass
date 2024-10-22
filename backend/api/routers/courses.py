from api.database import fake_data
from fastapi import APIRouter, HTTPException

router = APIRouter()

# 新增課程
def create_course(course):
    fake_data["courses"].append(course.dict())

# 更新課程
def update_course(id, course_update):
    for course in fake_data["courses"]:
        if course["id"] == id:
            course.update(course_update.dict())
            return True
    return False

# 刪除課程
def delete_course(id):
    global fake_data
    new_courses = [course for course in fake_data["courses"] if course["id"] != id]
    if len(new_courses) == len(fake_data["courses"]):
        return False
    fake_data["courses"] = new_courses
    return True

# 查詢課程
def query_course_by_id(id):
    return next((course for course in fake_data["courses"] if course["id"] == id), None)
