 import { TaskBox } from '../models/taskModel.js';
import { User } from '../models/userModel.js';
import { sendWhatsAppMessage } from './twilioServices.js';

/**
 * ✅ Goal: Purane task ke baad naya cycle start karna
 */
 export const unlockNextTaskBox = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return null;

    // Reset user state to ask for next goal
    await User.findByIdAndUpdate(userId, {
      activeTaskBox: null,
      state: 'asked_goal'
    });

    const promptMessage = "🏁 *NAYA DIN, NAYA GOAL!*\n\nAb batao next goal kya hai?";
    await sendWhatsAppMessage(user.whatsappNumber, promptMessage);

    return { success: true, message: "Next cycle started" };
  } catch (err) {
    console.error("❌ Unlock error:", err);
    return null;
  }
};