const express = require('express');

const router = express.Router();
const { confirmOrderController } = require('./controller');
const { validateHeadersConfirmOrder } = require('../../middleware/validatorSchema');

router.post('/:id/confirm', validateHeadersConfirmOrder, confirmOrderController);

module.exports = router;
