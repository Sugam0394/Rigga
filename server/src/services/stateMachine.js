 import { User } from '../models/userModel.js';
import { Habit } from '../models/habitModel.js';
import { Witness } from '../models/witnessModel.js';
import { onboardingMessages, activeMessages } from './messages.js';
import { getTodayUTC, isSameDayUTC, isYesterdayUTC } from '../utils/dateUtils.js';
import logger from '../utils/logger.js';

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const handleStateTransition = async (user, message) => {

  // 🔥 Always fresh user
  const freshUser = await User.findById(user._id);

  const text = message.toLowerCase().trim();
  let reply = '';

  logger.info("🔄 State machine start", {
    userId: freshUser._id,
    state: freshUser.state,
    message
  });

  switch (freshUser.state) {

    // 🟢 NEW
    case 'new':
      reply = getRandom(onboardingMessages.askName);

      await User.findByIdAndUpdate(freshUser._id, {
        state: 'asked_name'
      });
      break;

    // 🟡 NAME
    case 'asked_name':
      if (text === 'hi' || text.length < 2) {
        reply = "Naam bata bhai 😅 'hi' nahi";
        break;
      }

      reply = getRandom(onboardingMessages.askGoal(message));

      await User.findByIdAndUpdate(freshUser._id, {
        name: message,
        state: 'asked_goal'
      });
      break;

    // 🟠 GOAL
    case 'asked_goal':
      await Habit.create({
        userId: freshUser._id,
        goalText: message,
      });

      await User.findByIdAndUpdate(freshUser._id, {
        goal: message,
        state: 'asked_witness'
      });

      reply = getRandom(onboardingMessages.askWitness);
      break;

    // 🔵 WITNESS
    case 'asked_witness':
      if (text === 'skip') {

        await User.findByIdAndUpdate(freshUser._id, {
          state: 'active'
        });

        reply = getRandom(onboardingMessages.setupDone);
        break;
      }

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

      await User.findByIdAndUpdate(freshUser._id, {
        witness: number,
        state: 'active'
      });

      logger.info("👀 Witness added", {
        userId: freshUser._id,
        witness: number
      });

      reply = "🔥 Witness set! Ab bhaag nahi sakta 😈";
      break;

    // 🔴 ACTIVE
    case 'active':

      // ✅ DONE
      if (text === 'done') {

        const today = getTodayUTC();

        if (isSameDayUTC(freshUser.lastCheckinDate, today)) {
          reply = "Aaj already kar liya 😏";
          break;
        }

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
          lastActiveDate: today,
          missCount: 0,
        });

        logger.info("🔥 Streak updated", {
          userId: freshUser._id,
          streak,
          longestStreak
        });

        const msg = getRandom(activeMessages.done);
        reply = `${msg} 🔥 Streak: ${streak}`;
        break;
      }

      // 📊 STREAK CHECK
      if (text === 'streak') {
        reply = `🔥 Current: ${freshUser.currentStreak}\n🏆 Best: ${freshUser.longestStreak}`;
        break;
      }

      // ❓ HELP
      if (text === 'help') {
        reply = "Commands:\n- done ✅\n- streak 📊\n- help ❓";
        break;
      }

      // 🤖 DEFAULT
      reply = getRandom(activeMessages.unknown);
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