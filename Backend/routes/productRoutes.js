const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../controller/productController');
const { getProductById } = require('../controller/productControllerById');

router.get('/products', getAllProducts); 
router.get('/products/:id', getProductById);

module.exports = router;
