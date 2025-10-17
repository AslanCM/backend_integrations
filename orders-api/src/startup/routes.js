const express = require("express");
const requestLog = require("../lib/logger");
const logger = require("./logging");

const { errorMiddleware, notFoundMiddleware } = require("../middleware/errors");
const { validateToken } = require("../middleware/tokenValidator");
const responseFormatter = require("../middleware/responseFormatter");

const healthcheckRouter = require("../components/healthcheck");
const postCreateProductRouter = require("../components/products/post");
const patchUpdateProductRouter = require("../components/products/patch");
const getProductsRouter = require("../components/products/get");
const createOrdersRouter = require("../components/createOrders");
const confirmOrderRouter = require("../components/confirmOrder");

module.exports = (app) => {
  const logFormat = "json";
  const logEnable = true;

  const ordersPath = "/orders";
  const productsPath = "/products";

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(requestLog.logTimeStartMiddleware);
  app.use(requestLog.requestLogMiddleware(logger, logFormat, logEnable));

  // Format all successful responses with standard structure
  app.use(responseFormatter);

  app.use(healthcheckRouter);

  // products routes
  app.use(productsPath, postCreateProductRouter);
  app.use(productsPath, patchUpdateProductRouter);
  app.use(productsPath, getProductsRouter);

  app.use(ordersPath, createOrdersRouter);
  app.use(ordersPath, confirmOrderRouter);

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);
};
