 import twilio from 'twilio';

export const validateTwilioRequest = (req, res, next) => {
  
  // Development mein skip karo
  if (process.env.NODE_ENV === 'development') {
    console.log('⚠️ Twilio validation skipped in development');
    return next();
  }

  try {
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioSignature = req.headers['x-twilio-signature'] || '';
    
    // BASE_URL se construct karo — trust proxy pe depend mat karo
    const baseUrl = process.env.BASE_URL.replace(/\/$/, ''); // trailing slash remove
    const url = `${baseUrl}${req.originalUrl}`;
    
    const params = req.body;

    console.log('🔍 Validating:', url);

    const isValid = twilio.validateRequest(authToken, twilioSignature, url, params);

    if (!isValid) {
      console.log('❌ Twilio validation failed');
      console.log('   URL used:', url);
      console.log('   Signature:', twilioSignature?.substring(0, 20) + '...');
      console.log('🔑 Token length:', authToken?.length);
console.log('🔑 Token preview:', authToken?.substring(0, 6));
console.log('📦 Body params:', JSON.stringify(params));
      return res.status(403).send('Forbidden');
    }

    next();

  } catch (error) {
    console.error('❌ Validation error:', error.message);
    return res.status(500).send('Validation error');
  }
};