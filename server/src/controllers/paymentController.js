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

    if (
  !razorpay_order_id ||
  !razorpay_payment_id ||
  !razorpay_signature
) {
  return res.status(400).json({
    message:
      "Missing payment details",
  });
}

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

    // USER CHECK
if (!user) {
  return res.status(404).json({
    message: "User not found",
  });
}

    user.subscriptionStatus = "paid";

    user.subscriptionId = razorpay_payment_id;

  if (
  user.subscriptionId ===
  razorpay_payment_id
) {
  return res.status(400).json({
    message:
      "Payment already processed",
  });
}

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


export const paymentWebhook =
  async (req, res) => {
    try {
      // SIGNATURE HEADER
      const signature =
        req.headers[
          "x-razorpay-signature"
        ];

      // RAW BODY
      const body =
        JSON.stringify(req.body);

      // GENERATE SIGNATURE
      const expectedSignature =
        crypto
          .createHmac(
            "sha256",
            process.env
              .RAZORPAY_WEBHOOK_SECRET
          )
          .update(body)
          .digest("hex");

      // VERIFY
      const isAuthentic =
        signature ===
        expectedSignature;

      if (!isAuthentic) {
        return res.status(400).json({
          message:
            "Invalid webhook signature",
        });
      }

      // EVENT
      const event =
        req.body.event;

      console.log(
        "WEBHOOK EVENT:",
        event
      );

      // PAYMENT CAPTURED
      if (
        event ===
        "payment.captured"
      ) {
        const payment =
          req.body.payload.payment
            .entity;

        console.log(
          "PAYMENT ID:",
          payment.id
        );

        console.log(
          "AMOUNT:",
          payment.amount
        );

        console.log(
          "EMAIL:",
          payment.email
        );

        // FUTURE:
        // analytics
        // receipts
        // subscription sync
      }

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      console.log(
        "WEBHOOK ERROR:",
        error
      );

      return res.status(500).json({
        message:
          "Webhook failed",
      });
    }
  };