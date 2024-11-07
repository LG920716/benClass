"use client";
import { createContext, useContext, useState } from "react";

type authContextType = {
  account: {
    id: string;
    role: string;
    gender: number;
  };
  login: (id: string, role: string, gender: number) => void;
  logout: () => void;
};

const authContextDefaultValues: authContextType = {
  account: {
    id: "",
    role: "",
    gender: 0,
  },
  login: (id: string, role: string, gender: number) => {},
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
  const [account, setAccount] = useState({ id: "", role: "", gender: 0 });

  const login = (id: string, role: string, gender: number) => {
    setAccount({ id, role, gender });
  };

  const logout = () => {
    setAccount({ id: "", role: "", gender: 0 });
  };

  const value = {
    account,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
