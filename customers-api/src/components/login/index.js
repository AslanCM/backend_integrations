const express = require('express');

const router = express.Router();
const { loginController } = require('./controller');
const { validateLoginBody } = require('../../middleware/validatorSchema');

router.post('/login', validateLoginBody, loginController);

module.exports = router;
