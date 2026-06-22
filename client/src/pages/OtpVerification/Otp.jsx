import "./OtpHero.css";

function OtpHero({ phone, onChangeNumber }) {
  return (
    <section className="otp-hero">
      <span className="otp-badge">
        IDENTITY VERIFICATION
      </span>

      <h1 className="otp-title">
        Confirm your identity
      </h1>

      <p className="otp-description">
        Enter the verification code sent to
your phone number to securely confirm
your identity.
      </p>

     <div className="otp-phone-card">
  <div className="otp-phone-label">
     PHONE NUMBER
  </div>

  <div className="otp-phone-value">
    {phone}
  </div>
</div>

      <button
        type="button"
        className="otp-change-button"
        onClick={onChangeNumber}
      >
        Change number
      </button>
    </section>
  );
}

export default OtpHero;