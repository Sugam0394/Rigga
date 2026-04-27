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
    const from = (req.body.From || '').trim();

    console.log('📩 Message:', message);
    console.log('👤 From:', from);

    // ❌ invalid request guard
    if (!from) {
      console.log("❌ Invalid From");
      return res.status(400).send('Invalid request');
    }

    const user = await handleUser(from);
    console.log("👉 CURRENT STATE:", user.state);

    // ❌ empty message guard
    if (!message) {
      res.set('Content-Type', 'text/xml');
      return res.send(`
        <Response>
          <Message>Message bhej bhai 😅</Message>
        </Response>
      `);
    }

    let reply = '';

    switch (user.state) {

      // 🔥 STEP 1
      case 'new':
        reply = getRandom(onboardingMessages.askName);
        user.state = 'asked_name';
        break;

      // 🔥 STEP 2
      case 'asked_name':

        if (message.toLowerCase() === 'hi') {
          reply = "Naam bata bhai 😅 'hi' nahi";
          break;
        }

        user.name = message;

        const goalMsgs = onboardingMessages.askGoal(user.name);
        reply = getRandom(goalMsgs);

        user.state = 'asked_goal';
        break;

      // 🔥 STEP 3
      case 'asked_goal':

        await Habit.create({
          userId: user._id,
          goalText: message,
        });

        reply = getRandom(onboardingMessages.askWitness);
        user.state = 'asked_witness';
        break;

      // 🔥 STEP 4
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

        user.state = 'active';
        break;

      // 🔥 STEP 5 (MAIN GAME)
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

          // 🔥 best streak update
          if (user.currentStreak > user.longestStreak) {
            user.longestStreak = user.currentStreak;
          }

          user.lastCheckinDate = today;
          user.missCount = 0;

          // 🔥 dynamic reply
          const msg = getRandom(activeMessages.done);
          reply = `${msg} 🔥 Streak: ${user.currentStreak}`;

        } else {
          reply = getRandom(activeMessages.unknown);
        }

        break;

      default:
        reply = 'System thoda hil gaya 😅';
    }

    await user.save();
    console.log("✅ UPDATED STATE:", user.state);

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