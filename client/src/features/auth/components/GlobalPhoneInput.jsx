import PhoneInput from "react-phone-number-input";

import "react-phone-number-input/style.css";

const GlobalPhoneInput = ({
  value,
  onChange,
  placeholder =
    "Enter phone number",
}) => {
  return (
    <PhoneInput
      international
      defaultCountry="IN"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default GlobalPhoneInput;