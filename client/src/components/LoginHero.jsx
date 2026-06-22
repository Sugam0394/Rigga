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
       Rigga
      </div>

      <h1 className="login-hero-title">
        Commit to what matters.
        Prove you followed through.
      </h1>
 
 
    </section>
  );
}

export default LoginHero;