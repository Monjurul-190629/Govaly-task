const { ObjectId } = require('mongodb');
const { client } = require('../config/db');
const sslCommerzService = require('../services/sslcommerzService');

const db = client.db("DataBase1");
const collection = db.collection("Products");

const initPayment = async (req, res) => {

    const user = req.body;

    const product = await collection.findOne({
        _id: new ObjectId(req.body.productId)
    })
    


    const data = {
        total_amount: product.price,
        currency: 'BDT',
        tran_id: 'REF123', // Use a unique transaction ID
        success_url: 'http://localhost:3030/success',
        fail_url: 'http://localhost:3030/fail',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: product.name,
        product_category: product.type,
        product_profile: 'general',
        cus_name: user.name,
        cus_email: user.email,
        cus_add1: user.address,
        cus_add2: user.address,
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: user.postcode,
        cus_country: 'Bangladesh',
        cus_phone: user.phone,
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };

    try {
        const apiResponse = await sslCommerzService.initPayment(data);
        const GatewayPageURL = apiResponse.GatewayPageURL;
        // ✅ Instead of res.redirect:
        res.status(200).json({ GatewayPageURL });
        console.log('Redirecting to: ', GatewayPageURL);
    } catch (error) {
        res.status(500).json({ message: 'Error initializing payment: ' + error.message });
    }
};

module.exports = { initPayment };
