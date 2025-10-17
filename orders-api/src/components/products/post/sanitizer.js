function sanitizeCreateProduct(requestBody) {
  return {
    sku: requestBody.sku,
    name: requestBody.name,
    price_cents: Number(requestBody.price_cents),
    stock: Number(requestBody.stock),
  };
}

module.exports = { sanitizeCreateProduct };
