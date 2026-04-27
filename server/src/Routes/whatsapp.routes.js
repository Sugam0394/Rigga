import express from 'express';
import { handleUser } from '../controllers/authController.js';
import { Habit } from '../models/habitModel.js';
import { onboardingMessages } from '../services/messages.js';
import { activeMessages } from '../services/messages.js';

const router = express.Router();

 const isSameDay = (d1, d2) => {
  return d1 && d2 && d1.toDateString() === d2.toDateString();
};

const isYesterday = (date) => {
  if (!date) return false;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
};
  

 
const getRandom = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

 router.post('/webhook', async (req, res) => {
  try {
 const message = (req.body.Body || '').trim();
const from = req.body.From || '';

 
    console.log('📩 Message:', message);
    console.log('👤 From:', from);

    if (!message) {
  return res.send(`
    <Response>
      <Message>Message bhej bhai 😅</Message>
    </Response>
  `);
}

    const user = await handleUser(from);

    let reply = '';

    switch (user.state) {
      case 'new':
        reply = getRandom(onboardingMessages.askName);
        user.state = 'asked_name';
        break;

      case 'asked_name':
        user.name = message;
        reply = getRandom(onboardingMessages.askGoal(message));
        user.state = 'asked_goal';
        break;

      case 'asked_goal':
        await Habit.create({
          userId: user._id,
          goalText: message,
        });

        reply = getRandom(onboardingMessages.askWitness);
        user.state = 'asked_witness';
        break;

      case 'asked_witness':
        if (message.toLowerCase() === 'skip') {
          reply = getRandom(onboardingMessages.setupDone);
        } else {
          reply = "Witness added 😏 (ab bhaagna mushkil hai)";
        }

        user.state = 'active';
        break;

      case 'active':
  if (message.toLowerCase() === 'done') {

    const today = new Date();

    // ❌ already done today
    if (isSameDay(user.lastCheckinDate, today)) {
      reply = "Aaj already kar liya 😏 overacting band kar";
      break;
    }

    // ✅ streak logic
    if (isYesterday(user.lastCheckinDate)) {
      user.currentStreak += 1;
    } else {
      user.currentStreak = 1;
    }

    // 🔥 longest streak update
    if (user.currentStreak > user.longestStreak) {
      user.longestStreak = user.currentStreak;
    }

    // ✅ update tracking
    user.lastCheckinDate = today;
    user.missCount = 0;

    reply = `🔥 Shabaash! Streak: ${user.currentStreak}`;

  } else {
    reply = getRandom(activeMessages.unknown);
  }
  break;

      default:
        reply = 'System thoda hil gaya 😅';
    }

    await user.save();

    res.set('Content-Type', 'text/xml');
    res.send(`
      <Response>
        <Message>${reply}</Message>
      </Response>
    `);

  } catch (error) {
    console.error('❌ Webhook error:', error.message);
    res.status(500).send('Error');
  }
});

export default router; 