const fetch = require('node-fetch');

const { CUSTOMERS_API_URL, ORDERS_API_URL, SERVICE_TOKEN } = process.env;

const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    console.log('body', body);
    const { customer_id, items, idempotency_key, correlation_id } = body;

    const customerRes = await fetch(`${CUSTOMERS_API_URL}/internal/customers/${customer_id}`, {
      headers: { 'Authorization': `Bearer ${SERVICE_TOKEN}` }
    });


    if (!customerRes.ok) {
      throw new Error('El cliente no es válido o no se pudo verificar.');
    }
    const customer = await customerRes.json();

    const createOrderRes = await fetch(`${ORDERS_API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customer_id, items })
    });

    if (!createOrderRes.ok) {
      throw new Error('No se pudo crear la orden.');
    }

    const createdOrder = await createOrderRes.json();

    const confirmOrderRes = await fetch(`${ORDERS_API_URL}/orders/${createdOrder.data.id}/confirm`, {
      method: 'POST',
      headers: { 'X-Idempotency-Key': idempotency_key }
    });

    if (!confirmOrderRes.ok) {
      throw new Error('No se pudo confirmar la orden.');
    }

    const confirmedOrder = await confirmOrderRes.json();

    const finalResponse = {
      success: true,
      correlationId: correlation_id,
      data: {
        customer: customer?.data,
        order: confirmedOrder?.data
      }
    };

    return {
      statusCode: 201,
      body: JSON.stringify(finalResponse)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: error.message })
    };
  }
};

module.exports = { main: handler };
