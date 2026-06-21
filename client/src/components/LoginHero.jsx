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
        ACCOUNTABILITY PLATFORM
      </div>

      <h1 className="login-hero-title">
        Make commitments that can be witnessed
        and verified.
      </h1>

      <p className="login-hero-description">
        Rigga helps people turn intentions into
        accountable commitments.
      </p>

      <p className="login-hero-description">
        Create a commitment, assign a witness,
        verify the outcome, and build a permanent
        record of what you said you would do.
      </p>
    </section>
  );
}

export default LoginHero;