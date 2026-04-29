 import { User } from '../models/userModel.js';
import { handleStateTransition } from '../services/stateMachine.js';
import { updateUserStreak } from '../services/streakServices.js';
import logger from '../utils/logger.js';

export const handleWebhook = async (message, from) => {
  try {
    logger.info("📩 Incoming webhook", { from, message });

    let user = await User.findOne({ whatsappNumber: from });

    // 🆕 New user
    if (!user) {
      user = await User.create({
        whatsappNumber: from,
        phone: from.replace('whatsapp:', ''),
      });

      logger.info("🆕 New user created", { userId: user._id, from });
    }

    // ❌ Empty message
    if (!message) {
      return { reply: 'Message bhej bhai 😅', statusCode: 200 };
    }

    // 🔥 STEP 1 — Update streak
    const { message: streakMsg } = await updateUserStreak(user.phone);

    // 🔥 STEP 2 — State machine
    const result = await handleStateTransition(user, message);

    logger.info("📤 Reply generated", {
      userId: user._id,
      reply: result.reply
    });

    return {
      reply: `${streakMsg}\n\n${result.reply}`,
      statusCode: 200
    };

  } catch (error) {
    logger.error("❌ Controller error", {
      error: error.message,
      stack: error.stack,
      from
    });

    return { reply: 'System error 😅', statusCode: 500 };
  }
};