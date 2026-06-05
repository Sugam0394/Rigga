import express from "express";

import dashboardController
  from "../controllers/dashboardController.js";

const router = express.Router();

router.get(
  "/challenges/:id/dashboard",
  dashboardController
    .getChallengeDashboard
);

export default router;