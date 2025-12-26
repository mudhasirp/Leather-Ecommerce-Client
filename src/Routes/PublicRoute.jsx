import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const { user, accessToken } = useSelector((state) => state.user);

  if (user && accessToken) {
    return <Navigate to="/home" replace />;
  }

  return children;
}