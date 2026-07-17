import "./SettingsHeader.css";

const SettingsHeader = ({
  title = "Settings",
  description = "Manage your account preferences and application settings.",
  onBack,
}) => {
  return (
    <header className="settings-header">
      <button
        type="button"
        className="settings-header__back-button"
        onClick={onBack}
        aria-label="Go back"
      >
        ←
      </button>

      <div className="settings-header__content">
        <h1 className="settings-header__title">
          {title}
        </h1>

        <p className="settings-header__description">
          {description}
        </p>
      </div>
    </header>
  );
};

export default SettingsHeader;