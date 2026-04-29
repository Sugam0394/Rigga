 import { User } from '../models/userModel.js';
import logger from '../utils/logger.js'; // 🔥 ADD
import { handleStateTransition } from '../services/stateMachine.js';

export const handleWebhook = async (message, from) => {
  try {
    logger.info("📩 Incoming webhook", { from, message });

    let user = await User.findOne({ whatsappNumber: from });

    if (!user) {
      user = await User.create({
        whatsappNumber: from,
        phone: from.replace('whatsapp:', ''),
      });

      logger.info("🆕 New user created", { userId: user._id, from });
    }

    if (!message) {
      return { reply: 'Message bhej bhai 😅', statusCode: 200 };
    }

    const result = await handleStateTransition(user, message);

    logger.info("📤 Reply generated", {
      userId: user._id,
      reply: result.reply
    });

    return { reply: result.reply, statusCode: 200 };

  } catch (error) {
    logger.error("❌ Controller error", {
      error: error.message,
      stack: error.stack,
      from
    });

    return { reply: 'System error 😅', statusCode: 500 };
  }
};