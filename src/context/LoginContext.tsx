"use client";
import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

interface User {
  id: number;
  userType: string;
}

interface LoginData {
  email: string;
  password: string;
  userType: string;
}

interface Children {
  children: React.ReactNode;
}

export const LoginContext = createContext<{
  user: User | null;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
}>({
  user: null,
  login: async (data: LoginData) => {},
  logout: () => {},
});

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};

export const LoginProvider = ({ children }: Children) => {
  const [user, setUser] = useState<User | null>(null);
  const login = async (data: LoginData) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      if (response.ok) {
        setUser(result.user);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      throw error;
    }
  };

  // funcion logout
  const logout = () => {
    localStorage.removeItem("token");
    Cookies.remove("token");
  };

  return (
    <LoginContext.Provider value={{ user, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
