import "./SettingsSection.css";

const SettingsSection = ({
  title,
  children,
}) => {
  return (
    <section className="settings-section">
      <h2 className="settings-section__title">
        {title}
      </h2>

      <div className="settings-section__content">
        {children}
      </div>
    </section>
  );
};

export default SettingsSection;