import twilio from 'twilio';
import { retryAsync } from './retryServices.js';
import logger from '../utils/logger.js';
import { messageQueue } from '../queue/messageQueue.js';

// ✅ helper import
import { formatWhatsAppNumber } from '../utils/formatWhatsApp.js';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// ✅ normalize FROM once
const WHATSAPP_FROM = formatWhatsAppNumber(
  process.env.TWILIO_WHATSAPP_NUMBER
);


// 🚀 MAIN FUNCTION (QUEUE BASED)
export const sendWhatsAppMessage = async (to, message) => {

  // ✅ normalize TO here
  const formattedTo = formatWhatsAppNumber(to);

  logger.info("📥 Adding message to queue", { to: formattedTo });

  await messageQueue.add('sendMessage', {
    to: formattedTo,
    message,
  });
};


// 🚀 ACTUAL SENDER (WORKER USE ONLY)
export const processWhatsAppMessage = async ({ to, message }) => {

  logger.info("📤 Sending message", {
    from: WHATSAPP_FROM,
    to,
  });

  const res = await retryAsync(
    () =>
      client.messages.create({
        from: WHATSAPP_FROM,
        to,
        body: message,
      }),
    3,
    2000
  );

  logger.info("✅ Message sent", {
    to,
    sid: res.sid,
  });

  return res;
};