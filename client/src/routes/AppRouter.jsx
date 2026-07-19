import { BrowserRouter, Routes, Route } from "react-router-dom";
 import { Navigate } from "react-router-dom";

// Route Guards
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

// Layouts
import AuthLayout from "../layouts/AuthLayout";
import AppLayout from "../layouts/AppLayout";
import PublicLayout from "../layouts/PublicLayout";

// Auth Page
import LoginPage from "../pages/Login/LoginPage";
import OtpVerification from "../pages/OtpVerification/OtpVerification";
import CreateProfilePage from "../pages/Register/CreateProfilePage";

// Pages
import HomePage from "../pages/Home/HomePage";
import CreateChallengePage from "../pages/CreateChallengePage/CreateChallengePage";
import ChallengeDetailsPage from "../pages/ChallengeDetails/ChallengeDetailsPage";
import Profile from "../pages/ProfilePage/Profile";
import SubmitProgressReportPage from "../pages/progressReports/SubmitProgressReportPage";
import SubmitAppealPage from "../pages/appeals/SubmitAppealPage";
import NotificationsPage from "../features/notifications/pages/NotificationPage"
import Settings from "../pages/settings/Settings.jsx"

// Legal Pages
import TermsOfServicePage from "../pages/legal/TermsOfServicePage";
import PrivacyPolicyPage from "../pages/legal/PrivacyPolicyPage";
import CookiePolicyPage from "../pages/legal/CookiePolicyPage";

// Witness Review Pages
import ShareWithWitnessPage from "../pages/WitnessReview/ShareWitnessPage";
import WitnessInvitationPage from "../pages/WitnessReview/WitnessInvitationPage";
import WitnessReview from "../pages/WitnessReview/WitnessReview";





 const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Guest Routes */}
        <Route element={<GuestRoute><AuthLayout /> </GuestRoute>}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/create-profile" element={<CreateProfilePage />}/>
        </Route>
 
  

        {/* Protected Routes */}
        <Route element={ <ProtectedRoute> <AppLayout/> </ProtectedRoute> }>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/notifications" element={ <NotificationsPage />}/>
        <Route path="/challenges/create" element={<CreateChallengePage />}/>
        <Route path="/share-with-witness"element={<ShareWithWitnessPage />}/>
        <Route path="/challenges/:id" element={<ChallengeDetailsPage />}/>
        <Route path="/challenges/:id/progress-report"element={<SubmitProgressReportPage/>}/>
        <Route path="/challenges/:id/appeal" element={<SubmitAppealPage />}/>
        <Route path="/profile" element={<Profile />}/></Route>
        <Route path="/settings" element={<Settings />} />
      
      
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
  <Route path="/witness/:token"element={<WitnessInvitationPage />}/>
  <Route path="/review/:token"element={<WitnessReview />}/>
  <Route path="/legal/privacy"element={<PrivacyPolicyPage />}/>
  <Route path="/legal/terms"element={<TermsOfServicePage />}/>
  <Route path="/legal/cookies" element={<CookiePolicyPage />}/>
  </Route>


       {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />}/>
        </Routes>
        </BrowserRouter>
  );
};

export default AppRouter;












