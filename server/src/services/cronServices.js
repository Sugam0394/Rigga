import cron from 'node-cron';
import { User } from '../models/userModel.js';
import { activeMessages } from './messages.js';
import { Witness } from '../models/witnessModel.js';
import { sendWhatsAppMessage } from './twilioServices.js';
import{ Habit } from '../models/habitModel.js';

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

 export const startCron = () => {
  // ⏰ roz raat 10 baje run hoga
  cron.schedule('0 22 * * *', async () => {
    console.log('⏰ Running miss check...');

    const users = await User.find({ state: 'active' });
    const today = new Date();

    for (let user of users) {
      const isMiss =
        !user.lastCheckinDate ||
        user.lastCheckinDate.toDateString() !== today.toDateString();

      if (isMiss) {
        // 🔥 miss logic
        user.missCount += 1;

        let message = '';

        if (user.missCount === 1) {
          message = getRandom(activeMessages.miss1);
        } else if (user.missCount === 2) {
          message = getRandom(activeMessages.miss2);
        } else {
          message = getRandom(activeMessages.miss3);
        }

        console.log(`📛 ${user.phone} missed → ${message}`);

        // ✅ USER KO MESSAGE
        if (user.whatsappNumber) {
          await sendWhatsAppMessage(user.whatsappNumber, message);
        }

        // 🔥 WITNESS LOGIC (MAIN FEATURE)
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

          await sendWhatsAppMessage(witness.whatsappNumber, roastMsg);
        }

        await user.save();
      }
    }
  });
};