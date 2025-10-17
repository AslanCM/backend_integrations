const { sanitizeCreateCustomer } = require("./sanitizer");
const { createCustomerService } = require("./service");

async function postCreateCustomerController(req, res) {
  try {
    const { body } = req;
    const data = sanitizeCreateCustomer(body);
    const customer = await createCustomerService(data);
    res.status(201).send(customer);
  } catch (error) {
    res.status(error.status).send(error);
  }
}

module.exports = {
  postCreateCustomerController,
};
