 import apiClient from "../api/apiClient";


 

export const requestOtp = async (
  phone
) => {
  const response =
    await apiClient.post(
      "/auth/request-otp",
      { phone }
    );

  return response.data;
};

export const verifyOtp = async (
  phone,
  otp
) => {
  const response =
    await apiClient.post(
      "/auth/verify-otp",
      {
        phone,
        otp,
      }
    );

  return response.data;
};

 export const completeProfile = async (
  profileData
) => {
  const response =
    await apiClient.post(
      "/auth/complete-profile",
      profileData
    );

  return response.data;
};

export const getCurrentUser = async () => {
    const response =
      await apiClient.get(
        "/auth/me"
      );

    return response.data;
  };

  export const googleSignIn = async (
  idToken
) => {
  const response =
    await apiClient.post(
      "/auth/google",
      {
        idToken,
      }
    );

  return response.data;
};

export const updateProfile = async (
  profileData
) => {
  const response =
    await apiClient.post(
      "/auth/update-profile",
      profileData
    );

  return response.data;
};

  export const logoutUser =  async () => {
    const response =
      await apiClient.post(
        "/auth/logout"
      );

    return response.data;
  };