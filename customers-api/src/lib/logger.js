
const mung = require('express-mung');
const { v4: uuidv4 } = require('uuid');

const handlerError = (code, error, status) => ({
  status: status || 400,
  message: {
    code,
    detail: error,
  },
});

const logTimeStartMiddleware = (req, res, next) => {
  req.logTimeStart = Date.now();
  next();
};

const cleanData = (data, hiddenFields) => {
  if (!data) {
    return data;
  }

  const dataTemp = JSON.parse(JSON.stringify(data));

  if (hiddenFields.length > 0) {
    hideSensitiveData(dataTemp, hiddenFields);
  }
  return dataTemp;
};

const logErrorMiddleware = (err, req, res, next) => {
  const errorData = {};

  if (err.error) {
    if (JSON.stringify(err.error) !== '{}') {
      errorData.data = JSON.stringify(err.error);
    }
    if (err.error.toString()) {
      errorData.name = err.error.toString();
    }
  }
  if (err.stack) {
    errorData.stack = err.stack;
  }

  req.logErrorData = errorData;
  next(err);
};

const requestLogMiddleware = (logger, formats = 'json', enabled = true, hiddenFields = []) => mung.json((body, req, res) => {
  const data = {
    id: uuidv4(),
    datetime: new Date(),
    tags: { ...req.tags, name: req.tags && req.tags.name ? req.tags.name : 'NONAME' },
    time: Date.now() - req.logTimeStart,
    timeDetails: req.timeDetails,
    hostname: req.hostname,
    baseUrl: req.baseUrl,
    ip: req.headers['x-forwarded-for'] || req.ip,
    method: req.method,
    params: cleanData(req.params, hiddenFields),
    path: req.path,
    query: req.query,
    requestHeaders: cleanData(req.headers, hiddenFields),
    requestBody: cleanData(req.body, hiddenFields),
    responseStatus: res.statusCode,
    responseBody: cleanData(body, hiddenFields),
  };

  if (req.logErrorData) {
    data.error = req.logErrorData;
  }

  if (data.tags.name === 'health') return body;

  printGeneralLog(data, 'requestLog', logger, !!req.logErrorData, formats, enabled);

  return body;
}, { mungError: true });

const printGeneralLog = (message, type, logger, isError = false, formats = 'json', enabled = true) => {
  if (enabled) {
    let dataFormat;
    if (formats === 'json') {
      dataFormat = message;
    } else {
      dataFormat = JSON.stringify(message);
    }

    if (isError) {
      logger.error(dataFormat, { type });
    } else {
      logger.info(dataFormat, { type });
    }
  }
};

const getType = p => {
  if (Array.isArray(p)) return 'array';
  else if (typeof p === 'string') return 'string';
  else if (typeof p === 'number') return 'number';
  else if (p != null && typeof p === 'object') return 'object';
  else return 'other';
};

const hideSensitiveData = (data, hiddenFields) => {
  if (getType(data) === 'object') {
    for (const propertyName in data) {
      const type = getType(data[propertyName]);
      if (hiddenFields.includes(propertyName) && type === 'string') {
        data[propertyName] = 's';
      } else if (hiddenFields.includes(propertyName) && type === 'number') {
        data[propertyName] = 'n';
      } else if (type === 'object' || type === 'array') {
        hideSensitiveData(data[propertyName], hiddenFields);
      }
    }
  } else if (getType(data) === 'array') {
    for (const element of data) {
      hideSensitiveData(element, hiddenFields);
    }
  }
};

module.exports = {
  logTimeStartMiddleware,
  requestLogMiddleware,
  logErrorMiddleware,
  printGeneralLog,
  handlerError,
};
