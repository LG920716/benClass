// /menu.tsx

"use client";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../account/AuthContext";
import UserLoginDialog from "./userLoginDialog";
import { useState } from "react";
import { loginUser } from "../api/apis";

export default function Menu() {
  const router = useRouter();
  const pathname = usePathname();
  const auth = useAuth();

  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [credentials, setCredentials] = useState({ id: "", password: "" });

  const handleLoginDialogOpen = () => {
    setOpenLoginDialog(true);
  };

  const handleLoginDialogClose = () => {
    setOpenLoginDialog(false);
    setCredentials((prev) => ({ id: "", password: "" }));
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
      const { id, role } = response; // 假設 response 包含 id 和 role
      auth.login(id, role); // 更新 context
      handleLoginDialogClose();
    } catch (error) {
      console.error("登入失敗", error);
    }
  };

  const handleLogout = () => {
    auth.logout();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button
          color="inherit"
          variant={pathname === "/" ? "outlined" : "text"}
          onClick={() => router.push("/")}
        >
          主頁面
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
            <Typography
              variant="body1"
              color="inherit"
              style={{ marginLeft: "auto" }}
            >
              {auth.account.id}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              登出
            </Button>
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
