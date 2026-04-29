 import express from 'express';
import { validateTwilioRequest } from '../middlewares/validateTwilioRequest.js';
import { validateWebhookPayload } from '../validators/webhookValidators.js';
import { handleWebhook } from '../controllers/webhookController.js';
import asyncHandler from '../utils/asyncHandler.js';
import logger from '../utils/logger.js';

const router = express.Router();

 
// 🚀 MAIN WEBHOOK ROUTE (CLEAN + PRO)
 router.post(
  '/webhook',
  validateTwilioRequest,
  asyncHandler(async (req, res) => {


      console.log('🔥 Webhook HIT'); // 👈 yeh add karo

      
    const { Body, From } = validateWebhookPayload(req.body);

    const message = Body.trim();
    const from = From.trim();

    // 🔥 PART 8.4 — LOGGING (ENTRY POINT)
    logger.info("📩 Webhook received", {
      from,
      messageLength: message.length,
      messagePreview: message.slice(0, 30),
    });

    const result = await handleWebhook(message, from);

    // 🔥 LOG RESPONSE
    logger.info("📤 Webhook response sent", {
      from,
      replyLength: result.reply.length,
      statusCode: result.statusCode,
    });

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






 