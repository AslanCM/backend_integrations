const _ = require("lodash");
const { modelBodyCreateProducts } = require("../components/products/post/body.model");
const { modelBodyUpdateProduct } = require("../components/products/patch/body.model");
const { modelParamsGetProduct, modelQuerySearchProduct } = require("../components/products/get/params.model");
const { modelHeadersConfirmOrder } = require("../components/confirmOrder/headers.model");

function getErrorPath(error) {
  return _.find(error.details, (x) => x)?.path?.toString() || error.message;
}

const DEFAULT_CODES = {
  HEADERS: "MP-Headers_Validation_Errors",
  BODY: "MP-Body_Validation_Errors",
  PARAMS: "MP-Params_Validation_Errors",
  UNAUTHORIZED: "MP-UNAUTHORIZED_Error",
  TOKEN_NOT_FOUND: "MP-TOKEN_NOT_FOUND",
};

function handlerValidationError(request, code, error, errorMessage) {
  let detail;
  let requestFieldWithError = "";
  switch (code) {
    case DEFAULT_CODES.HEADERS:
      requestFieldWithError = "headers";
      break;
    case DEFAULT_CODES.BODY:
      requestFieldWithError = "body";
      break;
    case DEFAULT_CODES.PARAMS:
      requestFieldWithError = "params";
      break;
    default:
      requestFieldWithError = "headers, params or body";
      detail = errorMessage;
  }
  return {
    timestamp: new Date(),
    status: 400,
    path: request.originalUrl,
    message: {
      code,
      title: `Bad Request: ${requestFieldWithError} with errors`,
      detail: detail || `${getErrorPath(error)} is required or its format is not valid.`,
    },
    trace: error,
  };
}

function validateCreateProductBody(req, _res, next) {
  const { BODY } = DEFAULT_CODES;
  const { error } = modelBodyCreateProducts.validate(req.body);

  if (error) {
    next(handlerValidationError(req, BODY, error));
  } else {
    next();
  }
}

function validateUpdateProductBody(req, _res, next) {
  const { BODY } = DEFAULT_CODES;
  const { id } = req.params;

  const { error } = modelBodyUpdateProduct.validate({ id, ...req.body });

  if (error) {
    next(handlerValidationError(req, BODY, error));
  } else {
    next();
  }
}

function validateGetProductParams(req, _res, next) {
  const { PARAMS } = DEFAULT_CODES;
  const { error } = modelParamsGetProduct.validate(req.params);

  if (error) {
    next(handlerValidationError(req, PARAMS, error));
  } else {
    next();
  }
}

function validateSearchProductQuery(req, _res, next) {
  const { QUERY } = DEFAULT_CODES;
  const { error } = modelQuerySearchProduct.validate(req.query);

  if (error) {
    next(handlerValidationError(req, QUERY, error));
  } else {
    next();
  }
}

function validateHeadersConfirmOrder(req, _res, next) {
  const { HEADERS } = DEFAULT_CODES;
  const { id } = req.params;
  const idempotencyKey = req.headers['x-idempotency-key'];

  const { error } = modelHeadersConfirmOrder.validate({ id, idempotencyKey });

  if (error) {
    next(handlerValidationError(req, HEADERS, error));
  } else {
    next();
  }
}

module.exports = {
  validateCreateProductBody,
  validateUpdateProductBody,
  validateGetProductParams,
  validateSearchProductQuery,
  validateHeadersConfirmOrder,
};
