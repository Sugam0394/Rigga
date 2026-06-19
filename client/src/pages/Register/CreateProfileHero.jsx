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
        Complete your profile
      </h1>

      <p className="profile-description">
        Your verified identity helps
        build trust between commitments
        and witnesses.
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