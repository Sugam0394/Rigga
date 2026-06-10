import express from "express";
import progressReportController from "../controllers/progressReportController.js";
import authMiddleware from "../middlewares/authMiddleware.js"
import upload from "../middlewares/uploadMiddleware.js";


const router = express.Router();

 router.post("/progress-reports",authMiddleware,upload.single("image"),progressReportController.submitProgressReport);


router.get("/challenges/:id/progress-reports",authMiddleware,progressReportController.getChallengeReports);
 

export default router;