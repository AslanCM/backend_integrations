const { handlerError } = require("../../lib/logger");
const logger = require("../../startup/logging");
const { confirmOrderTransaction } = require("../transactions/confirm");
async function confirmOrderService(orderId, idempotencyKey) {
  try {
    const orderConfirmed = await confirmOrderTransaction(orderId, idempotencyKey);
    return orderConfirmed.order;
  } catch (error) {
    logger.error("Error confirming order:", error);
    throw handlerError(error);
  }
}

module.exports = { confirmOrderService };
