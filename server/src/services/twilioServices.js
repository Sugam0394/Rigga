import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendWhatsAppMessage = async (to, message) => {
  try {
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: to,
      body: message,
    });

    console.log('📤 Message sent to:', to);
  } catch (error) {
    console.error('❌ Twilio send error:', error.message);
  }
};