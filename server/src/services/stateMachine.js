 import { User } from '../models/userModel.js';
import { TaskBox } from '../models/taskModel.js';  
import { onboardingMessages } from './messages.js';
import { generateAIReply } from './aiServices.js';
import { canUseFeature } from './subscriptionServices.js';
import logger from '../utils/logger.js';

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const handleStateTransition = async (user, messageData) => {
  const freshUser = await User.findById(user._id);
  const text = messageData?.text?.toLowerCase().trim() || "";
  let reply = '';

  logger.info("🔄 Processing State", { state: freshUser.state, userId: freshUser._id, text });

  switch (freshUser.state) {

    case 'new':
      reply = getRandom(onboardingMessages.askName);
      await User.findByIdAndUpdate(freshUser._id, { state: 'asked_name' });
      break;

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

    case 'asked_goal':
      // ✅ Create TaskBox (goal now stored here)
      const newTask = await TaskBox.create({
        userId: freshUser._id,
        goal: text,
        stakeType: "photo",
        stakeUrl: "pending",
        deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
        status: "pending"
      });

      await User.findByIdAndUpdate(freshUser._id, {
        activeTaskBox: newTask._id,
        state: 'asked_witness'
      });

      reply = getRandom(onboardingMessages.askWitness);
      break;

    case 'asked_witness':
      const userTask = await TaskBox.findById(freshUser.activeTaskBox);

      if (!userTask) {
        return { reply: "⚠️ Task missing hai. 'hi' bhej ke restart kar." };
      }

      if (text === 'skip') {
        await User.findByIdAndUpdate(freshUser._id, { state: 'active' });
        reply = "Theek hai, setup complete 🔥 Kal se proof mangunga!";
        break;
      }

      const cleaned = text.replace(/\D/g, '');

      if (cleaned.length !== 10) {
        reply = "10 digit number bhej bhai (98XXXXXXXX)";
        break;
      }

      const witnessNumber = '+91' + cleaned;

      userTask.witness = {
        name: "Witness",
        phone: `whatsapp:${witnessNumber}`,
        notified: false
      };

      await userTask.save();

      await User.findByIdAndUpdate(freshUser._id, { state: 'active' });

      reply = "🔥 Witness set! Ab miss kiya toh report jayegi 😈";
      break;

    case 'active':

      if (!canUseFeature(freshUser)) {
        return { reply: "🚫 Free limit khatam.\n\nUpgrade kar 😏" };
      }

      if (text === 'done') {
        reply = "Photo bhej bhai, sirf 'done' bolne se kaam nahi chalega! 📸";
        break;
      }

      if (text === 'streak') {
        reply = `🔥 Current: ${freshUser.currentStreak}\n🏆 Best: ${freshUser.longestStreak}`;
        break;
      }

      // ✅ Fetch active task for AI context
      const activeTask = await TaskBox.findById(freshUser.activeTaskBox);

      reply = await generateAIReply(text, {
        ...freshUser,
        goal: activeTask?.goal || "No goal set",
        level: (freshUser.missCount || 0) + 1
      });

      break;

    default:
      reply = "System reset ho gaya 😅 'hi' bhej";
      await User.findByIdAndUpdate(freshUser._id, { state: 'new' });
  }

  return { reply };
};