const { handlerError } = require('../../lib/logger');
const dbPool = require('dbConection-lib');
const logger = require('../../startup/logging');

async function createCustomer(customer) {
  try {
    const { name, email, phone } = customer;
    const result = await dbPool.query('INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)', [name, email, phone]);
    return {
      status: 201,
      message: 'Customer created successfully',
      data: result
    };
  } catch (error) {
    logger.error('Error creating customer:', error);

    throw handlerError(
      error?.message?.code ?? 100,
      error.message?.detail ?? 'Internal server error',
      error?.status ?? 500
    );
  }
}

module.exports = { createCustomer };
