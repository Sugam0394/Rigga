 import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthHeader from "../../features/auth/components/AuthHeader";
import CountryCodeSelector from "../../features/auth/components/CountryCodeSelector";
import PhoneInput from "../../features/auth/components/PhoneInput";
import AuthError from "../../features/auth/components/AuthError";
import AuthSubmitButton from "../../features/auth/components/AuthSubmitButton";
import { requestOtp } from "../../services/authService";










const LoginPage = () => {
  const navigate = useNavigate();

  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [loading, setLoading] = useState(false);

  const normalizedPhone =
    phoneNumber.replace(/\D/g, "");

  const isPhoneValid =
    normalizedPhone.length >= 8 &&
    normalizedPhone.length <= 15;

  const error =
    phoneNumber && !isPhoneValid
      ? "Enter a valid phone number"
      : "";

  const handleContinue = async () => {
    if (!isPhoneValid)
      return;

    try {
      setLoading(true);

     const phone =
  normalizedPhone;

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

      <label htmlFor="country-code">
        Country
      </label>

      <CountryCodeSelector
        value={countryCode}
        onChange={(e) =>
          setCountryCode(e.target.value)
        }
      />

      <label htmlFor="phone-number">
        Phone Number
      </label>

      <PhoneInput
        value={phoneNumber}
        onChange={(e) =>
          setPhoneNumber(
            e.target.value.replace(/[^\d]/g, "")
          )
        }
        placeholder="Enter your phone number"
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