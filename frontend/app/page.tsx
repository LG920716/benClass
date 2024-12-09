"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Box from "@mui/material/Box";
import { getUserById, getCourse } from "./api/apis";
import { UserResponse, Course } from "@/interface/types";
import Logo from "@/components/logo";

export default function GridTemplateAreas() {
  const auth = useAuth();
  const [studentData, setStudentData] = useState<UserResponse | null>(null);
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (auth.account?.id) {
      const fetchStudentData = async () => {
        try {
          setLoading(true);
          const response = await getUserById(auth.account.id);
          setStudentData(response);
        } catch (err) {
          setError("無法獲取學生資料");
        } finally {
          setLoading(false);
        }
      };

      fetchStudentData();
    }
  }, [auth.account?.id]);

  useEffect(() => {
    if (
      studentData?.courses_enrolled &&
      studentData.courses_enrolled.length > 0
    ) {
      const fetchCourseData = async () => {
        try {
          setLoading(true);
          const response = await getCourse(studentData.courses_enrolled[0]);
          setCourseData(response);
        } catch (err) {
          setError("無法獲取課程資料");
        } finally {
          setLoading(false);
        }
      };

      fetchCourseData();
    }
  }, [studentData?.courses_enrolled]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 4rem)",
        padding: "1rem",
        color: "#fff",
        "& > .MuiBox-root > .MuiBox-root": {
          p: 1,
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
        },
      }}
    >
      {!auth.account?.id ? (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "#000",
          }}
        >
          <Logo />
          <p>請先按右上角登入或註冊</p>
        </Box>
      ) : (
        <Box
          sx={{
            height: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 3,
            gridTemplateRows: "auto",
            gridTemplateAreas: `"main sidebar sidebar"
              "main sidebar2 sidebar2"
              "footer footer footer"
              "footer footer footer"`,
          }}
        >
          <Box
            sx={{
              gridArea: "main",
              bgcolor: "secondary.main",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
            }}
          >
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : !studentData ? (
              <div>沒有學生資料</div>
            ) : studentData.courses_enrolled?.length > 0 ? (
              <>
                <h4>課程資訊</h4>
                <p>課程代碼: {courseData?.id}</p>
                <p>課程名稱: {courseData?.course_name}</p>
                <p>教師: {courseData?.teacher_name}</p>
              </>
            ) : (
              <div>請先點擊右上角頭像註冊課程</div>
            )}
          </Box>

          <Box sx={{ gridArea: "sidebar", bgcolor: "error.main" }}>
            <Logo />
          </Box>
          <Box sx={{ gridArea: "sidebar2", bgcolor: "error.main" }}>
            <Logo />
          </Box>
          <Box sx={{ gridArea: "footer", bgcolor: "warning.dark" }}>
            <Logo />
          </Box>
        </Box>
      )}
    </Box>
  );
}
