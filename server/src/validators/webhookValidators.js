import Joi from 'joi';

export const validateWebhookPayload = (payload) => {
  const schema = Joi.object({
    Body: Joi.string().required().max(500),
    From: Joi.string()
      .required()
      .pattern(/^whatsapp:\+\d{1,15}$/),
  });

  const { error, value } = schema.validate(payload);

  if (error) {
    throw new Error(`Validation failed: ${error.message}`);
  }

  return value;
};