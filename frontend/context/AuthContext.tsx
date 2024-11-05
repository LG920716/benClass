// /AuthContext

"use client";
import { createContext, useContext, useState } from "react";

type authContextType = {
  account: {
    id: string;
    role: string;
  };
  login: (id: string, role: string) => void;
  logout: () => void;
};

const authContextDefaultValues: authContextType = {
  account: {
    id: "",
    role: "",
  },
  login: (id: string, role: string) => {},
  logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [account, setAccount] = useState({ id: "", role: "" });

  const login = (id: string, role: string) => {
    setAccount({ id, role });
  };

  const logout = () => {
    setAccount({ id: "", role: "" });
  };

  const value = {
    account,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
