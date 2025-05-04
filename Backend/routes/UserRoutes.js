const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controller/getUser');


router.get('/users', getAllUsers); 


module.exports = router;
