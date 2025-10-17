const { handlerError } = require("../../../lib/logger");
const dbPool = require("dbConection-lib");
const logger = require("../../../startup/logging");

async function createProductService(product) {
  try {
    const { sku, name, price_cents, stock } = product;
    const sql = 'INSERT INTO products (sku, name, price_cents, stock) VALUES (?, ?, ?, ?)';

    const [result] = await dbPool.query(sql, [sku, name, price_cents, stock]);

    return {
      id: result.insertId,
      sku,
      name,
      price_cents,
      stock,
    };
  } catch (error) {
    logger.error("Error creating product:", error);

    throw handlerError(
      error?.message?.code ?? 200,
      error.message?.detail ?? "Internal server error",
      error?.status ?? 500,
    );
  }
}

module.exports = { createProductService };
