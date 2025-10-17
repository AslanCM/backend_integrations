const { confirmOrderService } = require("./service");

async function confirmOrderController(req, res) {
  try {
    const { id } = req.params;
    const idempotencyKey = req.headers['x-idempotency-key'];

    const result = await confirmOrderService(Number(id), idempotencyKey);

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status).send(error);
  }
}

module.exports = { confirmOrderController };
