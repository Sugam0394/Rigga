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
  // ⏰ roz raat 10 baje
   cron.schedule('30 16 * * *', async () => {

    logger.info("⏰ Cron started");

    const users = await User.find({ state: 'active' });
    const today = getTodayUTC();

   

    for (let user of users) {
      try {

        // 🔥 check miss using UTC
        const isMiss =
          !user.lastCheckinDate ||
          !isSameDayUTC(user.lastCheckinDate, today);

        if (!isMiss) continue;

        let newMissCount = user.missCount + 1;

        let message = '';
        if (newMissCount === 1) {
          message = getRandom(activeMessages.miss1);
        } else if (newMissCount === 2) {
          message = getRandom(activeMessages.miss2);
        } else {
          message = getRandom(activeMessages.miss3);
        }

        logger.info("📛 User missed", {
          userId: user._id,
          missCount: newMissCount
        });

        // ✅ USER MESSAGE (WITH RETRY)
        if (user.whatsappNumber) {
          try {
            await sendWhatsAppMessage(user.whatsappNumber, message);
          } catch (err) {
            logger.error("❌ Failed to send user message", {
              userId: user._id,
              error: err.message
            });
          }
        }

        // 🔥 WITNESS MESSAGE
        const witness = await Witness.findOne({
          userId: user._id,
          isActive: true,
        });

        if (witness) {
          const habit = await Habit.findOne({
            userId: user._id,
            isActive: true,
          });

          const roastMsg = `💀 ${user.name || "Tera dost"} aaj apna goal miss kar gaya!

Goal: ${habit?.goalText || "Unknown"}

Isko thoda seedha karo 😏`;

          try {
            await sendWhatsAppMessage(witness.whatsappNumber, roastMsg);
          } catch (err) {
            logger.error("❌ Witness message failed", {
              witness: witness.whatsappNumber,
              error: err.message
            });
          }
        }

        // 🔥 ATOMIC UPDATE (NO user.save())
        await User.findByIdAndUpdate(user._id, {
          missCount: newMissCount,
          lastCronRun: new Date()
        });

      } catch (err) {
        logger.error("❌ Cron user processing failed", {
          userId: user._id,
          error: err.message
        });
      }
    }

    logger.info("✅ Cron completed", {
      usersProcessed: users.length
    });

  });
};