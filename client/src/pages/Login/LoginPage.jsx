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
 





const LoginPage = () => {
  const navigate = useNavigate();
const [hasConsent, setHasConsent] =
  useState(false);
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

if (!hasConsent) {
  setSubmitError(
    "Please accept the Terms of Service and Privacy Policy to continue."
  );

  return;
}


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

 

     <LoginPhoneSection
  phone={phone}
  setPhone={setPhone}
/>

 <LegalConsent
  checked={hasConsent}
  onChange={(e) => {
    setHasConsent(
      e.target.checked
    );

    setSubmitError("");
  }}
/>

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
      disabled={
  !isPhoneValid ||
  !hasConsent ||
  loading
}
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