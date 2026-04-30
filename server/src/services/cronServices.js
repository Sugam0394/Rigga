 import cron from 'node-cron';
import { User } from '../models/userModel.js';
import { TaskBox } from '../models/taskModel.js';
import { validateProofWithGroq } from '../validators/visionValidator.js';
import { executeEscalation } from './escalationServices.js'; // 🔥 New Import
import logger from '../utils/logger.js';

export const startCron = () => {
  // Har roz 10 PM IST par check karega
  cron.schedule('30 16 * * *', async () => {
    logger.info("⏰ Rigga Cron Started: Processing failures...");

    try {
      const overdueTasks = await TaskBox.find({
        status: 'pending',
        deadline: { $lt: new Date() }
      });

      for (let task of overdueTasks) {
        const user = await User.findById(task.userId);
        if (!user) continue;

        let aiVerdict = "none";
        if (task.proof?.url) {
          aiVerdict = await validateProofWithGroq(task.proof.url, task.goal);
        }

        if (aiVerdict === "ok") {
          // 🎉 SUCCESS
          task.status = 'done';
          user.totalWins += 1;
          user.currentStreak += 1;
          logger.info(`✅ ${user.name} passed via AI Vision.`);
        } else {
          // 💀 FAILURE & ESCALATION
          task.status = 'failed';
          user.totalFails += 1;
          user.currentStreak = 0;
          
          // Level up (1 to 4)
          task.level = Math.min((task.level || 1) + 1, 4);

          // Call the escalation service
          await executeEscalation(task, user);
        }

        await task.save();
        await user.save();
      }

      logger.info("✅ Cron Escalation Process Finished.");
    } catch (err) {
      logger.error("❌ Cron Global Error:", err.message);
    }
  });
};
 