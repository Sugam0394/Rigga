import {
  getCurrentUser,
} from "../../../services/authService";

export const getProfile =
  async () => {
    return await getCurrentUser();
  };