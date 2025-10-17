const dbPool = require('dbConection-lib');
const { handlerError } = require('../../lib/logger');
const logger = require('../../startup/logging');

async function searchCustomersService(query) {
  try {
    const { search, cursor, limit = 10 } = query;

  let baseSql = 'SELECT id, name, email, phone, created_at FROM customers';
  const whereClauses = [`active = ${1}`];
  const params = [];

  if (cursor) {
    whereClauses.push('id > ?');
    params.push(cursor);
  }

  if (search) {
    whereClauses.push('(name LIKE ? OR email LIKE ? OR phone LIKE ?)');
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm, searchTerm);
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
    customers: rows,
    nextCursor,
  };
  } catch (error) {
    logger.error('Error searching customers:', error);
    throw handlerError(
      error?.message?.code ?? 103,
      error.message?.detail ?? 'Internal server error',
      error?.status ?? 500
    );
  }
}

module.exports = { searchCustomersService };
