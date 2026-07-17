import profileRepository from "../repositories/profileRepository.js";

const getProfile = async (userId) => {
  const user =
    await profileRepository.getProfileById(
      userId
    );

  if (!user) {
    throw new Error(
      "Profile not found"
    );
  }

  return {
    id: user._id,
    name: user.name,
    username: user.username,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    avatarUpdatedAt:
      user.avatarUpdatedAt,
    email: user.email,
    phone: user.phone,
    timezone: user.timezone,
    language: user.language,
    role: user.role,
  };
};

const updateProfile = async (
  userId,
  profileData
) => {
  const user =
    await profileRepository.getProfileById(
      userId
    );

  if (!user) {
    throw new Error(
      "Profile not found"
    );
  }

  if (
    profileData.username &&
    profileData.username !==
      user.username
  ) {
    const existingUsername =
      await profileRepository.getProfileByUsername(
        profileData.username
      );

    if (existingUsername) {
      throw new Error(
        "Username already exists"
      );
    }
  }

  const updateData = {
    name:
      profileData.name ??
      user.name,

    username:
      profileData.username ??
      user.username,

    bio:
      profileData.bio ??
      user.bio,

    avatarUrl:
      profileData.avatarUrl ??
      user.avatarUrl,

    avatarUpdatedAt:
      profileData.avatarUrl
        ? new Date()
        : user.avatarUpdatedAt,

    timezone:
      profileData.timezone ??
      user.timezone,

    language:
      profileData.language ??
      user.language,
  };

  if (profileData.phone) {
    const phoneRegex =
      /^\+[1-9]\d{7,14}$/;

    if (
      !phoneRegex.test(
        profileData.phone
      )
    ) {
      throw new Error(
        "Phone must be in E.164 format"
      );
    }

    updateData.phone =
      profileData.phone;
  }

  const updatedUser =
    await profileRepository.updateProfile(
      userId,
      updateData
    );

  return {
    id: updatedUser._id,
    name: updatedUser.name,
    username:
      updatedUser.username,
    bio: updatedUser.bio,
    avatarUrl:
      updatedUser.avatarUrl,
    avatarUpdatedAt:
      updatedUser.avatarUpdatedAt,
    email: updatedUser.email,
    phone: updatedUser.phone,
    timezone:
      updatedUser.timezone,
    language:
      updatedUser.language,
    role: updatedUser.role,
  };
};

export default {
  getProfile,
  updateProfile,
};