# util.py
from fastapi import HTTPException
from api.services.courses import CourseService
from api.services.classes import ClassService
from api.services.users import UserService
import random
import string

course_service = CourseService()
class_service = ClassService()
user_service = UserService()

def generate_random_code(length=6):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

def validate_enrollment(enroll_type: str, enroll_id: str, student_id: str):
    if not user_service.find_user_by_id(student_id):
        raise HTTPException(status_code=404, detail=f"Student with ID {student_id} not found")
    
    if enroll_type == "COURSE":
        if not course_service.query_course_by_id(enroll_id):
            raise HTTPException(status_code=404, detail=f"Course with ID {enroll_id} not found")
    elif enroll_type == "CLASS":
        if not class_service.query_class_by_id(enroll_id):
            raise HTTPException(status_code=404, detail=f"Class with ID {enroll_id} not found")
    else:
        raise HTTPException(status_code=400, detail="Invalid enroll type. Must be 'COURSE' or 'CLASS'.")

    return True

