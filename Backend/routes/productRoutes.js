const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../controller/productController');

router.get('/products', getAllProducts); 

module.exports = router;
