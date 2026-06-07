 import { useState , useEffect } from "react";
 import { useLocation, useNavigate } from "react-router-dom";
import AuthHeader from "../../features/auth/components/AuthHeader";
import AuthError from "../../features/auth/components/AuthError";
import AuthSubmitButton from "../../features/auth/components/AuthSubmitButton";
import OtpInput from "../../features/auth/components/OtpInput"
import { verifyOtp } from "../../services/authService";
import useAuth from  "../../context/AuthContext";



const OtpVerificationPage = () => {
  const [otp, setOtp] = useState("");
  const isOtpValid = /^\d{6}$/.test(otp);
  const navigate = useNavigate();
  const location = useLocation();
  const { restoreSession } = useAuth();

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

    const authData = location.state;
    
if (!authData) {
  navigate("/login");
  return null;
}

 const { phone } =
  authData;


 const handleVerifyOtp =
  async () => {
    if (!isOtpValid)
      return;

    try {
      setLoading(true);

      await verifyOtp(
        phone,
        otp
      );

      await restoreSession();

      navigate(
        "/home",
        {
          replace: true,
        }
      );
    } catch (error) {
      console.error(
        error
      );
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    }}
    >
      <AuthHeader
        title="Verify your number"
        subtitle="Enter the 6-digit code sent to your phone."
      />

       <p
  style={{
    color: "#6B7280",
    fontSize: "14px",
  }}
>
  
 {phone}
 
</p>

   <button
  type="button"
  onClick={() => navigate("/login")}
  style={{
    background: "none",
    border: "none",
    color: "#4F46E5",
    cursor: "pointer",
    textAlign: "left",
    padding: 0,
  }}
>
  Change number
</button>

      <OtpInput
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <AuthError
  id="otp-error"
  message={error}
/>

      <div style={{ marginTop: "8px" }}>
   <AuthSubmitButton
  disabled={
    !isOtpValid ||
    loading
  }
  onClick={
    handleVerifyOtp
  }
>
  Verify OTP
</AuthSubmitButton>
</div>

  <button
  type="button"
  disabled={countdown > 0}
  style={{
    background: "none",
    border: "none",
    color:
      countdown > 0
        ? "#9CA3AF"
        : "#4F46E5",
    cursor:
      countdown > 0
        ? "not-allowed"
        : "pointer",
    padding: 0,
  }}
>
  {countdown > 0
    ? `Resend OTP in ${countdown}s`
    : "Resend OTP"}
</button>
    </div>
  );
};

export default OtpVerificationPage;