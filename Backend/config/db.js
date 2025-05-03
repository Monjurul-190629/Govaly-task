const { MongoClient, ServerApiVersion } = require('mongodb');

// Use environment variable for security
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(" Connected to MongoDB successfully (native driver) For task only");
  } 
  catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

module.exports = {
  connectDB,
  client,
};
