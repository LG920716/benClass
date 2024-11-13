import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { useAuth } from "@/context/AuthContext";

interface UserInfoCardProps {
  userId: string;
  role: string;
  gender: number;
  onLogout: () => void;
}

export default function UserInfoCard({
  userId,
  role,
  gender,
  onLogout,
}: UserInfoCardProps) {
  const auth = useAuth();

  return (
    <Card
      variant="outlined"
      sx={{
        width: 320,
        overflow: "auto",
        resize: "horizontal",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        {gender === 1 ? (
          <Avatar src="/static/images/boy.png" sx={{ width: 56, height: 56 }} />
        ) : (
          <Avatar
            src="/static/images/girl.png"
            sx={{ width: 56, height: 56 }}
          />
        )}
      </Box>
      <CardContent>
        <Typography variant="h6">{userId}</Typography>
        <Typography variant="body2">Role: {role}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" color="secondary" onClick={onLogout}>
          修改資料
        </Button>
        {auth.account.role === "teacher" && (
          <Button variant="outlined" color="secondary" onClick={onLogout}>
            註冊課程（堂）
          </Button>
        )}
        <Button variant="outlined" color="secondary" onClick={onLogout}>
          登出
        </Button>
      </CardActions>
    </Card>
  );
}
