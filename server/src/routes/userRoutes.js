import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js"

import userController
  from "../controllers/userController.js";

const router =
  express.Router();

router.post("/users",userController.createUser);

router.get("/users/:id", authMiddleware , userController.getUserById);

export default router;