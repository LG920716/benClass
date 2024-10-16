from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

@app.get("/health")
def health_check():
    return "health check complete"

# Mock Data
def get_fake_data():
    users = [{
        "id": "teacher_1",
        "name": "teacher 1",
        "password": "teacher",
        "role": "teacher",
    },
    {
        "id": "user_1",
        "name": "User 1",
        "password": "111",
        "role": "student",
        "gender": 1,
        "classes_enrolled": ["JOSIDH"],
        "class_scores": {
            "JOSIDH": {"BCUYDK": 25, "NCBIYE": 25}
        },
        "total_score": 50
    },
    {
        "id": "user_2",
        "name": "User 2",
        "password": "222",
        "role": "student",
        "gender": 2,
        "classes_enrolled": ["JOSIDH"],
        "class_scores": {
            "JOSIDH": {"BCUYDK": 20, "NCBIYE": 23}
        },
        "total_score": 43
    },
    {
        "id": "user_3",
        "name": "User 3",
        "password": "333",
        "role": "student",
        "gender": 1,
        "classes_enrolled": ["NCUYEF"],
        "class_scores": {
            "NCUYEF": {"CBEUBE": 20, "QOPMSC": 25}
        },
        "total_score": 45
    },
    {
        "id": "user_4",
        "name": "User 4",
        "password": "444",
        "role": "student",
        "gender": 2,
        "classes_enrolled": ["NCUYEF"],
        "class_scores": {
            "NCUYEF": {"CBEUBE": 25, "QOPMSC": 20}
        },
        "total_score": 45
    }]

    courses = [{
            "id": "JOSIDH",
            "course_name": "Volleyball course 1",
            "teacher_name": "teacher_1",
            "students": ["user_1", "user_2"],
            "classes": ["BCUYDK", "NCBIYE"]
        },
        {
            "id": "NCUYEF",
            "course_name": "Volleyball course 2",
            "teacher_name": "teacher_1",
            "students": ["user_3", "user_4"],
            "classes": ["CBEUBE", "QOPMSC"]
        }]

    classes = [
        {
            "id": "BCUYDK",
            "course_id": "JOSIDH",
            "date": "2024-10-08",
            "enrolled_students": ["user_1", "user_2"],
            "groups": [
                {
                    "group_id": "group_1",
                    "members": ["user_1"]
                },
                {
                    "group_id": "group_2",
                    "members": ["user_2"]
                }
            ]
        },
        {
            "id": "NCBIYE",
            "course_id": "JOSIDH",
            "date": "2024-10-15",
            "enrolled_students": ["user_1", "user_2"],
            "groups": [
                {
                    "group_id": "group_1",
                    "members": ["user_2"]
                },
                {
                    "group_id": "group_2",
                    "members": ["user_1"]
                }
            ]
        },
        {
            "id": "CBEUBE",
            "course_id": "NCUYEF",
            "date": "2024-10-08",
            "enrolled_students": ["user_3", "user_4"],
            "groups": [
                {
                    "group_id": "group_1",
                    "members": ["user_3"]
                },
                {
                    "group_id": "group_2",
                    "members": ["user_4"]
                }
            ]
        },
        {
            "id": "QOPMSC",
            "course_id": "NCUYEF",
            "date": "2024-10-15",
            "enrolled_students": ["user_3", "user_4"],
            "groups": [
                {
                    "group_id": "group_1",
                    "members": ["user_3"]
                },
                {
                    "group_id": "group_2",
                    "members": ["user_4"]
                }
            ]
        }
    ]

    # 新增獨立的分數集合來簡化查詢和更新
    scores = [
        {
            "class_id": "BCUYDK",
            "group_scores": {
                "group_1": 25,
                "group_2": 20
            }
        },
        {
            "class_id": "NCBIYE",
            "group_scores": {
                "group_1": 23,
                "group_2": 25
            }
        },
        {
            "class_id": "CBEUBE",
            "group_scores": {
                "group_1": 20,
                "group_2": 25
            }
        },
        {
            "class_id": "QOPMSC",
            "group_scores": {
                "group_1": 25,
                "group_2": 20
            }
        }
    ]

    return {"users": users, "courses": courses, "classes": classes, "scores": scores}

# 測試函數
fake_data = get_fake_data()
print(fake_data)