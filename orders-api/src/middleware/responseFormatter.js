const mung = require('express-mung');

function formatResponse(body, req, res) {
  const statusCode = res.statusCode;
  if (statusCode >= 200 && statusCode < 300) {
    if (body && typeof body === 'object' && 'success' in body) {
      return body;
    }

    const formattedResponse = {
      success: true,
      data: body,
    };

    if (res.locals.user) {
      formattedResponse.user = res.locals.user;
    }

    if (res.locals.timestamp) {
      formattedResponse.timestamp = res.locals.timestamp;
    }

    if (res.locals.metadata && typeof res.locals.metadata === 'object') {
      Object.assign(formattedResponse, res.locals.metadata);
    }

    return formattedResponse;
  }

  return body;
}

module.exports = mung.json(formatResponse);

