const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(express.json());

require('./startup/routes')(app);

app.listen(PORT, () => {
  console.log(`Customers API listening on port ${PORT}`);
});
