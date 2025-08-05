import { Navigate } from "react-router-dom";

export default function PrivateRouteRegister({ children, requiresRegistration }) {
  const isRegistered = !!localStorage.getItem("registeredUser");

  if (requiresRegistration && !isRegistered) {
    return <Navigate to="/" replace />;
  }

  if (!requiresRegistration && isRegistered) {
    return <Navigate to="/challenge" replace />
  }

  return children;
}
