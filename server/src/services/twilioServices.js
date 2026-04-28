 import twilio from 'twilio';
import { retryAsync } from './retryServices.js';
import logger from '../utils/logger.js';
import { messageQueue } from '../queue/messageQueue.js';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// 🚀 MAIN FUNCTION (QUEUE BASED)
export const sendWhatsAppMessage = async (to, message) => {

  logger.info("📥 Adding message to queue", { to });

  await messageQueue.add('sendMessage', {
    to,
    message,
  });
};


// 🚀 ACTUAL SENDER (WORKER USE ONLY)
export const processWhatsAppMessage = async ({ to, message }) => {

  return retryAsync(async () => {

    logger.info("📤 Sending message", { to });

    const res = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to,
      body: message,
    });

    logger.info("✅ Message sent", {
      to,
      sid: res.sid
    });

    return res;

  }, 3, 2000);
};