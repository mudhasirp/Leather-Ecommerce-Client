import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { user, accessToken } = useSelector((state) => state.user || {});

  if (!user || !accessToken) {
    return <Navigate to="/" replace />;
  }
  
  if (user.role !== "user") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
