import { OAuth2Client } from "google-auth-library";

import googleConfig from "../config/googleConfig.js";
import authRepository from "../repositories/authRepository.js";
import userService from "./userService.js";
import authService from "./authService.js";

const client = new OAuth2Client(
  googleConfig.clientId
);

const authenticate = async (idToken) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: googleConfig.clientId,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error("Invalid Google token");
  }

  const {
    sub: googleId,
    email,
    name,
  } = payload;

  if (!email) {
    throw new Error(
      "Google account has no email"
    );
  }

  let user =
    await authRepository.findUserByGoogleId(
      googleId
    );

  let isNewUser = false;

  if (!user) {
    user =
      await userService.createGoogleUser({
        googleId,
        email,
        name,
        authProvider: "google",
      });

    isNewUser = true;
  } else {
    await authRepository.updateLastLogin(
      user._id
    );
  }

  const token =
    authService.generateToken(user);

  return {
    user,
    token,
    isNewUser,
  };
};

export default {
  authenticate,
};