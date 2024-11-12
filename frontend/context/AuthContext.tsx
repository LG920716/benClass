"use client";
import { createContext, useContext, useState } from "react";

type authContextType = {
  account: {
    id: string;
    role: string;
    name: string;
    gender: number;
  };
  login: (id: string, role: string, name: string, gender: number) => void;
  logout: () => void;
};

const authContextDefaultValues: authContextType = {
  account: {
    id: "",
    role: "",
    name: "",
    gender: 0,
  },
  login: (id: string, role: string, name: string, gender: number) => {},
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
  const [account, setAccount] = useState({ id: "", role: "", name: "", gender: 0 });

  const login = (id: string, role: string, name: string, gender: number) => {
    setAccount({ id, role, name, gender });
  };

  const logout = () => {
    setAccount({ id: "", role: "", name: "", gender: 0 });
  };

  const value = {
    account,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
