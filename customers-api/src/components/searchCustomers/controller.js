const { searchCustomersService } = require("./service");

async function searchCustomersController(req, res) {
  try {
    const { search, cursor, limit = 10 } = req.query;
    const { customers, nextCursor } = await searchCustomersService({ search, cursor, limit: Number(limit) });

    res.locals.metadata = { nextCursor };

    res.status(200).json(customers);
  } catch (error) {
    res.status(error.status).send(error);
  }
}

module.exports = { searchCustomersController };
