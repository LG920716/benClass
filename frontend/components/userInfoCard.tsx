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
        }}
      >
        {gender == 1 ? (
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
          登出
        </Button>
      </CardActions>
    </Card>
  );
}
