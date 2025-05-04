const express = require('express');
const router = express.Router();
const { initPayment } = require('../controller/sslcommerzController');

// Route to initialize the payment
router.post('/init', initPayment);

module.exports = router;
