 import twilio from 'twilio';

export const validateTwilioRequest = (req, res, next) => {

  // Dev mode skip
  if (process.env.NODE_ENV === 'development') {
    console.log('⚠️ Twilio validation skipped (dev)');
    return next();
  }

  try {
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioSignature = req.headers['x-twilio-signature'] || '';

    const baseUrl = process.env.BASE_URL.replace(/\/$/, '');
    const url = `${baseUrl}${req.originalUrl}`;

    const isValid = twilio.validateRequest(
      authToken,
      twilioSignature,
      url,
      req.body
    );

    if (!isValid) {
      console.warn('❌ Invalid Twilio request from:', req.ip);

      res.set('Content-Type', 'text/xml');
      return res.status(403).send(
        '<Response><Message>Unauthorized</Message></Response>'
      );
    }

    console.log('✅ Twilio verified');
    next();

  } catch (error) {
    console.error('❌ Validation error:', error.message);

    res.set('Content-Type', 'text/xml');
    return res.status(200).send(
      '<Response><Message>Error occurred</Message></Response>'
    );
  }
};