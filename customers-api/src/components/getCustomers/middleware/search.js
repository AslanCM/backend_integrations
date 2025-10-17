function checkForQueryParams(req, res, next) {
  const hasQueryParams = Object.keys(req.query).length <= 0;

  if (hasQueryParams) {
    return next();
  }

  return next('route');
}

module.exports = { checkForQueryParams };
