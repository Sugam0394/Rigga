 import express from "express";

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

export default router;