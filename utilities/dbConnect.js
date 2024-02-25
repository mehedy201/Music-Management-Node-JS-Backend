const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db);

let _db;

module.exports = {
  connectToServer: async function () {
    try {
      await client.connect();
      _db = client.db("DreamRecords");
      console.log("Successfully connected to MongoDB.");
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
      throw err; // Rethrow the error so the caller can handle it
    }
  },

  getDb: function () {
    if (!_db) {
      throw new Error("Database not initialized. Call connectToServer first.");
    }
    return _db;
  },
};


