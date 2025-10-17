const express = require('express');

const router = express.Router();
const { getCustomersController, getCustomerByIdController } = require('./controller');
const { validateGetCustomerParams, validateSearchCustomerQuery } = require('../../middleware/validatorSchema');
const { searchCustomersController } = require('../searchCustomers/controller');
const { checkForQueryParams } = require('./middleware/search');

router.get('/', checkForQueryParams, getCustomersController);
router.get('/', validateSearchCustomerQuery, searchCustomersController);

router.get('/:id', validateGetCustomerParams, getCustomerByIdController);

module.exports = router;
