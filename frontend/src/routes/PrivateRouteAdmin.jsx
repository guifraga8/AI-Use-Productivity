import { Navigate } from "react-router-dom";

export default function PrivateRouteAdmin({ children }) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return isAdmin ? children : <Navigate to="/admin" replace />;
}
