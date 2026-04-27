 import { User } from "../models/userModel.js";

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