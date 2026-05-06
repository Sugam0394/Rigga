 import express from 'express';
import { validateTwilioRequest } from '../middlewares/validateTwilioRequest.js';
import { validateWebhookPayload } from '../validators/webhookValidators.js';
import { handleWebhook } from '../controllers/webhookController.js';
import asyncHandler from '../utils/asyncHandler.js';
import logger from '../utils/logger.js';

const router = express.Router();

 
 router.post(
  '/webhook',
  validateTwilioRequest,
  asyncHandler(async (req, res) => {

    console.log('🔥 Webhook HIT');

    const { Body, From, NumMedia, MediaUrl0 } = validateWebhookPayload(req.body);

    const text = Body?.trim() || "";
    const from = From.trim();

    // ✅ IMPORTANT FIX
    const messageData = {
      text,
      mediaUrl: Number(NumMedia) > 0 ? MediaUrl0 : null
    };

    logger.info("📩 Webhook received", {
      from,
      text,
      hasMedia: !!messageData.mediaUrl
    });

    // ✅ FIXED CALL
    const result = await handleWebhook(messageData, from);

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

 router.post(
  '/chat',
  asyncHandler(async (req, res) => {

    const { text, from } = req.body;

    const result = await handleWebhook(
      { text: text, mediaUrl: null },
      from
    );

    return res.json({
      reply: result.reply   // ✅ FIXED
    });
  })
);

export default router;






 