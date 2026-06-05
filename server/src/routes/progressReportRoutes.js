import express from "express";
import progressReportController from "../controllers/progressReportController.js";

const router = express.Router();

router.post(
  "/progress-reports",
  progressReportController.submitProgressReport
);

 

export default router;