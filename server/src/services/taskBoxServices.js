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

    // 1. Create a Fresh TaskBox (Placeholder)
    const nextTaskBox = await TaskBox.create({
      userId: userId,
      goal: "Waiting for input...", 
      stakeType: "photo",
      stakeUrl: "pending",
      // Agar user ke paas purana witness save hai toh wahi use karo
      witness: user.witnessPhone ? { phone: user.witnessPhone, name: "Witness" } : { phone: "pending" },
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000), 
      status: "pending",
      level: 1,
      escalationLog: [{ at: new Date(), action: "task_unlocked", outcome: "success" }]
    });

    // 2. Link Task & Reset User State
    // Hum user ko 'asked_goal' state mein daal rahe hain taaki next message 
    // uska naya goal set kare.
    await User.findByIdAndUpdate(userId, {
      activeTaskBox: nextTaskBox._id,
      $push: { taskBoxes: nextTaskBox._id },
      state: 'asked_goal' 
    });

    // 3. User को WhatsApp पर अगला challenge पूछो
    const promptMessage = "🏁 *NAYA DIN, NAYA GOAL!*\n\nPurana task khatam. Ab batao kal ke liye tera naya goal kya hai? (Example: 6 AM Gym, 4 Hour Study)";
    await sendWhatsAppMessage(user.whatsappNumber, promptMessage);

    return nextTaskBox;
  } catch (err) {
    console.error("❌ Unlock error:", err);
    return null;
  }
};