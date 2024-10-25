from fastapi import APIRouter, Body, HTTPException

from api.schemas.users import User, UserCreateRequest, UserUpdateRequest, UserLoginRequest, UserLoginResponse, UserResponse
from api.services.users import UserService

router = APIRouter()
user_service = UserService()

@router.post("/register", tags=["user"])
def register(user_register: UserCreateRequest = Body(...)) -> UserResponse:
    return user_service.register(user_register)

@router.patch("/update", tags=["user"])
def update_user(user_update: UserUpdateRequest) -> User:
    return user_service.update_user(id, user_update)

@router.delete("/delete/{id}", tags=["user"])
def delete_user(id: str) -> str:
    return user_service.delete_user(id)

@router.get("/query/{course_id}", tags=["user"])
def query_users(course_id: str) -> list[User]:
    return user_service.query_users_by_course(course_id)

@router.post("/login", tags=["user"])
def login(user_login: UserLoginRequest = Body(...)) -> UserLoginResponse:
    user = user_service.login(user_login)
    if user:
        return user
    raise HTTPException(status_code=400, detail="Invalid credentials")