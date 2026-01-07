import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { api } from "../api/api";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const refreshAuth = useCallback(async () => {
    setLoading(true);
    try {
      await api.get("users/me");
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshAuth();
  }, [refreshAuth]);

  const logout = async () => {
    await api.post("v1/auth/logout");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const login = () => {
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, login, refreshAuth, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
