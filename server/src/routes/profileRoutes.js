import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import profileController from "../controllers/profileController.js";

const router = express.Router();

router.get(
  "/profile",
  authMiddleware,
  profileController.getProfile
);

router.patch(
  "/profile",
  authMiddleware,
  profileController.updateProfile
);

export default router;