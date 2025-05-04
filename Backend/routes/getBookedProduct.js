const express = require('express');
const { getBookedProducts } = require('../controller/getProductBooked');
const router = express.Router();


router.get('/book-product', getBookedProducts); 

module.exports = router;
