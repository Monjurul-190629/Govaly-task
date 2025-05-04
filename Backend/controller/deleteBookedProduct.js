const { ObjectId } = require('mongodb');
const { client } = require('../config/db');

const deleteBookedProduct = async (req, res) => {
    const { id } = req.params;

    // Check if the ID is valid
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid booking ID" });
    }

    try {
        const db = client.db("DataBase1");
        const collection = db.collection("BookedProducts");

        // Check if product exists before deleting
        const product = await collection.findOne({ _id: new ObjectId(id) });

        if (!product) {
            return res.status(404).json({ message: "Booked product not found" });
        }

        // Now delete it
        await collection.deleteOne({ _id: new ObjectId(id) });

        res.status(200).json({ message: "Product removed from cart successfully" });
    } catch (error) {
        console.error("Error deleting booked product:", error);
        res.status(500).json({ message: "Internal server error while deleting product" });
    }
};

module.exports = { deleteBookedProduct };
