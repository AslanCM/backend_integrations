const Joi = require("joi");

const modelParamsDeleteCustomer = Joi.object().keys({
  id: Joi.number().integer().min(1).required(),
}).required();

module.exports = { modelParamsDeleteCustomer };
