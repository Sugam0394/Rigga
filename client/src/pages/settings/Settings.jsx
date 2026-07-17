 import { useNavigate } from "react-router-dom";

import SettingsHeader from "./components/SettingsHeader";
import SettingsSection from "./components/SettingsSection";
import SettingsItem from "./components/SettingsItem";
import SettingsFooter from "./components/SettingsFooter";

import useProfile from "../ProfilePage/hooks/useProfile";

import "./Settings.css";

const Settings = () => {
  const navigate = useNavigate();

  const {
    profile,
    loading,
    error,
  } = useProfile();

  const handleBack = () => {
    navigate(-1);
  };

 const handleUsername = () => {
  // Profile Engine
};

const handleLanguage = () => {
  // Profile Engine
};

const handleTimezone = () => {
  // Profile Engine
};

const handleAuthentication = () => {
  // Authentication Engine
};

const handleNotificationPreferences = () => {
  // Future Notification Engine
};

const handlePrivacySettings = () => {
  // Future Privacy Engine
};

  if (loading) {
    return (
      <main className="settings-page">
        <p>Loading settings...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="settings-page">
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="settings-page">

      <SettingsHeader
        onBack={handleBack}
      />

      <SettingsSection title="Account">

        <SettingsItem
    title="Username"
    value={profile?.username || "Username not set"}
    onClick={handleUsername}
/>

        <SettingsItem
    title="Language"
    value={profile?.language || "Not set"}
    onClick={handleLanguage}
/>

        <SettingsItem
    title="Timezone"
    value={profile?.timezone || "Not set"}
    onClick={handleTimezone}
/>

      </SettingsSection>

      <SettingsSection title="Security">

        <SettingsItem
    title="Authentication"
    value="Phone + Google"
    onClick={handleAuthentication}
/>

      </SettingsSection>

      <SettingsSection title="Notifications">

        <SettingsItem
    title="Notification Preferences"
    value="Coming Soon"
    onClick={handleNotificationPreferences}
    disabled
    showChevron={false}
/>

      </SettingsSection>

      <SettingsSection title="Privacy">
<SettingsItem
    title="Privacy Settings"
    value="Coming Soon"
    onClick={handlePrivacySettings}
    disabled
    showChevron={false}
/>
       

      </SettingsSection>

      <SettingsSection title="About">

        <SettingsItem
          title="App Version"
          value="Rigga V2"
          showChevron={false}
        />

      </SettingsSection>

      <SettingsFooter />

    </main>
  );
};

export default Settings;