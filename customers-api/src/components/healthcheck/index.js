const express = require('express');

const router = express.Router();
const { healthcheck } = require('./controller');

router.get('/health', healthcheck);

module.exports = router;
