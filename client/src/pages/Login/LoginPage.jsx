 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginHero from "../../components/LoginHero"
import LoginPhoneSection from "../../components/LoginPhoneSection";

import { validatePhone } from "../../features/auth/components/phoneValidation";
 
import AuthError from "../../features/auth/components/AuthError";
import AuthSubmitButton from "../../features/auth/components/AuthSubmitButton";
import { requestOtp } from "../../services/authService";
import "./LoginPage.css"
 
import LegalConsent from "../../features/auth/components/LegalConsent";
import TrustSection from "../../features/auth/components/TrustSection";





const LoginPage = () => {
  const navigate = useNavigate();

 const [phone, setPhone] =
  useState("");

  const [submitError, setSubmitError] =
  useState("");

  const [loading, setLoading] = useState(false);

   const isPhoneValid =
  validatePhone(phone);

  const error =
  phone && !isPhoneValid
    ? "Enter a valid phone number"
    : "";

  const handleContinue = async () => {
    if (!isPhoneValid)
      return;

    try {
      setLoading(true);

   

      await requestOtp(
        phone
      );

      navigate(
        "/verify-otp",
        {
          state: {
            phone,
          },
        }
      );
    } catch (error) {
  setSubmitError(
    error?.response?.data?.message ||
    "Failed to send OTP. Please try again."
  );
} finally {
      setLoading(false);
    }
  };

  return (

    <div className="login-page">  
 <LoginHero />

 <TrustSection />

     <LoginPhoneSection
  phone={phone}
  setPhone={setPhone}
/>

<LegalConsent />

    <AuthError
      id="phone-error"
      message={error}
    />

    <AuthError
      id="otp-request-error"
      message={submitError}
    />

    <div className="login-submit-wrapper">
      <AuthSubmitButton
        disabled={!isPhoneValid || loading}
        onClick={handleContinue}
      >
        {loading
          ? "Sending OTP..."
          : "Continue"}
      </AuthSubmitButton>
    </div>
  </div>
);
};

export default LoginPage;