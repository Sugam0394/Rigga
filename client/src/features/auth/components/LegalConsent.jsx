 import { Link } from "react-router-dom";
import "./LegalConsent.css";

const LegalConsent = ({
  checked,
  onChange,
}) => {
  return (
    <div className="legal-consent">
      <label
        htmlFor="legal-consent"
        className="legal-consent-label"
      >
        <input
          id="legal-consent"
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />

        <span>
          By continuing, I agree to
          Rigga's{" "}
          <Link to="/legal/terms">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/legal/privacy">
            Privacy Policy
          </Link>.
        </span>
      </label>
    </div>
  );
};

export default LegalConsent;