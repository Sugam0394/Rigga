 import { Navigate } from "react-router-dom";
import useAuth from "../context/AuthContext";

const ProtectedRoute = ({
  children,
}) => {
  const { status } =
    useAuth();

  if (
    status === "loading"
  ) {
    return <p>Loading...</p>;
  }

  if (
    status ===
    "unauthenticated"
  ) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;