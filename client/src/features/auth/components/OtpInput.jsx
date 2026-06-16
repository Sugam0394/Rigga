 import "./OtpInput.css";

const OtpInput = ({
  value,
  onChange,
}) => {
  return (
    <div className="otp-input-wrapper">
      <label
        htmlFor="otp-code"
        className="otp-input-label"
      >
        Verification Code
      </label>

      <input
        id="otp-code"
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        aria-describedby="otp-error"
        maxLength={6}
        value={value}
        onChange={onChange}
        placeholder="123456"
        className="otp-input"
      />
    </div>
  );
};

export default OtpInput;