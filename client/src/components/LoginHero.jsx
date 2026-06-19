 import "./LoginHero.css";

import riggaLogo from "../assests/RiggaLogo.png";

function LoginHero() {
  return (
    <section className="login-hero">
      <img
        src={riggaLogo}
        alt="Rigga Logo"
        className="login-hero-logo"
      />
      <div className="login-hero-badge">
  VERIFIED ACCOUNTABILITY
</div>

      <h1 className="login-hero-title">
        Verify your identity to get started
      </h1>

      <p className="login-hero-description">
        Rigga connects commitments to verified
        identities and verified witnesses.
        Start by verifying your phone number.
      </p>
    </section>
  );
}

export default LoginHero;