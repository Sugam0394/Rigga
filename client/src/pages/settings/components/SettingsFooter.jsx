import "./SettingsFooter.css";

const SettingsFooter = ({
  version = "Rigga V2",
}) => {
  return (
    <footer className="settings-footer">
      <p className="settings-footer__version">
        {version}
      </p>

      <p className="settings-footer__tagline">
        Build accountability,
        one commitment at a time.
      </p>
    </footer>
  );
};

export default SettingsFooter;