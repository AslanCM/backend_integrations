const Joi = require("joi");

const modelBodyLoginCustomer = Joi.object()
  .keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
  .required();

module.exports = { modelBodyLoginCustomer };
