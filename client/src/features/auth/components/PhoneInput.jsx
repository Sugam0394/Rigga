 
 
 
 const PhoneInput = ({
  value,
  onChange,
  placeholder = "Phone number",
}) => {
  return (
    <input
      type="tel"
      inputMode="numeric"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        height: "48px",
        padding: "0 16px",
        border: "1px solid #D1D5DB",
        borderRadius: "12px",
        fontSize: "16px",
        outline: "none",
      }}
    />
  );
};

export default PhoneInput;