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
 
import { GoogleLogin } from "@react-oauth/google";
import useAuth from "../../context/AuthContext";
import { googleSignIn } from "../../services/authService";




const LoginPage = () => {
  const navigate = useNavigate();
const [hasConsent, setHasConsent] =
  useState(false);
 const [phone, setPhone] =
  useState("");

  const [showPhoneLogin, setShowPhoneLogin] =
  useState(false);

  const [submitError, setSubmitError] =
  useState("");

  const [loading, setLoading] = useState(false);

   const isPhoneValid =
  validatePhone(phone);

  const { restoreSession } = useAuth();

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

   
    const result =
  await requestOtp(
    phone
  );

  const navigationState = {
  phone,
};

 if (
  import.meta.env.DEV &&
  result?.data?.developmentOtp
) {
  navigationState.developmentOtp =
    result.data.developmentOtp;
}

navigate(
  "/verify-otp",
  {
    state: navigationState,
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

 const handleGoogleSuccess = async (
  credentialResponse
) => {
  try {
    setLoading(true);
    setSubmitError("");

    const result =
      await googleSignIn(
        credentialResponse.credential
      );

    if (
      result.data.isNewUser
    ) {
      navigate(
        "/create-profile",
        {
          state: {
            provider: "google",
            verifiedEmail:
              result.data.user.email,
          },
          replace: true,
        }
      );

      return;
    }

    await restoreSession();

    navigate("/home", {
      replace: true,
    });
  } catch (error) {
    setSubmitError(
      error?.response?.data?.message ||
        "Google Sign-In failed."
    );
  } finally {
    setLoading(false);
  }
};

const handleGoogleError = () => {
  setSubmitError(
    "Google Sign-In failed."
  );
};

  return (
 <div className="login-page">
  <LoginHero />

  <LegalConsent
    checked={hasConsent}
    onChange={(e) => {
      setHasConsent(e.target.checked);
      setSubmitError("");
    }}
  />
 <div
  style={{
    pointerEvents: hasConsent
      ? "auto"
      : "none",
    opacity: hasConsent
      ? 1
      : 0.6,
  }}
>
  <GoogleLogin
    onSuccess={
      handleGoogleSuccess
    }
    onError={
      handleGoogleError
    }
    useOneTap={false}
    theme="outline"
    text="continue_with"
    shape="pill"
    width="100%"
  />
</div>

  <div className="login-divider">
    <span>OR</span>
  </div>

  <button
    type="button"
    className="phone-toggle-button"
    onClick={() =>
      setShowPhoneLogin((prev) => !prev)
    }
  >
    {showPhoneLogin
      ? "Hide Phone Login"
      : "Continue with Phone"}
  </button>

  {showPhoneLogin && (
    <>
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
    </>
  )}
</div>
);
};

export default LoginPage;