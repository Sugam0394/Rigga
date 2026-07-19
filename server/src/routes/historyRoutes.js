import express
  from "express";

import historyController
  from "../controllers/historyController.js";

import authMiddleware
  from "../middlewares/authMiddleware.js";

const router =
  express.Router();

router.get(
  "/challenges",
  authMiddleware,
  historyController.getChallengeHistory
);

export default router;