const { getCustomersService, getCustomerByIdService } = require("./service");

async function getCustomersController(_req, res) {
  try {
    const customers = await getCustomersService();
    res.status(200).send(customers);
  } catch (error) {
    res.status(error.status).send(error);
  }
}

async function getCustomerByIdController(req, res) {
  try {
    const { id } = req.params;
    console.log('id', id);
    const customer = await getCustomerByIdService(Number(id));
    res.status(200).send(customer);
  } catch (error) {
    res.status(error.status).send(error);
  }
}
module.exports = {
  getCustomersController,
  getCustomerByIdController,
};
