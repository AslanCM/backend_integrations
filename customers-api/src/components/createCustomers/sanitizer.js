function sanitizeCreateCustomer(requestBody) {
  return {
    name: requestBody.userName,
    email: requestBody.email,
    phone: requestBody.cellphone,
  };
}

module.exports = { sanitizeCreateCustomer };
