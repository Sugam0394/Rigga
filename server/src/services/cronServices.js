 import cron from 'node-cron';
import { User } from '../models/userModel.js';
import { TaskBox } from '../models/taskModel.js';   // Hum naya model use karenge
import { sendWhatsAppMessage } from './twilioServices.js';
 import { generateAIReply } from './aiServices.js'; // Groq Roast ke liye
import logger from '../utils/logger.js';

export const startCron = () => {
  
  cron.schedule('30 16 * * *', async () => {
    logger.info("⏰ Rigga Cron Started: Checking pending tasks...");

    try {
       
      const overdueTasks = await TaskBox.find({
        status: 'pending',
        deadline: { $lt: new Date() }
      });

      for (let task of overdueTasks) {
        const user = await User.findById(task.userId);
        if (!user) continue;

      
        const roastMessage = await generateAIReply(
          `User failed task: ${task.goal}. Proof not submitted.`, 
          { name: user.name, goal: task.goal, level: task.level }
        );

        // 3. User ko WhatsApp par roast bhejo
        await sendWhatsAppMessage(user.whatsappNumber, roastMessage);

        // 4. Witness ko alert bhejo (Day 3 Penalty)
        if (task.witness && task.witness.phone) {
          const witnessAlert = `🚨 ALERT: ${user.name} failed his goal: "${task.goal}".\n\nAb iska kya karna hai aap dekh lo! 😈`;
          await sendWhatsAppMessage(task.witness.phone, witnessAlert);
          task.witness.notified = true;
        }

        // 5. Update Task Status & User Stats
        task.status = 'failed';
        task.level = Math.min((task.level || 1) + 1, 4); // Increase failure level
        await task.save();

        user.totalFails = (user.totalFails || 0) + 1;
        user.currentStreak = 0; // Streak reset
        await user.save();

        logger.info(`💀 Task ${task._id} failed for user ${user.name}`);
      }

      logger.info("✅ Cron completed successfully");
    } catch (err) {
      logger.error("❌ Cron global error:", err.message);
    }
  });
};