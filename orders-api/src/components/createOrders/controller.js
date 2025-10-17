const { createOrderService } = require("./service");

async function createOrderController(req, res) {
  try {
    const { customer_id, items } = req.body;
    const result = await createOrderService({ customer_id, items });

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status).send(error);
  }
}

module.exports = {
  createOrderController,
};
