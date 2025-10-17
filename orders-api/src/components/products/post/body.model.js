const Joi = require('joi');

const modelBodyCreateProducts = Joi.object({
  sku: Joi.string().required(),
  name: Joi.string().required(),
  price_cents: Joi.number().integer().min(0).required(),
  stock: Joi.number().integer().min(0).required(),
}).required();

module.exports = {
  modelBodyCreateProducts,
};
