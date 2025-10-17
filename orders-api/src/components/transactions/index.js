const { getCustomerById } = require("../../services/customersApiClient");
const { handlerError } = require("../../lib/logger");
const logger = require("../../startup/logging");
const dbPool = require('dbConection-lib')

async function createTransactionalOrder(orderData) {
  const connection = await dbPool.getConnection();
  try {
    const { customer_id, items } = orderData;

    await getCustomerById(customer_id);

    await connection.beginTransaction();

    const productIds = items.map(item => item.product_id);
    const [productRows] = await connection.query(
      'SELECT * FROM products WHERE id IN (?) FOR UPDATE',
      [productIds]
    );

    const productsById = productRows.reduce((map, product) => {
      map[product.id] = product;
      return map;
    }, {});

    let total_cents = 0;

    for (const item of items) {
      const product = productsById[item.product_id];
      if (!product || product.stock < item.qty) {
        throw new Error(`Stock insuficiente para el producto ID: ${item.product_id}`);
      }
      total_cents += product.price_cents * item.qty;
    }

    for (const item of items) {
      await connection.query('UPDATE products SET stock = stock - ? WHERE id = ?', [item.qty, item.product_id]);
    }

    const [orderResult] = await connection.query(
      'INSERT INTO orders (customer_id, total_cents) VALUES (?, ?)',
      [customer_id, total_cents]
    );
    const orderId = orderResult.insertId;

    const orderProductsValues = items.map(item => {
      const product = productsById[item.product_id];
      const subtotal = product.price_cents * item.qty;
      return [orderId, item.product_id, item.qty, product.price_cents, subtotal];
    });

    await connection.query(
      'INSERT INTO order_products (order_id, product_id, qty, unit_price_cents, subtotal_cents) VALUES ?',
      [orderProductsValues]
    );

    await connection.commit();

    return { id: orderId, status: 'CREATED', total_cents };

  } catch (error) {
    await connection.rollback();
    logger.error("Error creating order:", error);
    throw handlerError(
      error?.message?.code ?? 206,
      error.message?.detail ?? "Internal server error",
      error?.status ?? 500,
    );
  } finally {
    if (connection) {
      await connection.release();
    }
  }
}

module.exports = { createTransactionalOrder };
