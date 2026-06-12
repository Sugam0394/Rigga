/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState , useEffect } from "react";
import {getCurrentUser , logoutUser }from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 
 const [user, setUser] =
  useState(null);

const [status, setStatus] =
  useState("loading");

  const login = (
  userData
) => {
  setUser(userData);

  setStatus(
    "authenticated"
  );
};

  const logout = async () => {
  try {
    await logoutUser();
  } finally {
    setUser(null);

    setStatus(
      "unauthenticated"
    );
  }
};

const restoreSession = async () => {
    try {
      const response =
        await getCurrentUser();

      setUser(
        response.data
      );

      setStatus(
        "authenticated"
      );
    } catch {
      setUser(null);

      setStatus(
        "unauthenticated"
      );
    }
  };

 useEffect(() => {
  const initializeSession = async () => {
    try {
      const response = await getCurrentUser();

      setUser(response.data);
      setStatus("authenticated");
    } catch {
      setUser(null);
      setStatus("unauthenticated");
    }
  };

  initializeSession();
}, []);

 const value = {
  user,
  status,
  login,
  logout,
  
  restoreSession,
  setUser,
  setStatus
};

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}