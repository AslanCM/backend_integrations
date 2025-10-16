const express = require("express");
const dotenv = require("dotenv");
const routes = require('./startup/routes');
const dbPool = require('dbConection-lib');

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 3001;

routes(app);

(async () => {
  try {
    const connection = await dbPool.getConnection();
    console.log('Successfully connected to the database.');
    connection.release();

    app.listen(PORT, () => {
      console.log(`Customers API listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
})();
