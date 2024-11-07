"use client";
import { AppBar, Avatar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import UserLoginDialog from "./userLoginDialog";
import { useState } from "react";
import { loginUser } from "../app/api/apis";
import UserInfoCard from "./userInfoCard";

export default function Menu() {
  const router = useRouter();
  const pathname = usePathname();
  const auth = useAuth();

  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [credentials, setCredentials] = useState({ id: "", password: "", gender: 0 });
  const [openUserInfo, setOpenUserInfo] = useState(false);

  const handleLoginDialogOpen = () => {
    setOpenLoginDialog(true);
  };

  const handleLoginDialogClose = () => {
    setOpenLoginDialog(false);
    setCredentials((prev) => ({ id: "", password: "", gender: 0 }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser({
        id: credentials.id,
        password: credentials.password,
      });
      const { id, role, gender } = response;
      auth.login(id, role, gender);
      handleLoginDialogClose();
    } catch (error) {
      console.error("登入失敗", error);
    }
  };

  const handleLogout = () => {
    auth.logout();
    setOpenUserInfo(false);
  };

  const handleAvatarClick = () => {
    setOpenUserInfo(!openUserInfo);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button
          color="inherit"
          variant={pathname === "/" ? "outlined" : "text"}
          onClick={() => router.push("/")}
        >
          VolleyMate
        </Button>
        <Button
          color="inherit"
          variant={pathname === "/product" ? "outlined" : "text"}
          onClick={() => router.push("/product")}
        >
          產品管理
        </Button>
        {auth.account.role === "teacher" ? (
          <Button
            color="inherit"
            variant={pathname === "/product" ? "outlined" : "text"}
            onClick={() => router.push("/product")}
          >
            權限管理
          </Button>
        ) : null}
        {auth.account.id ? (
          <>
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="User Avatar"
                src="../static/images/user.png"
                onClick={handleAvatarClick}
                sx={{ cursor: 'pointer' }}
              />
            </Stack>
            {openUserInfo && (
              <UserInfoCard
                userId={auth.account.id}
                role={auth.account.role}
                gender={auth.account.gender}
                onLogout={handleLogout}
              />
            )}
          </>
        ) : (
          <Button color="inherit" onClick={handleLoginDialogOpen}>
            登入
          </Button>
        )}
      </Toolbar>
      <UserLoginDialog
        credentials={credentials}
        handleClick={handleInputChange}
        login={handleLogin}
        hide={handleLoginDialogClose}
        open={openLoginDialog}
      />
    </AppBar>
  );
}
