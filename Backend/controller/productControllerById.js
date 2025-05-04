const { client } = require('../config/db');
const { ObjectId } = require('mongodb');

const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const db = client.db("DataBase1");
        const collection = db.collection("Products");

        const product = await collection.findOne({ _id: new ObjectId(id) });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    }
    catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).json({ message: "Internal server error while getting product" });
    }
};

module.exports = { getProductById };
