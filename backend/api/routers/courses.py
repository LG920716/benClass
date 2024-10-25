from fastapi import APIRouter, HTTPException
from api.services.courses import CourseService
from api.schemas.courses import CourseCreateRequest, CourseUpdateRequest, CourseResponse

router = APIRouter()

course_service = CourseService()

@router.post("", response_model=CourseResponse, tags=["course"])
def create_course(course_request: CourseCreateRequest):
    return course_service.create_course(course_request)

@router.patch("/{course_id}", response_model=CourseResponse, tags=["course"])
def update_course(course_id: str, course_update: CourseUpdateRequest):
    try:
        updated_course = course_service.update_course(course_id, course_update)
        return updated_course
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{course_id}", tags=["course"])
def delete_course(course_id: str):
    return course_service.delete_course(course_id)

@router.get("/{course_id}", response_model=CourseResponse, tags=["course"])
def query_course_by_id(course_id: str):
    return course_service.query_course_by_id(course_id)