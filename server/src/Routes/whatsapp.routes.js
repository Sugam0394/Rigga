import express from 'express';
import { handleUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/webhook', async (req, res) => {
  try {
    const message = req.body.Body;
    const from = req.body.From;

    console.log('📩 Message:', message);
    console.log('👤 From:', from);

    // STEP 1: user create / find
    const user = await handleUser(from);

    // STEP 2: basic reply logic
    let reply = '';

    if (message.toLowerCase() === 'hi') {
      reply = 'Bata apna goal kya hai? 😏';
    } else if (message.toLowerCase() === 'done') {
      reply = 'Aaj toh tu jeet gaya 🔥';
    } else {
      reply = 'Samajh nahi aaya 😅 "hi" ya "done" likh';
    }

    // STEP 3: Twilio response (VERY IMPORTANT)
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