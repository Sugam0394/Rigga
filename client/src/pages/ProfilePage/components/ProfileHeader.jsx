 import "./ProfileHeader.css";

const ProfileHeader = ({
  profile,
}) => {
  const formattedMemberSince =
    profile?.createdAt &&
    !Number.isNaN(
      new Date(
        profile.createdAt
      ).getTime()
    )
      ? new Date(
          profile.createdAt
        ).toLocaleDateString(
          "en-US",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          }
        )
      : "Unavailable";

  return (
    <header className="profile-header">

      {profile?.avatarUrl ? (
        <img
          src={profile.avatarUrl}
          alt={profile.name}
          className="profile-header__avatar"
        />
      ) : (
        <div className="profile-header__avatar-placeholder">
          {profile?.name
            ? profile.name
                .charAt(0)
                .toUpperCase()
            : "U"}
        </div>
      )}

      <h1 className="profile-header__name">
        {profile?.name ||
          "Unknown User"}
      </h1>

      <p className="profile-header__username">
        {profile?.username
          ? `@${profile.username}`
          : "Username not set"}
      </p>

      <p className="profile-header__member">
        Member since{" "}
        {formattedMemberSince}
      </p>

      <p className="profile-header__tagline">
        Your accountability
        identity is built
        through the
        commitments you
        honor.
      </p>

    </header>
  );
};

export default ProfileHeader;