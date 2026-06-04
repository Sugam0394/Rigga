import express from "express";
import progressReportController from "../controllers/progressReportController.js";

const router = express.Router();

router.post(
  "/",
  progressReportController.submitProgressReport
);

 

export default router;