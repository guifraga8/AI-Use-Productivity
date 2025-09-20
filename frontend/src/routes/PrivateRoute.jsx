import { Navigate } from "react-router-dom";

export default function PrivateRoute({
  children,
  requiresRegistration,
  redirectIfNotRegistered = "/",
  redirectIfRegistered = null,
}) {
  const isRegistered = !!localStorage.getItem("registeredUser");

  if (requiresRegistration && !isRegistered) {
    return <Navigate to={redirectIfNotRegistered} replace />;
  }

  if (!requiresRegistration && isRegistered && redirectIfRegistered) {
    return <Navigate to={redirectIfRegistered} replace />;
  }

  return children;
}
