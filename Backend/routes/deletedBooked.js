const express = require('express');
const router = express.Router();
const { deleteBookedProduct } = require('../controller/deleteBookedProduct');

// DELETE request for removing a booked product
router.delete('/book-product/:id', deleteBookedProduct);

module.exports = router;
