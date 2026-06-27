 import "./ProfileInfoCard.css";

const ProfileInfoCard = ({
  profile,
}) => {
  return (
    <section className="profile-info-card">
      <h2>
        Account Information
      </h2>

      <div>
        <p>Phone</p>

        <strong>
          {profile.phone}
        </strong>
      </div>

      {profile.email && (
        <div>
          <p>Email</p>

          <strong>
            {profile.email}
          </strong>
        </div>
      )}
    </section>
  );
};

export default ProfileInfoCard;