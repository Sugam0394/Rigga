 import twilio from 'twilio';

export const validateTwilioRequest = (req, res, next) => {
  try {
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    const twilioSignature = req.headers['x-twilio-signature'] || '';

    const url = new URL(req.originalUrl, process.env.BASE_URL).toString();

    const params = req.body; // ✅ FIXED

    const isValid = twilio.validateRequest(
      authToken,
      twilioSignature,
      url,
      params
    );

    if (!isValid) {
      console.log('❌ Invalid Twilio request blocked');
      return res.status(403).send('Unauthorized');
    }

    next();

  } catch (error) {
    console.error('❌ Twilio validation error:', error.message);
    return res.status(500).send('Validation failed');
  }
};