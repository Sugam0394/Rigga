 import cron from 'node-cron';
import { User } from '../models/userModel.js';
import { activeMessages } from './messages.js';
import { Witness } from '../models/witnessModel.js';
import { Habit } from '../models/habitModel.js';
import { sendWhatsAppMessage } from './twilioServices.js';
import logger from '../utils/logger.js';
import { getTodayUTC , isSameDayUTC } from '../utils/dateUtils.js';

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

 export const startCron = () => {
  cron.schedule('30 16 * * *', async () => { // 10 PM IST
    logger.info("⏰ Cron started");

    const users = await User.find({ state: 'active' });
    const today = getTodayUTC();

    for (let user of users) {
      try {
        // 🛑 FIX 1: Idempotency Check (Double roast se bachao)
        if (user.lastCronRun && isSameDayUTC(user.lastCronRun, today)) {
          logger.info(`⏭️ Skipping ${user.name}, already processed today`);
          continue;
        }

        const isMiss = !user.lastCheckinDate || !isSameDayUTC(user.lastCheckinDate, today);

        // Agar user ne task kar liya hai, toh sirf lastCronRun update karo aur aage badho
        if (!isMiss) {
          await User.findByIdAndUpdate(user._id, { lastCronRun: today });
          continue;
        }

        let newMissCount = (user.missCount || 0) + 1;
        let message = getRandom(
          newMissCount === 1 ? activeMessages.miss1 : 
          newMissCount === 2 ? activeMessages.miss2 : activeMessages.miss3
        );

        // 1. User ko roast message bhejo
        await sendWhatsAppMessage(user.whatsappNumber, message).catch(err => 
          logger.error("❌ User message failed", { userId: user._id, error: err.message })
        );

        // 🛑 FIX 2: Witness Alert (Only for Miss 2 and above)
        if (newMissCount >= 2) {
          const witness = await Witness.findOne({ userId: user._id, isActive: true });
          if (witness) {
            const habit = await Habit.findOne({ userId: user._id, isActive: true });
            const roastMsg = `💀 ${user.name} ne aaj phir goal miss kiya!\n\nGoal: ${habit?.goalText || "Unknown"}\n\nIsse thoda seedha karo 😏`;
            
            await sendWhatsAppMessage(witness.whatsappNumber, roastMsg).catch(err => 
              logger.error("❌ Witness message failed", { error: err.message })
            );
          }
        }

        await User.findByIdAndUpdate(user._id, {
  missCount: newMissCount,
  currentStreak: 0,          // 🔥 RESET STREAK
  lastActiveDate: today,     // 🔥 KEEP TIMELINE CLEAN
  lastCronRun: today
});

      } catch (err) {
        logger.error("❌ Cron error for user", { userId: user._id, error: err.message });
      }
    }
    logger.info("✅ Cron completed");
  });
};