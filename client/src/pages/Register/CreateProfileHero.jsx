 import "./CreateProfileHero.css";

function CreateProfileHero({
  verifiedPhone,
}) {
  return (
    <section className="profile-hero">
      <div className="profile-badge">
        Verified Identity
      </div>

      <h1 className="profile-title">
        Create your accountability profile
      </h1>

      <p className="profile-description">
        Add your name and email to complete
        your account setup and help establish
        trust throughout your accountability
        journey.
      </p>

      <div className="profile-phone-card">
        <div className="profile-phone-label">
          VERIFIED PHONE
        </div>

        <div className="profile-phone-value">
          {verifiedPhone}
        </div>
      </div>
    </section>
  );
}

export default CreateProfileHero;