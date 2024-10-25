import bcrypt
from api.daos.users import UserDao
from api.schemas.users import UserCreateRequest, UserUpdateRequest, UserLoginRequest, UserLoginResponse
from api.schemas.users import User, UserResponse

user_dao = UserDao()

class UserService:
    def register(self, user_register: UserCreateRequest) -> UserResponse:
        return user_dao.register(user_register)

    def update_user(self, id: str, user_update: UserUpdateRequest) -> bool:
        return user_dao.update_user(id, user_update)

    def delete_user(self, id: str) -> str:
        return user_dao.delete_user(id)

    def query_users_by_course(self, course_id: str) -> list[User]:
        return user_dao.query_users_by_course(course_id)
    
    def login(self, user_login: UserLoginRequest) -> UserLoginResponse:
        user = user_dao.find_user_by_id(user_login.id)
        if user and bcrypt.checkpw(user_login.password.encode('utf-8'), user["password"].encode('utf-8')):
            return UserLoginResponse(
                id=user["id"],
                name=user["name"],
                role=user["role"]
            )
        return None
