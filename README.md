## 啟動前端

## 啟動後端(Windows 要把 bin 換成 Script)
```bash
cd backend
source ../benclass/bin/activate
```

add users (id, name, password, role, gender)
update users (id. name, password, gender, classes_enrolled, class_scores, total_score)
delete users (id)
query users (course＿id)
add courses (id, course_name, teacher_name)
update courses (course_name, teacher_name, students, classes)
delete courses (id)
query courses (id)
add classes (course_id, date, enrolled_students)
update classes (group or enrolled_students)
delete classes (id)
query course (id)
add scores (class_id, group_scores)
update score (class_id, group, score)
delete scores (class_id)
query scores (class_id)
student enroll (id(course_id or class_id), student_id)
generate random code () -> for course or class
groupping (total_group, total_group_people, total_male, total_female)