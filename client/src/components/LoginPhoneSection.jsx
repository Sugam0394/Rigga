 import "./LoginPhoneSection.css";
import GlobalPhoneInput from "../features/auth/components/GlobalPhoneInput";

function LoginPhoneSection({
  phone,
  setPhone,
}) {
  return (
    <section className="phone-section">
      <label className="phone-section-label">
        Identity Verification
      </label>

      <p className="phone-section-description">
       Verify your phone number to secure your
account and connect your commitments to a
verified identity.
      </p>

      <GlobalPhoneInput
        value={phone}
        onChange={setPhone}
      />

      <p className="phone-section-helper">
         Your phone number is used only for account
verification and security. It is never shown
to witnesses or other users.
      </p>
    </section>
  );
}

export default LoginPhoneSection;