const { client } = require('../config/db');

const getUserByTranId = async (req, res) => {
    const { id } = req.params; // this is the tran_id from URL

    try {
        const db = client.db("DataBase1");
        const collection = db.collection("User_Success");

        // Match document where tran_id field equals the provided id
        const user = await collection.findOne({ tran_id: id });

        if (!user) {
            return res.status(404).json({ message: "User not found with this transaction ID" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user by tran_id:", error);
        res.status(500).json({ message: "Internal server error while getting user" });
    }
};

module.exports = { getUserByTranId };
