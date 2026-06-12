 import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthHeader from "../../features/auth/components/AuthHeader";
 import GlobalPhoneInput from "../../features/auth/components/GlobalPhoneInput";

import {
  validatePhone,
} from "../../features/auth/components/phoneValidation";
 
import AuthError from "../../features/auth/components/AuthError";
import AuthSubmitButton from "../../features/auth/components/AuthSubmitButton";
import { requestOtp } from "../../services/authService";



const LoginPage = () => {
  const navigate = useNavigate();

 const [phone, setPhone] =
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
      console.error(
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <AuthHeader
        title="Make a commitment. Keep your word."
        subtitle="Rigga helps you stay accountable through witnesses, deadlines, and consequences."
      />
 

      <GlobalPhoneInput
  value={phone}
  onChange={setPhone}
/>

     

      <AuthError
        id="phone-error"
        message={error}
      />

      <div style={{ marginTop: "8px" }}>
        <AuthSubmitButton
  disabled={
    !isPhoneValid ||
    loading
  }
          onClick={handleContinue}
        >
          Continue
        </AuthSubmitButton>
      </div>
    </div>
  );
};

export default LoginPage;