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
const BookedRoutes = require('./routes/BookedRoutes')
const getBookedProduct = require('./routes/getBookedProduct')

// routes
app.use('/api', productRoutes); 
app.use('/api', BookedRoutes);
app.use('/api', getBookedProduct)


// default for checking

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

app.get('/', (req, res) => {
    res.send('Server is running now');
})

