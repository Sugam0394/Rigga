import "./OtpHero.css";

function OtpHero({ phone, onChangeNumber }) {
  return (
    <section className="otp-hero">
      <span className="otp-badge">
        Verification
      </span>

      <h1 className="otp-title">
        Verify your identity
      </h1>

      <p className="otp-description">
        Your commitments and witness
        records are connected to a
        verified phone number.
      </p>

     <div className="otp-phone-card">
  <div className="otp-phone-label">
    VERIFIED PHONE
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