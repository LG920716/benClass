from api.database import db
from api.schemas.classes import Class

class ClassDao:
    collection_name = "classes"

    def create_class(self, class_data: Class) -> Class:
        doc_ref = db.collection(self.collection_name).document(class_data.id).set(class_data.model_dump())
        return Class(**class_data.model_dump())

    def get_class_by_id(self, id: str) -> Class:
        doc_ref = db.collection(self.collection_name).document(id)
        doc = doc_ref.get()
        if doc.exists:
            return Class(**doc.to_dict())
        return None

    def update_class(self, id: str, class_data: Class):
        db.collection(self.collection_name).document(id).set(class_data)
        return self.get_class_by_id(id)

    def delete_class(self, id: str):
        db.collection(self.collection_name).document(id).delete()
