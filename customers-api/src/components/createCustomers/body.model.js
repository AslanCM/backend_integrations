const Joi = require("joi");

const modelBodyCreateCustomer = Joi.object().keys({
  userName: Joi.string().required(),
  email: Joi.string().email().required(),
  cellphone: Joi.string().pattern(/^\d{10}$/).required(),
}).required();

module.exports = { modelBodyCreateCustomer };
