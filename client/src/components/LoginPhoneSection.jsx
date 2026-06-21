 import "./LoginPhoneSection.css";
import GlobalPhoneInput from "../features/auth/components/GlobalPhoneInput";

function LoginPhoneSection({
  phone,
  setPhone,
}) {
  return (
    <section className="phone-section">
      <label className="phone-section-label">
        Verify Your Identity
      </label>

      <p className="phone-section-description">
        Enter your phone number to verify that
        your commitments belong to a real person.
      </p>

      <GlobalPhoneInput
        value={phone}
        onChange={setPhone}
      />

      <p className="phone-section-helper">
        Your phone number is never shared with
        witnesses or other users.
      </p>
    </section>
  );
}

export default LoginPhoneSection;