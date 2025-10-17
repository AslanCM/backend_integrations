const dbPool = require("dbConection-lib");

const findProductById = async (id) => {
  const [rows] = await dbPool.query('SELECT * FROM products WHERE id = ?', [id]);
  return rows[0];
};

module.exports = {
  findProductById,
};
