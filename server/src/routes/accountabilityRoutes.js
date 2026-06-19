import express from "express";

import accountabilityController from "../controllers/accountabilityController.js";

const router = express.Router();

router.get("/accountability/motivation",accountabilityController.getMotivationMessage
);

export default router;