 import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

const AuthContext = createContext();

// Named export for the Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // AUTO LOGIN CHECK
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }
        const { data } = await api.get("/me");
        setUser(data.user);
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // LOGIN FUNCTION
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  // 👇 YAHA ADD KARO
const refreshUser = async () => {
  try {
    const { data } = await api.get("/me");

    setUser(data.user);
  } catch (error) {
    console.log("REFRESH USER ERROR:", error);
  }
};

  // LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

 // eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);