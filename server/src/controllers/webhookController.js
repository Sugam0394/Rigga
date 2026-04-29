 import { User } from '../models/userModel.js';
import { handleStateTransition } from '../services/stateMachine.js';
import logger from '../utils/logger.js';

export const handleWebhook = async (messageData, from) => {
  try {
    logger.info("📩 Incoming webhook", { from, messageData });

    let user = await User.findOne({ whatsappNumber: from });

    // 🆕 New user
    if (!user) {
      user = await User.create({
        whatsappNumber: from,
        phone: from.replace('whatsapp:', ''),
      });

      logger.info("🆕 New user created", { userId: user._id, from });
    }

    // ❌ Empty message check
    if (!messageData || (!messageData.text && !messageData.mediaUrl)) {
      return { reply: 'Message bhej bhai 😅', statusCode: 200 };
    }

    // ✅ FIX: Proper object pass karo
    const result = await handleStateTransition(user, messageData);

    logger.info("📤 Reply generated", {
      userId: user._id,
      reply: result.reply
    });

    return {
      reply: result.reply,
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