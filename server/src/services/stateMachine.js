import { User } from '../models/userModel.js';
import { Habit } from '../models/habitModel.js';
import { Witness } from '../models/witnessModel.js';
import { onboardingMessages, activeMessages } from './messages.js';

// helper
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const isSameDay = (d1, d2) => d1 && d2 && d1.toDateString() === d2.toDateString();

const isYesterday = (date) => {
  if (!date) return false;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
};

export const handleStateTransition = async (user, message) => {
  let reply = '';

  switch (user.state) {

    case 'new':
      reply = getRandom(onboardingMessages.askName);
      await User.findByIdAndUpdate(user._id, { state: 'asked_name' });
      break;

    case 'asked_name':
      if (message.toLowerCase() === 'hi') {
        reply = "Naam bata bhai 😅 'hi' nahi";
      } else {
        const goalMsgs = onboardingMessages.askGoal(message);
        reply = getRandom(goalMsgs);

        await User.findByIdAndUpdate(user._id, {
          name: message,
          state: 'asked_goal'
        });
      }
      break;

    case 'asked_goal':
      await Habit.create({
        userId: user._id,
        goalText: message,
      });

      reply = getRandom(onboardingMessages.askWitness);

      await User.findByIdAndUpdate(user._id, { state: 'asked_witness' });
      break;

    case 'asked_witness':
      if (message.toLowerCase() === 'skip') {
        reply = getRandom(onboardingMessages.setupDone);
      } else {
        let number = message.replace(/\s+/g, '');

        if (!number.startsWith('+91')) {
          number = '+91' + number;
        }

        const whatsappNumber = `whatsapp:${number}`;

        await Witness.create({
          userId: user._id,
          witnessNumber: number,
          whatsappNumber,
        });

        reply = "🔥 Witness set! Ab sach me bhaag nahi sakta 😈";
      }

      await User.findByIdAndUpdate(user._id, { state: 'active' });
      break;

    case 'active':
      if (message.toLowerCase() === 'done') {

        const today = new Date();

        if (isSameDay(user.lastCheckinDate, today)) {
          reply = "Aaj already kar liya 😏 overacting band kar";
        } else {
          let streak = user.currentStreak;

          if (isYesterday(user.lastCheckinDate)) {
            streak += 1;
          } else {
            streak = 1;
          }

          const longestStreak = Math.max(streak, user.longestStreak);

          await User.findByIdAndUpdate(user._id, {
            currentStreak: streak,
            longestStreak,
            lastCheckinDate: today,
            missCount: 0,
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

  return { reply };
};