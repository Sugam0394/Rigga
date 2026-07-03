 import "./CreateProfileHero.css";

function CreateProfileHero({
  provider,
  verifiedPhone,
  verifiedEmail,
}) {
  const isGoogle =
    provider === "google";

  return (
    <section className="profile-hero">
      <div className="profile-badge">
        Verified Identity
      </div>

      <h1 className="profile-title">
        Create your accountability profile
      </h1>

      <div className="profile-phone-card">
        <div className="profile-phone-label">
          {isGoogle
            ? "VERIFIED GOOGLE ACCOUNT"
            : "VERIFIED PHONE"}
        </div>

        <div className="profile-phone-value">
          {isGoogle
            ? verifiedEmail
            : verifiedPhone}
        </div>
      </div>
    </section>
  );
}

export default CreateProfileHero;