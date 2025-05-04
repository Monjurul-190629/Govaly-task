const { client } = require('../config/db');

const getAllUsers = async (req, res) => {
    try {
        const db = client.db("DataBase1");
        const collection = db.collection("User_Success");

        const products = await collection.find({}).toArray(); // fetch all documents
        res.status(200).json(products);
    } 
    catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal server error to get Products" });
    }
};

module.exports = { getAllUsers };