import express from "express";
import { protect } from "../middlewares/auth.js";
import { chatWithRigga , getChatHistory } from "../controllers/chatController.js";

const router = express.Router();

router.post("/chat", protect ,  chatWithRigga);

router.get("/history", protect, getChatHistory);

export default router;