const express = require('express');
const router = express.Router();
const { getUserByPhone } = require('../controller/getUserByPhone');


router.get('/users/phone/:phone', getUserByPhone); 


module.exports = router;
