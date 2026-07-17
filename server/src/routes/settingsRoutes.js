import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import settingsController from "../controllers/settingsController.js";

const router =
  express.Router();

router.get(
  "/settings",
  authMiddleware,
  settingsController.getSettings
);

router.patch(
  "/settings",
  authMiddleware,
  settingsController.updateSettings
);

export default router;