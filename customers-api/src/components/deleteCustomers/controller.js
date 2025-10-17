const { deleteCustomersService } = require("./service");

async function deleteCustomersController(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteCustomersService(Number(id));

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status).send(error);
  }
}

module.exports = { deleteCustomersController };
