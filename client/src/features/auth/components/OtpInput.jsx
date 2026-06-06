 
 
 
 
 const OtpInput = ({
  value,
  onChange,
}) => {
  return (
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
  style={{
    width: "100%",
    height: "48px",
    padding: "0 16px",
    border: "1px solid #D1D5DB",
    borderRadius: "12px",
    fontSize: "18px",
    textAlign: "center",
    letterSpacing: "8px",
  }}
/>
  );
};

export default OtpInput;