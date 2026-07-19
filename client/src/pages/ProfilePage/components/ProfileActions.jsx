import "./ProfileActions.css";

 const ProfileActions = ({
  isEditing,
  onEdit,
  onSettings,
  onHistory,
}) => {
  return (
    <div className="profile-actions">
      {!isEditing && (
        <>
          <button
            type="button"
            className="profile-actions__button"
            onClick={onEdit}
          >
            Edit Profile
          </button>

          <button
            type="button"
            className="profile-actions__button profile-actions__button--secondary"
            onClick={onSettings}
          >
            Settings
          </button>
          <button
  type="button"
  className="profile-actions__button profile-actions__button--secondary"
  onClick={onHistory}
>
  Challenge History
</button>
        </>
      )}
    </div>
  );
};

export default ProfileActions;