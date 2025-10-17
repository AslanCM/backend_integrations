const Joi = require("joi");

const modelHeadersConfirmOrder = Joi.object().keys({
  id: Joi.number().required().min(1),
  idempotencyKey: Joi.string().required().max(255),
}).required();

module.exports = { modelHeadersConfirmOrder };
