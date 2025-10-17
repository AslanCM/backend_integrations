const { handlerError } = require("../../lib/logger");
const logger = require("../../startup/logging");
const { createTransactionalOrder } = require("../transactions");

async function createOrderService(orderData) {
  try {
    const orderCreated = await createTransactionalOrder(orderData);
    return orderCreated;
  } catch (error) {
    logger.error("Error creating order:", error);

    throw handlerError(
      error?.message?.code ?? 206,
      error.message?.detail ?? "Internal server error",
      error?.status ?? 500,
    );
  }
}

module.exports = { createOrderService };
