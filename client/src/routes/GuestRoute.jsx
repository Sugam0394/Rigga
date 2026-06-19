import { Navigate } from "react-router-dom";
import useAuth from "../context/AuthContext";

const GuestRoute = ({
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
    "authenticated"
  ) {
    return (
      <Navigate
        to="/home"
        replace
      />
    );
  }

  return children;
};

export default GuestRoute;