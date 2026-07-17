import settingsRepository from "../repositories/settingsRepository.js";

const VALID_THEMES = [
  "light",
  "dark",
  "system",
];

const VALID_VISIBILITY = [
  "public",
  "private",
];

const VALID_TIME_FORMATS = [
  "12h",
  "24h",
];

const getSettings = async (
  userId
) => {
  const user =
    await settingsRepository.getSettingsByUserId(
      userId
    );

  if (!user) {
    throw new Error(
      "User not found"
    );
  }

  return user.settings;
};

const updateSettings = async (
  userId,
  settingsData
) => {
  const user =
    await settingsRepository.getSettingsByUserId(
      userId
    );

  if (!user) {
    throw new Error(
      "User not found"
    );
  }

  const currentSettings =
    user.settings || {};

  const updatedSettings = {
    ...currentSettings,

    ...settingsData,

    notificationPreferences: {
      ...currentSettings.notificationPreferences,
      ...settingsData.notificationPreferences,
    },

    privacyPreferences: {
      ...currentSettings.privacyPreferences,
      ...settingsData.privacyPreferences,
    },

    appPreferences: {
      ...currentSettings.appPreferences,
      ...settingsData.appPreferences,
    },
  };

  if (
    updatedSettings.theme &&
    !VALID_THEMES.includes(
      updatedSettings.theme
    )
  ) {
    throw new Error(
      "Invalid theme"
    );
  }

  if (
    updatedSettings.privacyPreferences
      ?.profileVisibility &&
    !VALID_VISIBILITY.includes(
      updatedSettings
        .privacyPreferences
        .profileVisibility
    )
  ) {
    throw new Error(
      "Invalid profile visibility"
    );
  }

  if (
    updatedSettings.privacyPreferences
      ?.activityVisibility &&
    !VALID_VISIBILITY.includes(
      updatedSettings
        .privacyPreferences
        .activityVisibility
    )
  ) {
    throw new Error(
      "Invalid activity visibility"
    );
  }

  if (
    updatedSettings.appPreferences
      ?.timeFormat &&
    !VALID_TIME_FORMATS.includes(
      updatedSettings
        .appPreferences
        .timeFormat
    )
  ) {
    throw new Error(
      "Invalid time format"
    );
  }

  const updatedUser =
    await settingsRepository.updateSettings(
      userId,
      updatedSettings
    );

  return updatedUser.settings;
};

export default {
  getSettings,
  updateSettings,
};