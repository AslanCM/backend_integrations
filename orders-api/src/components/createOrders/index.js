const express = require('express');

const router = express.Router();
const { createOrderController } = require('./controller');

router.post('/', createOrderController);

module.exports = router;
