import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";


const ProtectedRoute = ({ children }) => {

  const { user, loading } = useAuth();


  // AUTH CHECK LOADING
  if (loading) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }


  // USER NOT LOGGED IN
  if (!user) {
    return <Navigate to="/login" replace />;
  }


  // USER LOGGED IN
  return children;
};

export default ProtectedRoute;