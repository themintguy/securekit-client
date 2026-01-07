import { Navigate, useLocation } from "react-router-dom";
import { useContext, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  if (!auth) throw new Error("authcontext is missing");

  const { isAuthenticated, loading } = auth;

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}