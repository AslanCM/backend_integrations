const express = require('express');

const router = express.Router();
const { postCreateCustomerController } = require('./controller');
const { validateCreateCustomerBody } = require('../../middleware/validatorSchema');

router.post('/', validateCreateCustomerBody, postCreateCustomerController);

module.exports = router;
