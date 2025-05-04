const express = require('express');
const router = express.Router();
const { bookProduct } = require('../controller/productBooked');

router.post('/book-product', bookProduct);

module.exports = router;
