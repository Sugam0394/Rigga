 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginHero from "../../components/LoginHero"
import LoginPhoneSection from "../../components/LoginPhoneSection";

import {
  validatePhone,
} from "../../features/auth/components/phoneValidation";
 
import AuthError from "../../features/auth/components/AuthError";
import AuthSubmitButton from "../../features/auth/components/AuthSubmitButton";
import { requestOtp } from "../../services/authService";
import "./LoginPage.css"


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
    <LoginHero
      title="Verify your identity to get started"
      subtitle="Rigga connects commitments to verified identities and verified witnesses. Start by verifying your phone number."
    />

    <div className="login-journey">
      <div className="login-journey-title">
        What happens next?
      </div>

      <div className="login-journey-list">
        <div className="login-journey-item">
          1. Verify your phone number
        </div>

        <div className="login-journey-item">
          2. Create your profile
        </div>

        <div className="login-journey-item">
          3. Start your first commitment
        </div>
      </div>
    </div>

     <LoginPhoneSection
  phone={phone}
  setPhone={setPhone}
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