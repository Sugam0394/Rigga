 import { User } from '../models/userModel.js';
import { Habit } from '../models/habitModel.js';
import { Witness } from '../models/witnessModel.js';
import { onboardingMessages, activeMessages } from './messages.js';
import { getTodayUTC, isSameDayUTC, isYesterdayUTC } from '../utils/dateUtils.js';
 
import logger from '../utils/logger.js';
import { canUseFeature } from './subscriptionServices.js';

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const handleStateTransition = async (user, messageData) => {
  const freshUser = await User.findById(user._id);

  const text = messageData.text?.toLowerCase().trim() || "";
  const mediaUrl = messageData.mediaUrl;

  let reply = '';

  logger.info("🔄 Processing State", {
    state: freshUser.state,
    userId: freshUser._id,
    text,
    hasMedia: !!mediaUrl
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

        reply = "Theek hai, akele hi discipline dikhao. Setup Done! 🔥";
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
        witnessNumber: number
      });

      await User.findByIdAndUpdate(freshUser._id, {
        witness: number,
        state: 'active'
      });

      reply = "🔥 Witness set! Ab miss kiya toh report jayegi 😈";
      break;

    // 🔴 ACTIVE (MAIN LOGIC)
    case 'active':

      // 🟣 1. IMAGE PROOF (ALWAYS ALLOWED)
      if (mediaUrl) {
        reply = "Photo check kar raha hoon... 👀";

        const isValid = await verifyPhotoProof(mediaUrl, freshUser.goal);

        const today = getTodayUTC();

        if (isValid) {

          if (isSameDayUTC(freshUser.lastCheckinDate, today)) {

            reply = `Aaj already kar liya 😏

🔥 Current Streak: ${freshUser.currentStreak}
🏆 Best Streak: ${freshUser.longestStreak}`;

          } else {

            let newStreak = isYesterdayUTC(freshUser.lastCheckinDate)
              ? freshUser.currentStreak + 1
              : 1;

            const longestStreak = Math.max(newStreak, freshUser.longestStreak);

            await User.findByIdAndUpdate(freshUser._id, {
              currentStreak: newStreak,
              longestStreak,
              lastCheckinDate: today,
              missCount: 0
            });

            reply = `Proof accepted ✅

🔥 Current Streak: ${newStreak}
🏆 Best Streak: ${longestStreak}`;
          }

        } else {
          reply = "Ye tera goal ka proof nahi lag raha 😡 sahi photo bhej";
        }

        break;
      }

      // 🟡 2. SUBSCRIPTION GATE (AFTER CORE FEATURE)
      if (!canUseFeature(freshUser)) {
        return {
          reply: "🚫 Free limit khatam.\n\nUpgrade kar warna sirf kaam kar 😏"
        };
      }

      // 🔵 3. COMMANDS
      if (text === 'done') {
        reply = "Sirf bolne se nahi hoga 😏\nPhoto bhej proof ke liye 📸";
        break;
      }

      if (text === 'streak') {
        reply = `🔥 Current: ${freshUser.currentStreak}
🏆 Best: ${freshUser.longestStreak}`;
        break;
      }

      if (text === 'help') {
        reply = `Commands:
📸 Photo bhejo (proof)
📊 streak
❓ help`;
        break;
      }

      // 🤖 4. AI REPLY (PREMIUM FEEL)
      reply = await generateAIReply(text, {
        ...freshUser,
        level: freshUser.missCount + 1
      });

      break;

    // ❌ DEFAULT
    default:
      reply = "System thoda hil gaya 😅 Type 'hi' to restart";

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