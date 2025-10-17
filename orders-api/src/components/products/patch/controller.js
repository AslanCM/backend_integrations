const { sanitizeUpdateProduct } = require("./sanitizer");
const { updateProductService } = require("./service");

async function updateProductController(req, res) {
  try {
    const { body } = req;
    const data = sanitizeUpdateProduct(body);
    const product = await updateProductService(Number(req.params.id), data);

    res.status(201).send(product);
  } catch (error) {
    res.status(error.status).send(error);
  }
}

module.exports = {
  updateProductController,
};
