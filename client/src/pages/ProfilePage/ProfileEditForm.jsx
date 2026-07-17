 import "./ProfileEditForm.css";

const ProfileEditForm = ({
  formData,
  onChange,
  onSave,
  onCancel,
  saving,
  hasChanges,
  error,
}) => {
  return (
    <section className="profile-edit-form">

      <h2>Edit Profile</h2>

      {error && (
        <div className="profile-edit-form__error">
          {error}
        </div>
      )}

      <div className="profile-edit-form__avatar">

        {formData.avatarUrl ? (
          <img
            src={formData.avatarUrl}
            alt={formData.name}
            className="profile-edit-form__avatar-image"
          />
        ) : (
          <div className="profile-edit-form__avatar-placeholder">
            {formData.name
              ? formData.name
                  .charAt(0)
                  .toUpperCase()
              : "U"}
          </div>
        )}

        <p className="profile-edit-form__avatar-text">
          Avatar upload coming soon
        </p>

      </div>

      <div className="profile-edit-form__group">
        <label htmlFor="name">
          Display Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={onChange}
        />
      </div>

      <div className="profile-edit-form__group">
        <label htmlFor="username">
          Username
        </label>

        <input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={onChange}
        />
      </div>

      <div className="profile-edit-form__group">
        <label htmlFor="email">
          Email
        </label>

        <input
          id="email"
          type="email"
          value={formData.email || ""}
          readOnly
          disabled
        />
      </div>

      <div className="profile-edit-form__group">
        <label htmlFor="phone">
          Phone
        </label>

        <input
          id="phone"
          name="phone"
          type="text"
          value={formData.phone}
          onChange={onChange}
        />
      </div>

      <div className="profile-edit-form__group">
        <label htmlFor="timezone">
          Timezone
        </label>

        <input
          id="timezone"
          name="timezone"
          type="text"
          value={formData.timezone}
          onChange={onChange}
        />
      </div>

      <div className="profile-edit-form__group">
        <label htmlFor="language">
          Language
        </label>

        <input
          id="language"
          name="language"
          type="text"
          value={formData.language}
          onChange={onChange}
        />
      </div>

      <div className="profile-edit-form__group">
        <label htmlFor="bio">
          Bio
        </label>

        <textarea
          id="bio"
          name="bio"
          rows={5}
          value={formData.bio}
          onChange={onChange}
        />
      </div>

      <div className="profile-edit-form__actions">

        <button
          type="button"
          onClick={onSave}
          disabled={
            saving ||
            !hasChanges
          }
        >
          {saving
            ? "Saving..."
            : "Save"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
        >
          Cancel
        </button>

      </div>

    </section>
  );
};

export default ProfileEditForm;