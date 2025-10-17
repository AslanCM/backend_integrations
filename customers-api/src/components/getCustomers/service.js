const dbPool = require('dbConection-lib');
const { handlerError } = require('../../lib/logger');
const logger = require('../../startup/logging');

async function getCustomersService() {
  try {
    const [customers] = await dbPool.query(`
      SELECT id, name, email, phone FROM customers WHERE active = 1
    `);
    return customers;
  } catch (error) {
    logger.error('Error getting customers:', error);
    throw handlerError(
      error?.message?.code ?? 101,
      error.message?.detail ?? 'Internal server error',
      error?.status ?? 500
    );
  }
}

async function getCustomerByIdService(userId) {
  try {
    const [customers] = await dbPool.query(`
      SELECT id, name, email, phone FROM customers
      WHERE id = ? AND active = 1
    `, [userId]);

    return customers[0] ?? [];
  }
  catch (error) {
    logger.error('Error getting customer by id:', error);
    throw handlerError(
      error?.message?.code ?? 102,
      error.message?.detail ?? 'Internal server error',
      error?.status ?? 500
    );
  }
}

module.exports = { getCustomersService, getCustomerByIdService };
