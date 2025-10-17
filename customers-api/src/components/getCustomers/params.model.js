const Joi = require("joi");

const modelParamsGetCustomer = Joi.object()
  .keys({
    id: Joi.number().integer().required().max(10000000).min(1),
  })
  .required();

module.exports = { modelParamsGetCustomer };
