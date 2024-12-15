"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Box from "@mui/material/Box";
import { getUserById, getCourse, getClass } from "./api/apis";  // getClass 用來獲取課堂資訊
import { UserResponse, Course, Class } from "@/interface/types";
import Logo from "@/components/logo";
import ClassEnrollDialog from "@/components/classEnrollDialog";
import { Button } from "@mui/material";

export default function GridTemplateAreas() {
  const auth = useAuth();
  const [studentData, setStudentData] = useState<UserResponse | null>(null);
  const [courseData, setCourseData] = useState<Course | null>(null);  // 用來存儲單個課程資料
  const [classData, setClassData] = useState<Class[]>([]);  // 用來存儲多個課堂資料
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 控制 ClassEnrollDialog 顯示的狀態
  const [dialogOpen, setDialogOpen] = useState(false);

  // 取得學生資料
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

  // 當學生註冊的課程變化時，獲取課程資料
  useEffect(() => {
    if (studentData?.courses_enrolled && studentData.courses_enrolled.length > 0) {
      const fetchCourseData = async () => {
        try {
          setLoading(true);
          // 假設這裡只有一個課程，根據學生註冊的課程 ID 獲取課程資料
          const course = await getCourse(studentData.courses_enrolled[0]);
          setCourseData(course);
        } catch (err) {
          setError("無法獲取課程資料");
        } finally {
          setLoading(false);
        }
      };

      fetchCourseData();
    }
  }, [studentData?.courses_enrolled]);

  // 當學生註冊的課堂變化時，獲取課堂資料
  useEffect(() => {
    if (studentData?.classes_enrolled && studentData.classes_enrolled.length > 0) {
      const fetchClassData = async () => {
        try {
          setLoading(true);
          // 這裡會一次性抓取學生註冊的所有課堂資料
          const classes = await Promise.all(
            studentData.classes_enrolled.map(classId => getClass(classId))
          );
          setClassData(classes);
        } catch (err) {
          setError("無法獲取課堂資料");
        } finally {
          setLoading(false);
        }
      };

      fetchClassData();
    }
  }, [studentData?.classes_enrolled]);

  // 開啟註冊課堂的對話框
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  // 關閉註冊課堂的對話框
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

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

          <Box sx={{ gridArea: "sidebar", bgcolor: "#B5A49A" }}>
            {loading ? <Logo /> : <Logo />}
          </Box>
          <Box sx={{ gridArea: "sidebar2", bgcolor: "#B5A49A" }}>
            {loading ? <Logo /> : <Logo />}
          </Box>

          <Box sx={{ gridArea: "footer", bgcolor: "#A96A41", p: 2 }}>
            {loading ? (
              <Logo />
            ) : (
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpenDialog}
                >
                  註冊課堂
                </Button>
                {studentData?.classes_enrolled && studentData.classes_enrolled.length > 0 && (
                  <div style={{ marginTop: "1rem" }}>
                    <h5>已註冊的課堂</h5>
                    {classData.map(classItem => (
                      <div key={classItem.id}>
                        <p>課堂代碼: {classItem.id}</p>
                      </div>
                    ))}
                  </div>
                )}
              </Box>
            )}

            <ClassEnrollDialog
              open={dialogOpen}
              closeDialog={handleCloseDialog}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
