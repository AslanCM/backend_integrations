const express = require('express');

const router = express.Router();
const { postCreateProductController } = require('./controller');
const { validateCreateProductBody } = require('../../../middleware/validatorSchema');

router.post('/', validateCreateProductBody, postCreateProductController);

module.exports = router;
