 import express from "express";
 import authMiddleware from "../middlewares/authMiddleware.js"

import authController
  from "../controllers/authController.js";

const router =
  express.Router();

router.post(
  "/auth/request-otp",
  authController.requestOtp
);

router.post(
  "/auth/verify-otp",
  authController.verifyOtp
);

router.post(
  "/auth/complete-profile",
  authController.completeProfile
);

router.get( "/auth/me", authMiddleware, authController.getCurrentUser);

router.post( "/auth/logout",authMiddleware, authController.logout);

export default router;