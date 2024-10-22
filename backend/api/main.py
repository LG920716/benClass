from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routers import users, courses, classes, scores, health

app = FastAPI()

# CORS 設置
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

# 註冊路由
app.include_router(users.router, prefix="/users")
app.include_router(courses.router, prefix="/courses")
app.include_router(classes.router, prefix="/classes")
app.include_router(scores.router, prefix="/scores")
app.include_router(health.router)