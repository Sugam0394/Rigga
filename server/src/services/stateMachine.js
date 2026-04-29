 import { User } from '../models/userModel.js';
import { Habit } from '../models/habitModel.js';
import { Witness } from '../models/witnessModel.js';
import { onboardingMessages, activeMessages } from './messages.js';
import { getTodayUTC , isSameDayUTC , isYesterdayUTC } from '../utils/dateUtils.js';
import logger from '../utils/logger.js'; // 🔥 ADD THIS

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

 export const handleStateTransition = async (user, message) => {

  // 🔥 ALWAYS GET FRESH USER (IMPORTANT)
  const freshUser = await User.findById(user._id);

  let reply = '';

  logger.info("🔄 State machine start", {
    userId: freshUser._id,
    state: freshUser.state,
    message
  });

  switch (freshUser.state) {

    case 'new':
      reply = getRandom(onboardingMessages.askName);

      await User.findByIdAndUpdate(freshUser._id, { state: 'asked_name' });
      break;

    case 'asked_name':
      if (message.toLowerCase() === 'hi') {
        reply = "Naam bata bhai 😅 'hi' nahi";
      } else {
        const goalMsgs = onboardingMessages.askGoal(message);
        reply = getRandom(goalMsgs);

        await User.findByIdAndUpdate(freshUser._id, {
          name: message,
          state: 'asked_goal'
        });
      }
      break;

    case 'asked_goal':
      await Habit.create({
        userId: freshUser._id,
        goalText: message,
      });

      reply = getRandom(onboardingMessages.askWitness);

      await User.findByIdAndUpdate(freshUser._id, { state: 'asked_witness' });
      break;

    case 'asked_witness':
      if (message.toLowerCase() === 'skip') {
        reply = getRandom(onboardingMessages.setupDone);
      } else {

        // 🔥 CLEAN + VALIDATE NUMBER
        const cleaned = message.replace(/\D/g, '');

        if (cleaned.length !== 10) {
          reply = "10 digit number bhej bhai";
          break;
        }

        const number = '+91' + cleaned;
        const whatsappNumber = `whatsapp:${number}`;

        await Witness.create({
          userId: freshUser._id,
          witnessNumber: number,
          whatsappNumber,
        });

        logger.info("👀 Witness added", {
          userId: freshUser._id,
          witness: number
        });

        reply = "🔥 Witness set! Ab sach me bhaag nahi sakta 😈";
      }

      await User.findByIdAndUpdate(freshUser._id, { state: 'active' });
      break;

    case 'active':
      if (message.toLowerCase() === 'done') {

        const today = getTodayUTC();

        if (isSameDayUTC(freshUser.lastCheckinDate, today)) {
          reply = "Aaj already kar liya 😏 overacting band kar";

          logger.warn("⚠️ Duplicate check-in", { userId: freshUser._id });

        } else {

          let streak = freshUser.currentStreak;

          if (isYesterdayUTC(freshUser.lastCheckinDate)) {
            streak += 1;
          } else {
            streak = 1;
          }

          const longestStreak = Math.max(streak, freshUser.longestStreak);

          await User.findByIdAndUpdate(freshUser._id, {
            currentStreak: streak,
            longestStreak,
            lastCheckinDate: today,
            missCount: 0,
          });

          logger.info("🔥 Streak updated", {
            userId: freshUser._id,
            streak,
            longestStreak
          });

          const msg = getRandom(activeMessages.done);
          reply = `${msg} 🔥 Streak: ${streak}`;
        }

      } else {
        reply = getRandom(activeMessages.unknown);
      }
      break;

    default:
      reply = 'System thoda hil gaya 😅';
  }

  logger.info("✅ State machine end", {
    userId: freshUser._id,
    finalReply: reply
  });

  return { reply };
};