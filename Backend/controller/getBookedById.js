const { client } = require('../config/db');
const { ObjectId } = require('mongodb');

const getBookedById = async (req, res) => {
    const { id } = req.params;

    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const db = client.db("DataBase1");
        const collection = db.collection("BookedProducts");

        // Find product by ID
        const product = await collection.findOne({ _id: new ObjectId(id) });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product by ID:", error.message); // Log only the error message
        res.status(500).json({ message: "Internal server error while getting product" });
    }
};

module.exports = { getBookedById };
