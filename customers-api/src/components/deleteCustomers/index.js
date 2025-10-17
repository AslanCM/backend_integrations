const express = require('express');

const router = express.Router();
const { deleteCustomersController } = require('./controller');
const { validateDeleteCustomerParams } = require('../../middleware/validatorSchema');

router.put('/:id', validateDeleteCustomerParams, deleteCustomersController);

module.exports = router;
