 import { useState , useEffect } from "react";
 import { useLocation, useNavigate } from "react-router-dom";
 import OtpHero from "./Otp";
import AuthError from "../../features/auth/components/AuthError";
import AuthSubmitButton from "../../features/auth/components/AuthSubmitButton";
import OtpInput from "../../features/auth/components/OtpInput"
import { verifyOtp , requestOtp } from "../../services/authService";
import useAuth from  "../../context/AuthContext";
import "./OtpVerification.css"


const OtpVerificationPage = () => {
  const [otp, setOtp] = useState("");
  const isOtpValid = /^\d{6}$/.test(otp);
  const navigate = useNavigate();
  const location = useLocation();
  const { restoreSession } = useAuth();
  const [submitError, setSubmitError] =
  useState("");
  const [loading, setLoading] = useState(false);
  


  const error = otp && !isOtpValid
    ? "Enter a valid 6-digit OTP"
    : "";

   const [countdown, setCountdown] = useState(30);


   useEffect(() => {
  if (countdown <= 0) return;

  const timer = setInterval(() => {
    setCountdown((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [countdown]);

useEffect(() => {
  if (!location.state) {
    navigate(
      "/login",
      {
        replace: true,
      }
    );
  }
}, [
  location.state,
  navigate,
]);

 const authData =
  location.state;

if (!authData) {
  return null;
}

 const {
  phone,
  developmentOtp,
} = authData;


 const handleVerifyOtp = async () => {
  if (!isOtpValid) return;

  try {
    setLoading(true);
    setSubmitError("");

    const response =
  await verifyOtp(
    phone,
    otp
  );

if (
  response.data.isNewUser
) {
  navigate(
    "/create-profile",
    {
      state: {
        verifiedPhone:
          response.data
            .verifiedPhone,
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
       "The verification code is incorrect. Please check the code and try again."
    );
  } finally {
    setLoading(false);
  }
};
 const handleResendOtp = async () => {
  try {
    setSubmitError("");

     const result =
  await requestOtp(phone);

 navigate("/verify-otp", {
  replace: true,
  state: {
    phone,
    developmentOtp: result?.data?.developmentOtp,
  },
});

setCountdown(30);
  } catch (error) {
    setSubmitError(
      error?.response?.data?.message ||
      "We couldn't send a new code right now. Please try again in a moment."
    );
  }
};

  return (
  <div className="otp-page">
    <OtpHero
      phone={phone}
      onChangeNumber={() =>
        navigate("/login")
      }
    />

    {developmentOtp && (
  <div className="development-otp-card">
    <p className="development-otp-label">
      Development OTP
    </p>

    <strong>
      {developmentOtp}
    </strong>
  </div>
)}

    <OtpInput
      value={otp}
      onChange={(e) =>
        setOtp(e.target.value)
      }
    />

    <AuthError
      id="otp-error"
      message={error}
    />

    <AuthError
      id="otp-submit-error"
      message={submitError}
    />

    <div className="otp-submit-wrapper">
      <AuthSubmitButton
        disabled={
          !isOtpValid ||
          loading
        }
        onClick={
          handleVerifyOtp
        }
      >
        {loading
          ? "Verifying..."
          : "Verify OTP"}
      </AuthSubmitButton>
    </div>

    <button
      type="button"
      disabled={countdown > 0}
      onClick={
        countdown === 0
          ? handleResendOtp
          : undefined
      }
      className={`otp-resend-button ${
        countdown > 0
          ? "disabled"
          : "enabled"
      }`}
    >
      {countdown > 0
        ? `Resend OTP in ${countdown}s`
        : "Resend OTP"}
    </button>
  </div>
);
};

export default OtpVerificationPage;