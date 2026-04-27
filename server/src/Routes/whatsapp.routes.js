 import express from 'express';
import { validateTwilioRequest } from '../middlewares/validateTwilioRequest.js';
import { validateWebhookPayload } from '../validators/webhookValidators.js';
import { handleWebhook } from '../controllers/webhookController.js';
 



const router = express.Router();





// ✅ CLEAN WEBHOOK ROUTE
router.post('/webhook', validateTwilioRequest, async (req, res) => {
  try {
    const { Body, From } = validateWebhookPayload(req.body);

    const message = Body.trim();
    const from = From.trim();

    const result = await handleWebhook(message, from);

    res.set('Content-Type', 'text/xml');
    res.status(result.statusCode).send(`
      <Response>
        <Message>${result.reply}</Message>
      </Response>
    `);

  } catch (error) {
    console.error('❌ Route error:', error.message);

    res.set('Content-Type', 'text/xml');
    res.status(500).send(`
      <Response>
        <Message>System error 😅</Message>
      </Response>
    `);
  }
});

// ✅ Test route
router.post('/test', validateTwilioRequest, (req, res) => {
  console.log('✅ Valid Twilio request received at /test');
  res.send('Twilio request validated successfully!');
});




export default router;






 