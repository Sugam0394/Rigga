import "./ProfileInfoCard.css";

const ProfileInfoCard = ({
  profile,
}) => {
  return (
    <section className="profile-info-card">
      <h2>
        Profile Information
      </h2>

      <div>
        <p>Name</p>
        <strong>
          {profile.name}
        </strong>
      </div>

      <div>
        <p>Phone</p>
        <strong>
          {profile.phone}
        </strong>
      </div>

      <div>
        <p>Email</p>
        <strong>
          {profile.email}
        </strong>
      </div>

      <div>
        <p>Member Since</p>
        <strong>
          {new Date(
            profile.createdAt
          ).toLocaleDateString(
            "en-US",
            {
              day: "numeric",
              month: "short",
              year: "numeric",
            }
          )}
        </strong>
      </div>
    </section>
  );
};

export default ProfileInfoCard;