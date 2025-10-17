function errorMiddleware(error, req, res, next) {
  const {
    timestamp,
    status,
    path,
    message,
  } = error;

  res.status(status || 500)
    .json({
      timestamp,
      status,
      path,
      message,
    });
}

function notFoundMiddleware(req, res) {
  res.status(404)
    .json({
      timestamp: new Date(),
      status: 404,
      message: {
        code: 'MP-Service_Not_Found',
        title: 'Service Not Found',
        detail: 'The service is not valid in',
      },
    });
}

module.exports = {
  notFoundMiddleware,
  errorMiddleware,
};
