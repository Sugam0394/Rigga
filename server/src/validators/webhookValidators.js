 import Joi from 'joi';

export const validateWebhookPayload = (payload) => {
  const schema = Joi.object({
    Body: Joi.string().allow('').max(1000).default(''),

    From: Joi.string()
      .required()
      .pattern(/^whatsapp:\+\d{7,15}$/),

    NumMedia: Joi.string().default('0'),

    MediaUrl0: Joi.string().uri().optional(),
    MediaContentType0: Joi.string().optional(),

  }).unknown(true);

  const { error, value } = schema.validate(payload);

  if (error) {
    throw new Error(`Validation failed: ${error.message}`);
  }

  return value;
};