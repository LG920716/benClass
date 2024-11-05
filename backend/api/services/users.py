import bcrypt
from fastapi import HTTPException
from api.daos.users import UserDao
from api.services.scores import ScoreService
from api.services.classes import ClassService
from api.schemas.users import UserCreateRequest, UserUpdateRequest, UserLoginRequest, UserLoginResponse, UserResponse, UserEnrollRequest
from api.utils import validate_enrollment

class UserService:
    def __init__(self):
        self.user_dao = UserDao()
        self.score_service = ScoreService()
        self.class_service = ClassService()

    def register(self, user_register: UserCreateRequest) -> UserResponse:
        return self.user_dao.register(user_register)

    def update_user(self, id: str, user_update: UserUpdateRequest) -> UserResponse:
        return self.user_dao.update_user(id, user_update)

    def delete_user(self, id: str) -> str:
        return self.user_dao.delete_user(id)

    def query_users_by_course(self, course_id: str) -> list[UserResponse]:
        return self.user_dao.query_users_by_course(course_id)
    
    def find_user_by_id(self, id: str):
        return self.user_dao.find_user_by_id(id)

    def login(self, user_login: UserLoginRequest) -> UserLoginResponse:
        user = self.find_user_by_id(user_login.id)
        if user and bcrypt.checkpw(user_login.password.encode('utf-8'), user["password"].encode('utf-8')):
            return UserLoginResponse(
                id=user["id"],
                name=user["name"],
                role=user["role"]
            )
        return None
        
    def user_enroll(self, id: str, data: UserEnrollRequest) -> str:
        if validate_enrollment(data.enroll_type, data.enroll_id, id):
            if data.enroll_type == "COURSE":
                from api.services.courses import CourseService
                course_service = CourseService()
                enroll_data = {
                    "student": id,
                    "action": "ADD"
                }
                course_service.update_course(data.enroll_id, enroll_data)
            elif data.enroll_type == "CLASS":
                from api.services.classes import ClassService
                class_service = ClassService()
                enroll_data = {
                    "student": id,
                    "action": "ADD"
                }
# 要修改            
            return self.user_dao.user_enroll(id, data)
        
    def score_update(self, user_id: str, class_id: str):
        class_data = self.class_service.query_class_by_id(class_id)
        score_data = self.score_service.query_score_by_class_id(class_id)

        user_group = None
        for group, members in class_data["groups"].items():
            if user_id in members:
                user_group = group
                break
        
        if not user_group:
            raise HTTPException(status_code=404, detail="User group not found in class data")

        total_score = sum(round["score"] for round in score_data["matches"]["rounds"] if round["group"] == user_group)

        user = self.user_dao.find_user_by_id(user_id)
        user["class_scores"][class_id] = total_score
        user["total_score"] += total_score
        self.user_dao.update_user(user_id, user)

        return {"message": f"User {user_id} in group {user_group} has a total score of {total_score} for class {class_id}"}

