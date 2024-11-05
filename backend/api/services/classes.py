from random import shuffle
from fastapi import HTTPException
from api.daos.classes import ClassDao
from api.daos.scores import ScoreDao
from api.schemas.classes import Class, ClassUpdateRequest
from api.utils import generate_random_code

class ClassService:
    def __init__(self):
        self.class_dao = ClassDao()
        self.score_dao = ScoreDao() 

    def create_class(self, class_data: Class) -> Class:
        new_class = {
            "id": generate_random_code(),
            "course_id": class_data.course_id,
            "date": class_data.date,
            "enrolled_students": [],
            "groups": []
        }
        created_class = self.class_dao.create_class(new_class)
        score_data = {
            "class_id": created_class.id,
            "matches": []
        }
        self.score_dao.create_score(score_data)
        return created_class

    def update_class(self, class_id: str, class_update: ClassUpdateRequest) -> Class:
        class_data = self.class_dao.get_class_by_id(class_id)
        if not class_data:
            raise HTTPException(status_code=404, detail=f"Class with ID {class_id} not found")

        if class_update.action == "ADD":
            if class_update.student and class_update.student not in class_data.enrolled_students:
                class_data.enrolled_students.append(class_update.student)
            class_data.enrolled_students.extend([s for s in class_update.students if s not in class_data.enrolled_students])

        elif class_update.action == "DELETE":
            if class_update.student in class_data.enrolled_students:
                class_data.enrolled_students.remove(class_update.student)
            class_data.enrolled_students = [s for s in class_data.enrolled_students if s not in class_update.students]

        elif class_update.action == "UPDATE":
            if class_update.date:
                class_data.date = class_update.date

        return self.class_dao.update_class(class_id, class_data.model_dump())

    def delete_class(self, id: str) -> str:
        self.score_dao.delete_score(id)
        return self.class_dao.delete_class(id)

    def query_class_by_id(self, id: str) -> Class:
        class_ = self.class_dao.get_class_by_id(id)
        if not class_:
            raise HTTPException(status_code=404, detail=f"Class with ID {id} not found")
        return Class(**class_)
    
    def grouping(self, id: str):
        from api.services.users import UserService
        user_service = UserService()
        class_data = self.class_dao.get_class_by_id(id)
        enrolled_students = class_data["enrolled_students"]
        
        team_count = max(1, len(enrolled_students) // 6)
        students = [user_service.find_user_by_id(student_id) for student_id in enrolled_students]
        
        boys = [s for s in students if s['gender'] == 1]
        girls = [s for s in students if s['gender'] == 2]
        
        boys_per_team = len(boys) // team_count
        girls_per_team = len(girls) // team_count
        
        teams = [[] for _ in range(team_count)]
        
        for i in range(team_count):
            teams[i].extend(boys[i * boys_per_team: (i + 1) * boys_per_team])
        
        for i in range(team_count):
            teams[i].extend(girls[i * girls_per_team: (i + 1) * girls_per_team])
        
        remaining_students = boys[team_count * boys_per_team:] + girls[team_count * girls_per_team:]
        shuffle(remaining_students)
        for i, student in enumerate(remaining_students):
            teams[i % team_count].append(student)
        
        grouped_data = [{"team": idx + 1, "members": [student['id'] for student in team]} for idx, team in enumerate(teams)]
        class_data["groups"] = grouped_data
        self.class_dao.update_class(id, class_data)
        
        return grouped_data
