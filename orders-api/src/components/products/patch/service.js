const { findProductById } = require("../../../common/find");
const { handlerError } = require("../../../lib/logger");
const logger = require("../../../startup/logging");
const dbPool = require("dbConection-lib");

async function updateProductService(id, updateData) {
  try {
    const fields = Object.keys(updateData);
    const values = Object.values(updateData);

    if (fields.length === 0) {
      throw handlerError(
        202,
        "No data to update",
        400,
      );
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const sql = `UPDATE products SET ${setClause} WHERE id = ?`;

    const [result] = await dbPool.query(sql, [...values, id]);

    if (result.affectedRows === 0) {
      throw handlerError(
        203,
        "Product not found",
        404,
      );
    }



    return await findProductById(id);
  } catch (error) {
    logger.error("Error updating product:", error);
    throw handlerError(
      error?.message?.code ?? 201,
      error.message?.detail ?? "Internal server error",
      error?.status ?? 500,
    );
  }
}

module.exports = { updateProductService };
