import express from "express";
import progressReportController from "../controllers/progressReportController.js";
import authMiddleware from "../middlewares/authMiddleware.js"



const router = express.Router();

router.post(
  "/progress-reports", authMiddleware,
  progressReportController.submitProgressReport
);

 

export default router;