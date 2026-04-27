 import express from 'express';
import { handleUser } from '../controllers/authController.js';
import { Habit } from '../models/habitModel.js';
import { onboardingMessages, activeMessages } from '../services/messages.js';
import { Witness } from '../models/witnessModel.js';

const router = express.Router();

// ✅ helpers
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

// ✅ ROUTE
router.post('/webhook', async (req, res) => {
  try {
    const message = (req.body.Body || '').trim();
    const from = req.body.From || '';

    console.log('📩 Message:', message);
    console.log('👤 From:', from);

    // ❌ empty message guard
    if (!message) {
      res.set('Content-Type', 'text/xml');
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
          let number = message.replace(/\s+/g, '');

          if (!number.startsWith('+91')) {
            number = '+91' + number;
          }

          const whatsappNumber = `whatsapp:${number}`;

          await Witness.create({
            userId: user._id,
            witnessNumber: number,
            whatsappNumber: whatsappNumber,
          });

          reply = "🔥 Witness set! Ab sach me bhaag nahi sakta 😈";
        }

        user.state = 'active';
        break;

      case 'active':
        if (message.toLowerCase() === 'done') {

          const today = new Date();

          if (isSameDay(user.lastCheckinDate, today)) {
            reply = "Aaj already kar liya 😏 overacting band kar";
            break;
          }

          if (isYesterday(user.lastCheckinDate)) {
            user.currentStreak += 1;
          } else {
            user.currentStreak = 1;
          }

          if (user.currentStreak > user.longestStreak) {
            user.longestStreak = user.currentStreak;
          }

          user.lastCheckinDate = today;
          user.missCount = 0;

          // 🔥 improved reply
          const msg = getRandom(activeMessages.done);
          reply = msg.replace('{streak}', user.currentStreak);

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