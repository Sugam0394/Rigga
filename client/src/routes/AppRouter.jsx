import { BrowserRouter, Routes, Route } from "react-router-dom";
 import { Navigate } from "react-router-dom";

// Route Guards
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";













// Layouts
import AuthLayout from "../layouts/AuthLayout";
import AppLayout from "../layouts/AppLayout";
import PublicLayout from "../layouts/PublicLayout";


// Pages
import HomePage from "../pages/Home/HomePage";
import CreateChallengePage from "../pages/CreateChallengePage/CreateChallengePage";
import ChallengeDetailsPage from "../pages/ChallengeDetails/ChallengeDetailsPage";
import LoginPage from "../pages/Login/LoginPage";
import OtpVerification from "../pages/OtpVerification/OtpVerification";
import Profile from "../pages/ProfilePage/Profile";
import WitnessReview from "../pages/WitnessReview/WitnessReview";
import CreateProfilePage from "../pages/Register/CreateProfilePage";



 const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Guest Routes */}
        <Route
          element={
            <GuestRoute>
              <AuthLayout />
            </GuestRoute>
          }
        >
          <Route
            path="/"
            element={<LoginPage />}
          />

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/verify-otp"
            element={<OtpVerification />}
          />

          <Route
  path="/create-profile"
  element={<CreateProfilePage />}
/>


        </Route>

        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route
            path="/review/:token"
            element={<WitnessReview />}
          />
        </Route>

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/home"
            element={<HomePage />}
          />

          <Route
            path="/challenges/create"
            element={<CreateChallengePage />}
          />

          <Route
            path="/challenges/:id"
            element={<ChallengeDetailsPage />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />
        </Route>

        {/* Fallback */}
        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;












