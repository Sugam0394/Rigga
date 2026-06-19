import "./ProfileHeader.css";

const ProfileHeader = ({
  name,
}) => {
  return (
    <header className="profile-header">
      <h1>
        {name}
      </h1>

      <p>
        Manage your account
        and accountability
        profile.
      </p>
    </header>
  );
};

export default ProfileHeader;