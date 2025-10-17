const { sanitizeCreateProduct } = require("./sanitizer");
const { createProductService } = require("./service");

async function postCreateProductController(req, res) {
  try {
    const { body } = req;
    const data = sanitizeCreateProduct(body);
    const product = await createProductService(data);

    res.status(201).send(product);
  } catch (error) {
    res.status(error.status).send(error);
  }
}

module.exports = {
  postCreateProductController,
};
