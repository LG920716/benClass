"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Box from "@mui/material/Box";
import { getCourse, getUserByCourseId } from "@/app/api/apis";
import { Course, UserResponse } from "@/interface/types";
import { useRouter, useParams } from "next/navigation";

export default function CourseRankingPage() {
  const auth = useAuth();
  const router = useRouter();
  const params = useParams();
  const [studentList, setStudentList] = useState<UserResponse[] | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (auth.account?.id && params.id) {
      const fetchRankingData = async () => {
        try {
          setLoading(true);
          const courseResponse = await getCourse(params.id as string);
          setCourse(courseResponse);

          const studentsResponse = await getUserByCourseId(params.id as string);

          const sortedStudents = studentsResponse.sort((a, b) => b.total_score - a.total_score);
          setStudentList(sortedStudents);
        } catch (err) {
          setError("無法獲取課程排名資料");
        } finally {
          setLoading(false);
        }
      };

      fetchRankingData();
    }
  }, [auth.account?.id, params.id]);

  useEffect(() => {
    if (auth.account?.id && params.id) {
      const fetchClassList = async () => {
        try {
          setLoading(true);
          const courseResponse = await getCourse(params.id as string);
          setCourse(courseResponse);
        } catch (err) {
          setError("無法獲取課堂資料");
        } finally {
          setLoading(false);
        }
      };

      fetchClassList();
    }
  }, [auth.account?.id, params.id]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 4rem)",
        padding: "1rem",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr",
        gridTemplateAreas: `"ranking classes"`,
        gap: "1rem",
      }}
    >
      {!auth.account?.id ? (
        <Box
          sx={{
            gridArea: "ranking",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "#000",
          }}
        >
          <p>請先登入以查看內容</p>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              gridArea: "ranking",
              bgcolor: "secondary.main",
              borderRadius: 2,
              padding: "1rem",
              overflowY: "auto",
            }}
          >
            <h3>課程排名表</h3>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : studentList ? (
              <table>
                <thead>
                  <tr>
                    <th>排名</th>
                    <th>姓名</th>
                    <th>總分</th>
                  </tr>
                </thead>
                <tbody>
                  {studentList.map((student, index) => (
                    <tr key={student.id}>
                      <td>{index + 1}</td>
                      <td>{student.name}</td>
                      <td>{student.total_score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>目前沒有排名資料</div>
            )}
          </Box>

          <Box
            sx={{
              gridArea: "classes",
              bgcolor: "primary.main",
              borderRadius: 2,
              padding: "1rem",
              overflowY: "auto",
            }}
          >
            <h3>課堂列表</h3>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : course ? (
              <ul>
                {course.classes.map((classId) => (
                  <li key={classId}>
                    {classId}
                  </li>
                ))}
              </ul>
            ) : (
              <div>目前沒有課堂資料</div>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}
