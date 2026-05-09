 import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";


const PublicRoute = ({ children }) => {

  const { user, loading } = useAuth();


  // WAIT UNTIL AUTH CHECK COMPLETE
  if (loading) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }


  // ALREADY LOGGED IN
  if (user) {
    return <Navigate to="/" replace />;
  }


  // NOT LOGGED IN
  return children;
};

export default PublicRoute;