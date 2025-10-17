const Joi = require("joi");

const modelQuerySearchCustomer = Joi.object()
  .keys({
    search: Joi.string().optional(),
    cursor: Joi.number().integer().optional().max(10000000).min(1),
    limit: Joi.number().integer().optional().max(100).min(1),
  })
  .required();

module.exports = { modelQuerySearchCustomer };
