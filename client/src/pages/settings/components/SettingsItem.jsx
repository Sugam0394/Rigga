import "./SettingsItem.css";

const SettingsItem = ({
  title,
  value,
  onClick,
  disabled = false,
  showChevron = true,
}) => {
  return (
    <button
      type="button"
      className="settings-item"
      onClick={onClick}
      disabled={disabled}
    >
      <div className="settings-item__content">
        <span className="settings-item__title">
          {title}
        </span>

        {value && (
          <span className="settings-item__value">
            {value}
          </span>
        )}
      </div>

      {showChevron && (
        <span
          className="settings-item__chevron"
          aria-hidden="true"
        >
          ›
        </span>
      )}
    </button>
  );
};

export default SettingsItem;