const { client } = require('../config/db');

const bookProduct = async (req, res) => {
    try {
        const db = client.db("DataBase1");
        const collection = db.collection("BookedProducts"); // use a new collection

        const bookedProduct = req.body;

        if (!bookedProduct || !bookedProduct.productId || !bookedProduct.userId) {
            return res.status(400).json({ message: "Missing required booking information" });
        }

        const result = await collection.insertOne(bookedProduct);

        res.status(201).json({
            message: "Product booked successfully",
            bookingId: result.insertedId,
        });
    } 
    catch (error) {
        console.error("Error booking product:", error);
        res.status(500).json({ message: "Internal server error while booking product" });
    }
};

module.exports = { bookProduct };
