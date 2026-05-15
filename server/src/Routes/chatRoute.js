import express from "express";
import { protect } from "../middlewares/auth.js";
import { chatWithRigga } from "../controllers/chatController.js";

const router = express.Router();

router.post("/chat", protect ,  chatWithRigga);

export default router;