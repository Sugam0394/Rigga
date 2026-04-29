 import { User } from '../models/userModel.js';
import { Habit } from '../models/habitModel.js';
import { Witness } from '../models/witnessModel.js';
import { onboardingMessages, activeMessages } from './messages.js';
import { getTodayUTC, isSameDayUTC, isYesterdayUTC } from '../utils/dateUtils.js';
import { generateAIReply } from './aiServices.js'; // Added Vision
import logger from '../utils/logger.js';

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const handleStateTransition = async (user, messageData) => {
  const freshUser = await User.findById(user._id);
  const text = messageData.text?.toLowerCase().trim() || "";
  const mediaUrl = messageData.mediaUrl; // Twilio se aane wali image URL
  let reply = '';

  logger.info("🔄 Processing State", { state: freshUser.state, userId: freshUser._id });

  switch (freshUser.state) {
    // 🟢 NEW -> ASK NAME
    case 'new':
      reply = getRandom(onboardingMessages.askName);
      await User.findByIdAndUpdate(freshUser._id, { state: 'asked_name' });
      break;

    // 🟡 NAME -> ASK GOAL
    case 'asked_name':
      if (text.length < 2) {
        reply = "Mazaak mat kar, sahi naam bata bhai! 😅";
        break;
      }
      reply = getRandom(onboardingMessages.askGoal(text));
      await User.findByIdAndUpdate(freshUser._id, { name: text, state: 'asked_goal' });
      break;

    // 🟠 GOAL -> ASK WITNESS
    case 'asked_goal':
      await Habit.create({ userId: freshUser._id, goalText: text });
      await User.findByIdAndUpdate(freshUser._id, { goal: text, state: 'asked_witness' });
      reply = getRandom(onboardingMessages.askWitness);
      break;

    // 🔵 WITNESS -> ACTIVE
    case 'asked_witness':
      if (text === 'skip') {
        await User.findByIdAndUpdate(freshUser._id, { state: 'active' });
        reply = "Theek hai, akele hi discipline dikhao. Setup Done! 🔥";
        break;
      }
      const cleaned = text.replace(/\D/g, '');
      if (cleaned.length !== 10) {
        reply = "Bhai, 10 digit ka valid number bhej (e.g. 98XXXXXXXX)";
        break;
      }
      const number = '+91' + cleaned;
      await Witness.create({ userId: freshUser._id, witnessNumber: number });
      await User.findByIdAndUpdate(freshUser._id, { witness: number, state: 'active' });
      reply = "🔥 Witness set! Ab agar miss kiya toh seedha unhe report jayegi. 😈";
      break;

    // 🔴 ACTIVE (The Main Game)
    case 'active':
      // 1. Check for Image Proof (Gemini Vision)
      if (mediaUrl) {
        reply = "Wait, photo check kar raha hoon... 👀";
        const isValid = await verifyPhotoProof(mediaUrl, freshUser.goal);

        if (isValid) {
          const today = getTodayUTC();
          if (isSameDayUTC(freshUser.lastCheckinDate, today)) {
            reply = "Double mehnat? Sahi hai, par streak ek hi baar badhegi! 😉";
          } else {
            let newStreak = isYesterdayUTC(freshUser.lastCheckinDate) ? freshUser.currentStreak + 1 : 1;
            await User.findByIdAndUpdate(freshUser._id, {
              currentStreak: newStreak,
              longestStreak: Math.max(newStreak, freshUser.longestStreak),
              lastCheckinDate: today,
              missCount: 0 // Reset penalty
            });
            reply = `Proof accepted! ✅ Streak: ${newStreak}. Kal phir milte hain.`;
          }
        } else {
          reply = "Ye kya bhej diya? Ye tera goal nahi lag raha. Sahi proof bhej! 😡";
        }
        break;
      }

      // 2. Commands
      if (text === 'done') {
        reply = "Sirf bolne se nahi hoga, photo bhej proof ke liye! 📸";
      } else if (text === 'streak') {
        reply = `🔥 Current: ${freshUser.currentStreak} | 🏆 Best: ${freshUser.longestStreak}`;
      } else if (text === 'help') {
        reply = "Commands: \n✅ Photo bhejo (Proof)\n📊 'streak'\n❓ 'help'";
      } else {
        // 3. AI Roast/Chat Logic (Escalation Aware)
        reply = await generateAIReply(text, {
          ...freshUser,
          level: freshUser.missCount + 1
        });
      }
      break;

    default:
      reply = "System crash ho gaya, par tera aalsi pan nahi! 😅 Type 'hi' to restart.";
      await User.findByIdAndUpdate(freshUser._id, { state: 'new' });
  }

  return { reply };
};