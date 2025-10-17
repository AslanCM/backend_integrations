function sanitizeUpdateProduct(requestBody) {
  return Object.fromEntries(
    Object.entries({
      name: requestBody.name ? String(requestBody.name) : undefined,
      price_cents: requestBody.price_cents ? Number(requestBody.price_cents) : undefined,
      stock: requestBody.stock ? Number(requestBody.stock) : undefined,
    }).filter(([_, value]) => value !== undefined),
  );
}

module.exports = { sanitizeUpdateProduct };
