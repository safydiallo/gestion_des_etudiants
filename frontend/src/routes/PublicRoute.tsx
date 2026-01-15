import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const PublicRoute = () => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) return null;

  if (isAuthenticated && user) {
    if (user.role === "ADMIN") return <Navigate to="/admin" replace />;
    if (user.role === "ENSEIGNANT") return <Navigate to="/enseignant" replace />;
    if (user.role === "ETUDIANT") return <Navigate to="/etudiant" replace />;
  }

  return <Outlet />;
};
