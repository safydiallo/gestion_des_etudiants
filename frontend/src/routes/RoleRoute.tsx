import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface Props {
  allowedRoles: string[];
}

export default function RoleRoute({ allowedRoles }: Props) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return <p>Chargement...</p>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const role = user?.role || "UNKNOWN";

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
