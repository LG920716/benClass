"use client";
import { useState, useEffect } from 'react';
import { useAuth } from "@/context/AuthContext";
import Box, { BoxProps } from '@mui/material/Box';
import { getCourseByTeacher } from '../api/apis';

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={[
        (theme) => ({
          bgcolor: '#fff',
          color: 'grey.800',
          border: '1px solid',
          borderColor: 'grey.300',
          p: 1,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          ...theme.applyStyles('dark', {
            bgcolor: '#101010',
            color: 'grey.300',
            borderColor: 'grey.800',
          }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
}

export default function Gap() {
  const auth = useAuth();
  const [courses, setCourses] = useState<any[]>([]); // 存儲課程列表
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (auth.account?.id) {
      const fetchCourses = async () => {
        try {
          setLoading(true);
          const response = await getCourseByTeacher(auth.account.name);
          setCourses(response);  // 假設 API 返回的是課程列表
        } catch (err) {
          setError("無法獲取課程資料");
        } finally {
          setLoading(false);
        }
      };

      fetchCourses();
    }
  }, [auth.account?.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ display: 'grid', gap: 1, gridTemplateColumns: 'repeat(2, 1fr)' }}>
        {courses.map((course, index) => (
          <Item key={index}>{course.name}</Item>  // 假設每個課程有 `name` 屬性
        ))}
      </Box>
    </div>
  );
}
