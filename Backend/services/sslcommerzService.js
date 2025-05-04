const SSLCommerzPayment = require('sslcommerz-lts');
const { store_id, store_passwd, is_live } = require('../config/sslcommerzConfig');

const sslCommerzService = new SSLCommerzPayment(store_id, store_passwd, is_live);

const initPayment = async (data) => {
    try {
        const response = await sslCommerzService.init(data);
        return response;
    } catch (error) {
        throw new Error("Payment Initialization failed: " + error.message);
    }
};

module.exports = { initPayment };
