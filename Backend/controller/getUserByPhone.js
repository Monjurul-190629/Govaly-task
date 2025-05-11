const { client } = require('../config/db');

const getUserByPhone = async (req, res) => {
    const { phone } = req.params;

    console.log(phone);

    try {
        const db = client.db("DataBase1");
        const collection = db.collection("User_Success");

        const user = await collection.findOne({ phone: phone });

        if (!user) {
            return res.status(404).json({ message: "User not found with this phone number" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user by phone:", error);
        res.status(500).json({ message: "Internal server error while getting user" });
    }
};

module.exports = { getUserByPhone };
