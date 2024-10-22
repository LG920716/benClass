from api.database import fake_data
from api.schemas.users import User, UserCreateRequest, UserUpdateRequest

class UserDao:
    def register(self, user_register: UserCreateRequest) -> User:
        new_user = {
            "id": user_register.id,
            "name": user_register.name,
            "password": user_register.password,
            "role": user_register.role,
            "gender": user_register.gender,
            "classes_enrolled": [],
            "class_scores": {},
            "total_score": 0
        }

        fake_data["users"].append(new_user)

        return User(
            id=new_user["id"],
            name=new_user["name"],
            password=new_user["password"],
            role=new_user["role"],
            gender=new_user["gender"],
            classes_enrolled=new_user["classes_enrolled"],
            class_scores=new_user["class_scores"],
            total_score=new_user["total_score"]
        )

    def update_user(self, id: str, user_update: UserUpdateRequest) -> bool:
        for user in fake_data["users"]:
            if user["id"] == id:
                user["name"] = user_update.name
                user["password"] = user_update.password
                user["gender"] = user_update.gender
                user["classes_enrolled"] = user_update.classes_enrolled
                user["class_scores"] = user_update.class_scores
                user["total_score"] = user_update.total_score
                return True
        return False

    def delete_user(self, id: str) -> bool:
        for user in fake_data["users"]:
            if user["id"] == id:
                fake_data["users"].remove(user)
                return True
        return False

    def query_users_by_course(self, course_id: str) -> list:
        course = next((course for course in fake_data["courses"] if course["id"] == course_id), None)
        if course:
            enrolled_users = [user for user in fake_data["users"] if user["id"] in course["students"]]
            return enrolled_users
        return []
    
    def get_user_by_id(self, id: str) -> User:
        for user in fake_data["users"]:
            if user["id"] == id:
                return User(
                    id=user["id"],
                    name=user["name"],
                    password=user["password"],
                    role=user["role"],
                    gender=user["gender"],
                    classes_enrolled=user["classes_enrolled"],
                    class_scores=user["class_scores"],
                    total_score=user["total_score"]
                )
        return None
    
    def find_user_by_id(self, user_id: str):
        for user in fake_data["users"]:
            if user["id"] == user_id:
                return user
        return None
