from fastapi import HTTPException
from api.daos.classes import ClassDao
from api.daos.courses import CourseDao
from api.schemas.classes import Class

class ClassService:
    def __init__(self):
        self.class_dao = ClassDao()
        self.course_dao = CourseDao()

    def create_class(self, class_data: Class) -> Class:
        return self.class_dao.create_class(class_data)

    def update_class(self, id: str, class_update: Class) -> Class:
        existing_class = self.class_dao.get_class_by_id(id)
        if not existing_class:
            raise HTTPException(status_code=404, detail=f"Class with ID {id} not found")

        updated_data = class_update.model_dump()
        existing_class.update(updated_data)

        self.class_dao.update_class(id, existing_class)
        return Class(**existing_class)

    def delete_class(self, id: str) -> str:
        if not self.class_dao.get_class_by_id(id):
            raise HTTPException(status_code=404, detail=f"Class with ID {id} not found")
        
        self.class_dao.delete_class(id)
        return f"Class with ID {id} has been successfully deleted."

    def query_class_by_id(self, id: str) -> Class:
        class_ = self.class_dao.get_class_by_id(id)
        if not class_:
            raise HTTPException(status_code=404, detail=f"Class with ID {id} not found")
        return Class(**class_)
