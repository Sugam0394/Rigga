import Razorpay from "razorpay";

import crypto from "crypto";

import { User } from "../models/userModel.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,

  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const options = {
      amount: 199 * 100,

      currency: "INR",

      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(
      options
    );

    return res.status(200).json({
      message: "Order created successfully",

      orderId: order.id,

      razorpayKey: process.env.RAZORPAY_KEY_ID,

      order,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to create order",
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // Generate expected signature
    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET
        )
        .update(
          razorpay_order_id +
            "|" +
            razorpay_payment_id
        )
        .digest("hex");

    // Compare signatures
    const isAuthentic =
      generatedSignature ===
      razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        message: "Invalid payment signature",
      });
    }

    // Unlock user
    const user = await User.findById(
      req.user._id
    );

    user.subscriptionStatus = "paid";

    user.subscriptionId = razorpay_payment_id;

    // 30 days expiry
    const expiryDate = new Date();

    expiryDate.setDate(
      expiryDate.getDate() + 30
    );

    user.subscriptionExpiry = expiryDate;

    await user.save();

    return res.status(200).json({
      message: "Payment verified successfully",

      subscriptionStatus:
        user.subscriptionStatus,

      subscriptionExpiry:
        user.subscriptionExpiry,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Payment verification failed",
    });
  }
};

 export const paymentWebhook = async (
  req,
  res
) => {
  try {
    const event = req.body.event;

    // Payment captured
    if (event === "payment.captured") {
      console.log(
        "Payment captured webhook received"
      );

      // Future:
      // update user here
      // using metadata/email/phone

      return res.status(200).json({
        success: true,
      });
    }

    return res.status(200).json({
      received: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Webhook failed",
    });
  }
};