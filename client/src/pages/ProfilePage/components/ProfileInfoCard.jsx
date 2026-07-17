 import "./ProfileInfoCard.css";

const ProfileInfoCard = ({
  profile,
}) => {
  return (
    <section className="profile-info-card">

      <h2>
        Account Information
      </h2>

      <div className="profile-info-card__item">
        <p>Phone</p>

        <strong>
          {profile.phone ||
            "Not provided"}
        </strong>
      </div>

      <div className="profile-info-card__item">
        <p>Email</p>

        <strong>
          {profile.email ||
            "Not available"}
        </strong>
      </div>

      <div className="profile-info-card__item">
        <p>Timezone</p>

        <strong>
          {profile.timezone ||
            "UTC"}
        </strong>
      </div>

      <div className="profile-info-card__item">
        <p>Language</p>

        <strong>
          {profile.language ||
            "English"}
        </strong>
      </div>

    </section>
  );
};

export default ProfileInfoCard;