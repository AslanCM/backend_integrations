const { handlerError } = require("../../lib/logger");
const dbPool = require("dbConection-lib");
const logger = require("../../startup/logging");

async function createCustomerService(customer) {
  try {
    const { name, email, phone } = customer;
    const [result] = await dbPool.query(`
      INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)
      `, [name, email, phone]);

    return {
      id: result.insertId,
      name,
      email,
      phone,
    };
  } catch (error) {
    logger.error("Error creating customer:", error);

    throw handlerError(
      error?.message?.code ?? 100,
      error.message?.detail ?? "Internal server error",
      error?.status ?? 500,
    );
  }
}

module.exports = { createCustomerService };
