import bcrypt
from api.database import fake_data
from api.database import db
from api.schemas.users import User, UserCreateRequest, UserUpdateRequest, UserResponse

class UserDao:
    collection_name = "users"

    def register(self, user_register: UserCreateRequest) -> UserResponse:
        hashed_password = bcrypt.hashpw(user_register.password.encode('utf-8'), bcrypt.gensalt())
        new_user = {
            "id": user_register.id,
            "name": user_register.name,
            "password": hashed_password.decode('utf-8'),
            "role": user_register.role,
            "gender": user_register.gender,
            "classes_enrolled": [],
            "class_scores": {},
            "total_score": 0
        }

        new_user["id"] = str(new_user["id"])
        doc_ref = db.collection(self.collection_name).document(str(new_user["id"]))
        doc_ref.set(new_user)

        return self.get(new_user["id"])
    
    def get(self, user_id: str) -> UserResponse:
        doc_ref = db.collection(self.collection_name).document(user_id)
        doc = doc_ref.get()

        if doc.exists:
            user_data = doc.to_dict()
            return UserResponse(
                id=user_data["id"],
                name=user_data["name"],
                role=user_data["role"],
                gender=user_data["gender"],
                classes_enrolled=user_data.get("classes_enrolled", []),
                class_scores=user_data.get("class_scores", {}),
                total_score=user_data.get("total_score", 0)
            )
        else:
            raise Exception(f"User with ID {user_id} not found")

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

    def delete_user(self, id: str) -> str:
        doc_ref = db.collection(self.collection_name).document(str(id))
        doc = doc_ref.get()

        if doc.exists:
            doc_ref.delete()
            return f"User with ID {id} has been successfully deleted."
        else:
            return f"User with ID {id} not found."



    def query_users_by_course(self, course_id: str) -> list:
        course = next((course for course in fake_data["courses"] if course["id"] == course_id), None)
        if course:
            enrolled_users = [user for user in fake_data["users"] if user["id"] in course["students"]]
            return enrolled_users
        return []
    
    def find_user_by_id(self, user_id: str):
        user_ref = db.collection(self.collection_name).document(user_id).get()
        if user_ref.exists:
            return user_ref.to_dict()
        return None
