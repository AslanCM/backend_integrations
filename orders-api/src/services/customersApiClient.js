const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

const CUSTOMERS_API_URL = process.env.CUSTOMERS_API_URL;
const SERVICE_TOKEN = process.env.SERVICE_TOKEN;

const getCustomerById = async (customerId) => {
  const url = `${CUSTOMERS_API_URL}/internal/customers/${customerId}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SERVICE_TOKEN}`
    }
  });

  if (response.status === 404) {
    throw new Error(`El cliente con ID ${customerId} no existe.`);
  }

  if (!response.ok) {
    throw new Error('Error al comunicarse con la API de clientes.');
  }

  return response.json();
};

module.exports = { getCustomerById };
