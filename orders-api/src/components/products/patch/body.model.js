const Joi = require('joi');

const modelBodyUpdateProduct = Joi.object({
  id: Joi.number().integer().min(1).required(),
  name: Joi.string().optional(),
  price_cents: Joi.number().integer().min(0).optional(),
  stock: Joi.number().integer().min(0).optional(),
}).required().min(2);

module.exports = {
  modelBodyUpdateProduct,
};
