const dbPool = require('dbConection-lib')

const confirmOrderTransaction = async (orderId, idempotencyKey) => {
  const [existingKey] = await dbPool.query(
    'SELECT response_body FROM idempotency_keys WHERE `key` = ?',
    [idempotencyKey]
  );

  if (existingKey.length > 0 && existingKey[0].response_body) {
    return existingKey[0].response_body;
  }

  const connection = await dbPool.getConnection();

  try {
    await connection.beginTransaction();

    await connection.query('INSERT INTO idempotency_keys (`key`) VALUES (?)', [idempotencyKey]);

    const [updateResult] = await connection.query(
      "UPDATE orders SET status = 'CONFIRMED' WHERE id = ? AND status = 'CREATED'",
      [orderId]
    );

    if (updateResult.affectedRows === 0) {
      throw new Error('La orden no se puede confirmar. Puede que ya esté confirmada o cancelada.');
    }

    const [orderRows] = await connection.query('SELECT * FROM orders WHERE id = ?', [orderId]);
    const finalResponse = { success: true, order: orderRows[0] };

    await connection.query(
      'UPDATE idempotency_keys SET response_body = ? WHERE `key` = ?',
      [JSON.stringify(finalResponse), idempotencyKey]
    );

    await connection.commit();
    return finalResponse;

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

module.exports = { confirmOrderTransaction };
