const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controller/getUser');
const { getUserByPhone } = require('../controller/getUserByPhone');


router.get('/users', getAllUsers); 
router.get('/users/:phone', getUserByPhone);



module.exports = router;
