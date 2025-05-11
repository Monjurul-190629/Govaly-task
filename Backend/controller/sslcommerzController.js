const { ObjectId } = require('mongodb');
const { client } = require('../config/db');
const sslCommerzService = require('../services/sslcommerzService');

const db = client.db("DataBase1");
const productCollection = db.collection("Products");
const userCollection = db.collection("User");
const userSuccessCollection = db.collection("User_Success")

//  INITIATE PAYMENT
const initPayment = async (req, res) => {
    try {
        const { name, email, phone, address, postcode, productId, success_url, fail_url, cancel_url } = req.body;

        const product = await productCollection.findOne({ _id: new ObjectId(productId) });
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const transaction_id = new ObjectId().toString();
        const coin = parseInt(product.price * 10 / 100);



        const data = {
            total_amount: product.price,
            currency: 'BDT',
            tran_id: transaction_id,
            success_url: success_url || `https://govaly-task-production.up.railway.app/api/success?tran_id=${transaction_id}`,
            fail_url: fail_url || 'https://govaly-task-production.up.railway.app/api/fail',
            cancel_url: cancel_url || 'https://govaly-task-production.up.railway.app/api/cancel',
            ipn_url: 'https://govaly-task-production.up.railway.app/api/payment/ipn',
            shipping_method: 'Courier',
            product_name: product.name,
            product_category: product.type,
            product_profile: 'general',
            cus_name: name,
            cus_email: email,
            cus_add1: address,
            cus_add2: address,
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: postcode,
            cus_country: 'Bangladesh',
            cus_phone: phone,
            cus_fax: '01711111111',
            ship_name: name,
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };

        await userCollection.insertOne({
            tran_id: transaction_id,
            name,
            email,
            phone,
            address,
            coin,
            createdAt: new Date(),
            paidStatus: false,
        });

        const apiResponse = await sslCommerzService.initPayment(data);
        res.status(200).json({ GatewayPageURL: apiResponse.GatewayPageURL });
    } catch (error) {
        console.error('Payment init error:', error.message);
        res.status(500).json({ message: 'Payment initialization failed', error: error.message });
    }
};

// SUCCESS HANDLER (GET or POST)
const handleSuccess = async (req, res) => {
    const tran_id = req.query.tran_id || req.body.tran_id;

    if (!tran_id) return res.status(400).json({ message: 'Transaction ID missing' });

    try {
        const user = await userCollection.findOne({ tran_id });
        if (!user) return res.status(404).json({ message: "Transaction not found" });

        // Mark the transaction as paid
        await userCollection.updateOne({ tran_id }, { $set: { paidStatus: true } });

        // Check if the user already exists in the success collection
        const existingSuccessUser = await userSuccessCollection.findOne({ phone: user.phone });

        if (existingSuccessUser) {
            // Update the existing user's coin
            const newCoinTotal = (existingSuccessUser.coin || 0) + (user.coin || 0);

            await userSuccessCollection.updateOne(
                { phone: user.phone },
                { $set: { coin: newCoinTotal } }
            );
        } else {
            // Insert new user to success collection
            await userSuccessCollection.insertOne({
                tran_id: user.tran_id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                coin: user.coin || 0,
                paidStatus: true,
                movedAt: new Date()
            });
        }

        // Clean up the temporary collection
        await userCollection.deleteOne({ tran_id });

        // Redirect to frontend payment success page
        res.redirect(`https://govaly-task.vercel.app/payment-success/${tran_id}`);
    } catch (error) {
        console.error('Success handler error:', error.message);
        res.status(500).json({ message: "Payment success processing failed", error: error.message });
    }
};


//  FAIL HANDLER
const handleFail = (req, res) => {
    res.redirect('https://govaly-task.vercel.app/payment-fail');
};

//  CANCEL HANDLER
const handleCancel = (req, res) => {
    res.redirect('https://govaly-task.vercel.app/payment-fail');
};

//  IPN HANDLER
const handleIPN = (req, res) => {
    console.log('IPN Received:', req.body);
    // You can verify transaction data here (optional)
    res.status(200).send('IPN received');
};

// Exports
module.exports = {
    initPayment,
    handleSuccess,
    handleFail,
    handleCancel,
    handleIPN,
};
