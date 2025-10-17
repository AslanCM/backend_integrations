const { findProductById } = require("../../../common/find");
const { handlerError } = require("../../../lib/logger");
const logger = require("../../../startup/logging");
const dbPool = require("dbConection-lib");

async function getProductsByIdService(id) {
  try {
    return await findProductById(id);
  } catch (error) {
    logger.error("Error updating product:", error);
    throw handlerError(
      error?.message?.code ?? 204,
      error.message?.detail ?? "Internal server error",
      error?.status ?? 500,
    );
  }
}

async function searchProductsService(query) {
  try {
    const { search, cursor, limit = 10 } = query;

  let baseSql = 'SELECT * FROM products';
  const whereClauses = [];
  const params = [];

  if (cursor) {
    whereClauses.push('id > ?');
    params.push(cursor);
  }

  if (search) {
    whereClauses.push('(sku LIKE ? OR name LIKE ?)');
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm);
  }

  if (whereClauses.length > 0) {
    baseSql += ` WHERE ${whereClauses.join(' AND ')}`;
  }

  baseSql += ' ORDER BY id ASC LIMIT ?';
  params.push(limit + 1);

  const [rows] = await dbPool.query(baseSql, params);

  let nextCursor = null;
  if (rows.length > limit) {
    nextCursor = rows[(limit === 1 ? 2 : limit) - 1].id;
    rows.pop();
  }

  return {
    products: rows,
    nextCursor,
  };
  } catch (error) {
    logger.error('Error searching customers:', error);
    throw handlerError(
      error?.message?.code ?? 205,
      error.message?.detail ?? 'Internal server error',
      error?.status ?? 500
    );
  }
}


module.exports = {
  getProductsByIdService,
  searchProductsService
};
