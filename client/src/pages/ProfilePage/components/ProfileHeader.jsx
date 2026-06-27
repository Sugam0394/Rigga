 import "./ProfileHeader.css";

const ProfileHeader = ({
  name,
  memberSince,
}) => {
  const formattedMemberSince =
    memberSince &&
    !Number.isNaN(
      new Date(
        memberSince
      ).getTime()
    )
      ? new Date(
          memberSince
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
      <h1>
        {name || "Unknown User"}
      </h1>

      <p>
        Member since{" "}
        {formattedMemberSince}
      </p>

      <p>
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