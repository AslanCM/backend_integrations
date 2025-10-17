const Joi = require("joi");

const modelParamsGetProduct = Joi.object()
  .keys({
    id: Joi.number().integer().required().max(10000000).min(1),
  })
  .required();


const modelQuerySearchProduct = Joi.object()
  .keys({
    search: Joi.string().optional(),
    cursor: Joi.number().integer().optional().max(10000000).min(1),
    limit: Joi.number().integer().optional().max(100).min(1),
  })
  .required().min(1);

module.exports = {
  modelParamsGetProduct,
  modelQuerySearchProduct,
};
