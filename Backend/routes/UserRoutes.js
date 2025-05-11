const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controller/getUser');
const {getUserByTranId} = require('../controller/getUserByTranId');


router.get('/users', getAllUsers); 
router.get('/users/:id', getUserByTranId);



module.exports = router;
