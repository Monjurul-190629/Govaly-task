const express = require('express');
const router = express.Router();
const {
    initPayment,
    handleSuccess,
    handleFail,
    handleCancel,
    handleIPN
} = require('../controller/sslcommerzController');

router.post('/init', initPayment);
router.get('/success', handleSuccess);
router.post('/success', handleSuccess); // 🔥 Important!
router.post('/fail', handleFail);
router.post('/cancel', handleCancel);
router.post('/ipn', handleIPN);

module.exports = router;
