from fastapi import APIRouter, HTTPException

router = APIRouter()

# 新增分數
def create_score(class_id, group_scores):
    score_data = {
        "class_id": class_id,
        "group_scores": group_scores.dict()
    }
    fake_data["scores"].append(score_data)

# 更新分數
def update_score(class_id, group, score):
    for score_data in fake_data["scores"]:
        if score_data["class_id"] == class_id:
            score_data["group_scores"][group] = score
            return True
    return False

# 刪除分數
def delete_scores(class_id):
    global fake_data
    new_scores = [score_data for score_data in fake_data["scores"] if score_data["class_id"] != class_id]
    if len(new_scores) == len(fake_data["scores"]):
        return False
    fake_data["scores"] = new_scores
    return True

# 查詢分數
def query_scores_by_class(class_id):
    return next((score_data for score_data in fake_data["scores"] if score_data["class_id"] == class_id), None)
