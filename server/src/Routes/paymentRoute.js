import express from "express";

import {
  createOrder,
  verifyPayment,
  paymentWebhook,
} from "../controllers/paymentController.js";

import { protect } from "../middlewares/auth.js";

import { checkSubscription } from "../middlewares/checkSubscription.js";

const router = express.Router();

router.post(
  "/create-order",
  protect,
  createOrder
);

router.post(
  "/verify",
  protect,
  verifyPayment
);

router.post(
  "/webhook",
  paymentWebhook
);

router.get(
  "/premium-test",
  protect,
  checkSubscription,
  (req, res) => {
    res.json({
      message:
        "Welcome to premium content",
    });
  }
);


   

export default router;