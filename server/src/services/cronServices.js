 import cron from 'node-cron';
import { User } from '../models/userModel.js';
import { TaskBox } from '../models/taskModel.js';   // Hum naya model use karenge
import { sendWhatsAppMessage } from './twilioServices.js';
 import { generateAIReply } from './aiServices.js'; // Groq Roast ke liye
import logger from '../utils/logger.js';
import { validateProofWithGroq } from '../validators/visionValidator.js';
 

export const startCron = () => {
  // Har roz 10 PM IST (16:30 UTC) par chalega
  cron.schedule('30 16 * * *', async () => {
    logger.info("⏰ Rigga Cron Started: Checking pending tasks with AI Vision...");

    try {
      // 1. Saare PENDING tasks dhundo jinki deadline nikal chuki hai
      const overdueTasks = await TaskBox.find({
        status: 'pending',
        deadline: { $lt: new Date() }
      });

      for (let task of overdueTasks) {
        const user = await User.findById(task.userId);
        if (!user) continue;

        let aiVerdict = "none";
        
        // 2. Check karo agar proof submitted hai toh AI se verify karwao
        if (task.proof && task.proof.url) {
          logger.info(`👁️ AI is inspecting proof for ${user.name}...`);
          aiVerdict = await validateProofWithGroq(task.proof.url, task.goal);
        }

        // 3. Logic Decision Tree based on AI Verdict[cite: 2]
        if (aiVerdict === "ok") {
          // 🎉 CASE 1: SUCCESS (Proof is valid)[cite: 2]
          task.status = 'done';
          task.level = 4;
          user.totalWins = (user.totalWins || 0) + 1;
          
          const praiseMsg = await generateAIReply(
            `User COMPLETED task: ${task.goal}. Give backhanded praise.`, 
            { name: user.name, goal: task.goal, level: 4 }
          );
          await sendWhatsAppMessage(user.whatsappNumber, praiseMsg);
          logger.info(`✅ Task ${task._id} verified by AI as SUCCESS.`);

        } else {
          // 💀 CASE 2: FAILURE (No proof or Fake proof)[cite: 2]
          task.status = 'failed';
          task.level = Math.min((task.level || 1) + 1, 4);
          user.totalFails = (user.totalFails || 0) + 1;
          user.currentStreak = 0;

          const failReason = aiVerdict === "fake" ? "bheji hui photo fake hai" : "proof submit hi nahi kiya";
          const roastMessage = await generateAIReply(
            `User FAILED task: ${task.goal}. Reason: ${failReason}. Brutally roast them.`, 
            { name: user.name, goal: task.goal, level: task.level }
          );

          // User ko roast bhejo[cite: 2]
          await sendWhatsAppMessage(user.whatsappNumber, roastMessage);

          // Witness ko alert bhejo[cite: 2]
          if (task.witness && task.witness.phone) {
            const witnessAlert = `🚨 ALERT: ${user.name} ne goal fail kiya ("${task.goal}"). AI Verdict: ${aiVerdict.toUpperCase()}. Check karo! 😈`;
            await sendWhatsAppMessage(task.witness.phone, witnessAlert);
            task.witness.notified = true;
          }
          logger.info(`💀 Task ${task._id} failed. AI Verdict: ${aiVerdict}`);
        }

        // 4. Save updates[cite: 2]
        await task.save();
        await user.save();
      }

      logger.info("✅ Cron completed successfully");
    } catch (err) {
      logger.error("❌ Cron global error:", err.message);
    }
  });
};
 