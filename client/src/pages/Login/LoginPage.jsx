 import { useState } from "react";
 import { useNavigate } from "react-router-dom";

import AuthHeader from "../../features/auth/components/AuthHeader";
import CountryCodeSelector from "../../features/auth/components/CountryCodeSelector";
import PhoneInput from "../../features/auth/components/PhoneInput";
import AuthError from "../../features/auth/components/AuthError";
import AuthSubmitButton from "../../features/auth/components/AuthSubmitButton";

 const LoginPage = () => {
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");

  const isPhoneValid =
    phoneNumber.trim().length >= 8;

  const error =
    phoneNumber && !isPhoneValid
      ? "Enter a valid phone number"
      : "";

      const handleContinue = () => {
  if (!isPhoneValid) return;

  navigate("/verify-otp");
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

      <CountryCodeSelector
        value={countryCode}
        onChange={(e) =>
          setCountryCode(e.target.value)
        }
      />

      <PhoneInput
        value={phoneNumber}
        onChange={(e) =>
          setPhoneNumber(e.target.value)
        }
      />

      <AuthError message={error} />

      <div style={{ marginTop: "8px" }}>
  <AuthSubmitButton
    disabled={!isPhoneValid}
    onclick={handleContinue}
  >
    Continue
  </AuthSubmitButton>
</div>
    </div>
  );
};

export default LoginPage;