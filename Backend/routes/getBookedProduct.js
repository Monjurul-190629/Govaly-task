const express = require('express');
const { getBookedProducts } = require('../controller/getProductBooked');
const { getBookedById } = require('../controller/getBookedById');
const router = express.Router();


router.get('/book-product', getBookedProducts); 

router.get('/book-product/:id', getBookedById);


module.exports = router;
