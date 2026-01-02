import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PublicRoute() {
  const { user, accessToken } = useSelector((state) => state.user || {});
  const location = useLocation();

  if (user && accessToken && location.pathname === "/") {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}
