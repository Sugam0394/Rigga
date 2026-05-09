 import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/userModel.js";

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      phone: user.whatsappNumber,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export const registerUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        message: "Phone and password are required",
      });
    }

    let user = await User.findOne({
      whatsappNumber: phone,
    });

    // Existing WhatsApp user
    if (user) {
      // Already registered
      if (user.password) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      user.password = hashedPassword;

      await user.save();
    } else {
      // New user
      const hashedPassword = await bcrypt.hash(password, 10);

      user = await User.create({
        whatsappNumber: phone,
        password: hashedPassword,
      });
    }

    const token = generateToken(user);

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
    _id: user._id,
    whatsappNumber: user.whatsappNumber,
    email: user.email,
    subscriptionStatus: user.subscriptionStatus,
  },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        message: "Phone and password are required",
      });
    }

    const user = await User.findOne({
      whatsappNumber: phone,
    });

    if (!user || !user.password) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      message: "Login successful",
      token,
       user: {
    _id: user._id,
    whatsappNumber: user.whatsappNumber,
    email: user.email,
    subscriptionStatus: user.subscriptionStatus,
  },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getMe = async (req, res) => {
  return res.status(200).json({
    user: req.user,
  });
};













export const handleUser = async (from) => {
  // from = "whatsapp:+91xxxx"

  let user = await User.findOne({ whatsappNumber: from });

  if (!user) {
    user = await User.create({
      whatsappNumber: from,
      phone: from.replace("whatsapp:", ""),
    });
  }

  return user;
};