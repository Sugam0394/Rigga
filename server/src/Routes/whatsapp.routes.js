 import express from 'express';
import { validateTwilioRequest } from '../middlewares/validateTwilioRequest.js';
import { validateWebhookPayload } from '../validators/webhookValidators.js';
import { handleWebhook } from '../controllers/webhookController.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();


// 🚀 MAIN WEBHOOK ROUTE (CLEAN + PRO)
router.post(
  '/webhook',
  validateTwilioRequest,
  asyncHandler(async (req, res) => {

    const { Body, From } = validateWebhookPayload(req.body);

    const message = Body.trim();
    const from = From.trim();

    const result = await handleWebhook(message, from);

    res.set('Content-Type', 'text/xml');

    return res.status(result.statusCode).send(`
      <Response>
        <Message>${result.reply}</Message>
      </Response>
    `);

  })
);


// 🧪 TEST ROUTE (for debugging Twilio signature)
router.post(
  '/test',
  validateTwilioRequest,
  asyncHandler(async (req, res) => {

    console.log('✅ Valid Twilio request received at /test');

    res.send('Twilio request validated successfully!');
  })
);


export default router;






 