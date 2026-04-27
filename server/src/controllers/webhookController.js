import { User } from '../models/userModel.js';
import { handleStateTransition } from '../services/stateMachine.js';

 export const handleWebhook = async (message, from) => {
  try {
    let user = await User.findOne({ whatsappNumber: from });

    if (!user) {
      user = await User.create({
        whatsappNumber: from,
        phone: from.replace('whatsapp:', ''),
      });
    }

    if (!message) {
      return { reply: 'Message bhej bhai 😅', statusCode: 200 };
    }

    const result = await handleStateTransition(user, message);

    return { reply: result.reply, statusCode: 200 };

  } catch (error) {
    console.error('❌ Controller error:', error);
    return { reply: 'System error 😅', statusCode: 500 };
  }
};