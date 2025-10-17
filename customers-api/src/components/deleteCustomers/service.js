const { handlerError } = require('../../lib/logger');
const logger = require('../../startup/logging');
const dbPool = require('dbConection-lib');

async function deleteCustomersService(id) {
  try {
    const [result] = await dbPool.query(`
      UPDATE customers SET active = 0 WHERE id = ?
    `, [id]);

    if(result.affectedRows === 0) {
      throw handlerError(
        105,
        'Customer not found or already deleted',
        404
      );
    }

    return { message: 'Customer deleted successfully' };
  } catch (error) {
    logger.error('Error deleting customers:', error);
    throw handlerError(
      error?.message?.code ?? 104,
      error.message?.detail ?? 'Internal server error',
      error?.status ?? 500
    );
  }
}

module.exports = { deleteCustomersService };
