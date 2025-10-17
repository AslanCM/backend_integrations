const express = require('express');

const router = express.Router();
const { getProductsByIdController, searchProductsController } = require('./controller');
const { validateGetProductParams, validateSearchProductQuery } = require('../../../middleware/validatorSchema');


router.get('/:id', validateGetProductParams, getProductsByIdController);
router.get('/', validateSearchProductQuery, searchProductsController);

module.exports = router;
