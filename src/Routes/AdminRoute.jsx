import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AdminRoute() {
  const { user, accessToken } = useSelector((state) => state.user || {});
  const location = useLocation();

  if (!user || !accessToken) {
    return <Navigate to="/admin" replace state={{ from: location }} />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
