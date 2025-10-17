const _ = require("lodash");
const { modelParamsGetCustomer } = require("../components/getCustomers/params.model");
const { modelQuerySearchCustomer } = require("../components/searchCustomers/params.model");
const { modelParamsDeleteCustomer } = require("../components/deleteCustomers/params.model");
const { modelBodyCreateCustomer } = require("../components/createCustomers/body.model");
const { modelBodyLoginCustomer } = require("../components/login/body.model");

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

function validateCreateCustomerBody(req, _res, next) {
  const { BODY } = DEFAULT_CODES;
  const { error } = modelBodyCreateCustomer.validate(req.body);

  if (error) {
    next(handlerValidationError(req, BODY, error));
  } else {
    next();
  }
}

function validateGetCustomerParams(req, _res, next) {
  const { PARAMS } = DEFAULT_CODES;
  const { error } = modelParamsGetCustomer.validate(req.params);

  if (error) {
    next(handlerValidationError(req, PARAMS, error));
  } else {
    next();
  }
}

function validateSearchCustomerQuery(req, _res, next) {
  const { QUERY } = DEFAULT_CODES;
  const { error } = modelQuerySearchCustomer.validate(req.query);

  if (error) {
    next(handlerValidationError(req, QUERY, error));
  } else {
    next();
  }
}

function validateDeleteCustomerParams(req, _res, next) {
  const { PARAMS } = DEFAULT_CODES;
  const { error } = modelParamsDeleteCustomer.validate(req.params);

  if (error) {
    next(handlerValidationError(req, PARAMS, error));
  } else {
    next();
  }
}

function validateLoginBody(req, _res, next) {
  const { BODY } = DEFAULT_CODES;
  const { error } = modelBodyLoginCustomer.validate(req.body);

  if (error) {
    next(handlerValidationError(req, BODY, error));
  } else {
    next();
  }
}

module.exports = {
  validateCreateCustomerBody,
  validateGetCustomerParams,
  validateSearchCustomerQuery,
  validateDeleteCustomerParams,
  validateLoginBody,
};
