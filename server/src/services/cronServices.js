import cron from 'node-cron';
import { User } from '../models/userModel.js';
import { activeMessages } from './messages.js';

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const startCron = () => {
  // ⏰ roz raat 10 baje run hoga
  cron.schedule('0 22 * * *', async () => {
    console.log('⏰ Running miss check...');

    const users = await User.find({ state: 'active' });

    const today = new Date();

    for (let user of users) {
      if (!user.lastCheckinDate || user.lastCheckinDate.toDateString() !== today.toDateString()) {
        
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

        // 👉 abhi sirf console (Twilio baad me connect karenge)
        
        await user.save();
      }
    }
  });
};