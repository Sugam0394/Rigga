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
      TRUSTED ACCOUNTABILITY
      </div>

      <h1 className="login-hero-title">
        Commit to what matters.
Prove you followed through.
      </h1>

      <p className="login-hero-description">
       Rigga helps you create commitments that are
verified by real people, not self-reported.
      </p>

      <p className="login-hero-description">
     Set a goal, invite a witness, track your
progress, and build a record of commitments
you actually completed.
      </p>
    </section>
  );
}

export default LoginHero;