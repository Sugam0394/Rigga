import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js"

import dashboardController
  from "../controllers/dashboardController.js";

const router = express.Router();

router.get(
  "/challenges/:id/dashboard", authMiddleware,
  dashboardController
    .getChallengeDashboard
);

export default router;