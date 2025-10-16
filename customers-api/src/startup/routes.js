const express = require("express");
const requestLog = require("../lib/logger");
const logger = require("./logging");

const healthcheckRouter = require("../components/healthcheck");
const { errorMiddleware, notFoundMiddleware } = require("../middleware/errors");

module.exports = (app) => {
  const logFormat = "json";
  const logEnable = true;
  const apiPath = "/customers";

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(requestLog.logTimeStartMiddleware);
  app.use(requestLog.requestLogMiddleware(logger, logFormat, logEnable));

  app.use(healthcheckRouter);

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);
};
