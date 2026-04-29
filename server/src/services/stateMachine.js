 import { User } from '../models/userModel.js';
import { Habit } from '../models/habitModel.js';
import { Witness } from '../models/witnessModel.js';
import { onboardingMessages, activeMessages } from './messages.js';
import logger from '../utils/logger.js';
import { canUseFeature } from './subscriptionServices.js';
import { generateAIReply }from './aiServices.js';

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const handleStateTransition = async (user, messageData) => {
  const freshUser = await User.findById(user._id);

  const text = messageData?.text?.toLowerCase().trim() || "";

  let reply = '';

  logger.info("🔄 Processing State", {
    state: freshUser.state,
    userId: freshUser._id,
    text
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
      if (text.length < 2) {
        reply = "Mazaak mat kar, sahi naam bata bhai 😅";
        break;
      }

      reply = getRandom(onboardingMessages.askGoal(text));

      await User.findByIdAndUpdate(freshUser._id, {
        name: text,
        state: 'asked_goal'
      });
      break;

    // 🟠 GOAL
    case 'asked_goal':
      await Habit.create({
        userId: freshUser._id,
        goalText: text
      });

      await User.findByIdAndUpdate(freshUser._id, {
        goal: text,
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

        reply = "Theek hai, setup complete 🔥";
        break;
      }

      const cleaned = text.replace(/\D/g, '');

      if (cleaned.length !== 10) {
        reply = "10 digit number bhej bhai (98XXXXXXXX)";
        break;
      }

      const number = '+91' + cleaned;

      await Witness.create({
        userId: freshUser._id,
        witnessNumber: number,
        whatsappNumber: `whatsapp:${number}`
      });

      await User.findByIdAndUpdate(freshUser._id, {
        witness: number,
        state: 'active'
      });

      reply = "🔥 Witness set! Ab miss kiya toh report jayegi 😈";
      break;

    // 🔴 ACTIVE (MAIN GAME)
    case 'active':

      // 🟡 Subscription check
      if (!canUseFeature(freshUser)) {
        return {
          reply: "🚫 Free limit khatam.\n\nUpgrade kar 😏"
        };
      }

      // 🔵 Commands
      if (text === 'done') {
        reply = "Good 😏 consistency bana ke rakh";
        break;
      }

      if (text === 'streak') {
        reply = `🔥 Current: ${freshUser.currentStreak}
🏆 Best: ${freshUser.longestStreak}`;
        break;
      }

      if (text === 'help') {
        reply = `Commands:
done
streak
help`;
        break;
      }

      // 🤖 AI (Groq)
      reply = await generateAIReply(text, {
        ...freshUser,
        level: freshUser.missCount + 1
      });

      break;

    // ❌ DEFAULT
    default:
      reply = "System reset ho gaya 😅 'hi' bhej";

      await User.findByIdAndUpdate(freshUser._id, {
        state: 'new'
      });
  }

  logger.info("✅ Reply Sent", {
    userId: freshUser._id,
    reply
  });

  return { reply };
};