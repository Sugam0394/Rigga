import twilio from 'twilio';
import logger from '../utils/logger.js';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendWhatsAppMessage = async (to, message, retries = 3) => {
  try {
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to,
      body: message,
    });

    logger.info("Message sent", { to });

  } catch (error) {
    logger.error("Twilio send failed", { to, error: error.message });

    if (retries > 0) {
      logger.info("Retrying message...", { to, retriesLeft: retries });

      await new Promise(res => setTimeout(res, 2000));

      return sendWhatsAppMessage(to, message, retries - 1);
    }

    logger.error("Final failure - message lost", { to });
  }
};