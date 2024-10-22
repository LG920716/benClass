from api.database import fake_data

# 查詢用戶
def query_users_by_course(course_id):
    course = next((course for course in fake_data["courses"] if course["id"] == course_id), None)
    if course:
        return [user for user in fake_data["users"] if user["id"] in course["students"]]
    return []

# 新增用戶
def create_user(user):
    fake_data["users"].append(user.dict())

# 更新用戶
def update_user(id, user_update):
    for user in fake_data["users"]:
        if user["id"] == id:
            user.update(user_update.dict())
            return True
    return False

# 刪除用戶
def delete_user(id):
    global fake_data
    new_users = [user for user in fake_data["users"] if user["id"] != id]
    if len(new_users) == len(fake_data["users"]):
        return False
    fake_data["users"] = new_users
    return True
