// Import core modules
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');


// load environment variables from .env
require('dotenv').config();

// define port
const PORT = process.env.PORT || 5000;

// Initialize Express App
const app = express();


// Enable cors for all routes
app.use(cors());

// Enable incoming json requests
app.use(express.json());


// For MongoDB
const { connectDB } = require('./config/db')
connectDB();



// Modules 
const productRoutes = require('./routes/productRoutes');
const BookedRoutes = require('./routes/BookedRoutes');
const getBookedProduct = require('./routes/getBookedProduct');
const deletedBooked = require('./routes/deletedBooked');
const sslcommerzRoutes = require('./routes/sslcommerzRoutes');

// routes
app.use('/api', productRoutes); 
app.use('/api', BookedRoutes);
app.use('/api', getBookedProduct)
app.use('/api', deletedBooked)
app.use('/api', sslcommerzRoutes);

// Sample success, fail, and cancel routes
app.get('/success', (req, res) => res.send('Payment Successful'));
app.get('/fail', (req, res) => res.send('Payment Failed'));
app.get('/cancel', (req, res) => res.send('Payment Canceled'));
app.post('/ipn', (req, res) => {
    console.log(req.body);  // Handle IPN (Instant Payment Notification)
    res.send('OK');
});


// default for checking

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

app.get('/', (req, res) => {
    res.send('Server is running now');
})

