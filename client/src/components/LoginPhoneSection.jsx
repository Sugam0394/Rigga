import "./LoginPhoneSection.css";

import GlobalPhoneInput
from "../features/auth/components/GlobalPhoneInput";

function LoginPhoneSection({
  phone,
  setPhone,
}) {
  return (
    <div className="phone-section">
      <label
        className="phone-section-label"
      >
        Phone Number
      </label>

      <GlobalPhoneInput
        value={phone}
        onChange={setPhone}
      />

      <p
        className="phone-section-helper"
      >
        We use phone verification to
        protect commitments and witness
        records.
      </p>
    </div>
  );
}

export default LoginPhoneSection;