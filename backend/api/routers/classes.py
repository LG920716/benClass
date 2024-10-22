from fastapi import APIRouter, HTTPException

router = APIRouter()

# 新增課程班次
def create_class(class_data):
    fake_data["classes"].append(class_data.dict())

# 更新課程班次
def update_class(id, class_update):
    for class_ in fake_data["classes"]:
        if class_["id"] == id:
            class_.update(class_update.dict())
            return True
    return False

# 刪除課程班次
def delete_class(id):
    global fake_data
    new_classes = [class_ for class_ in fake_data["classes"] if class_["id"] != id]
    if len(new_classes) == len(fake_data["classes"]):
        return False
    fake_data["classes"] = new_classes
    return True

# 查詢課程班次
def query_class_by_id(id):
    return next((class_ for class_ in fake_data["classes"] if class_["id"] == id), None)
