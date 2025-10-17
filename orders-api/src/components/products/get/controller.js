const { searchProductsService, getProductsByIdService } = require("./service");

async function getProductsByIdController(req, res) {
  try {
    const { id } = req.params;
    const product = await getProductsByIdService(Number(id));
    res.status(200).json(product);
  } catch (error) {
    res.status(error.status).send(error);
  }
}

async function searchProductsController(req, res) {
  try {
    const { search, cursor, limit = 10 } = req.query;
    const { products, nextCursor } = await searchProductsService({ search, cursor, limit: Number(limit) });

    res.locals.metadata = { nextCursor };

    res.status(200).json(products);
  } catch (error) {
    res.status(error.status).send(error);
  }
}

module.exports = {
  getProductsByIdController,
  searchProductsController,
};
