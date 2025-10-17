const express = require('express');

const router = express.Router();
const { updateProductController } = require('./controller');
const { validateUpdateProductBody } = require('../../../middleware/validatorSchema');

router.patch('/:id', validateUpdateProductBody, updateProductController);

module.exports = router;
