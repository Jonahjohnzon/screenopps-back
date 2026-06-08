const mongoose = require("mongoose");

const mongoosedb = async () => {
  try {

    const con = await mongoose.connect(process.env.DB_MONGOURL, {
      dbName: "Lets",
      bufferCommands: true,
    });

    console.log(`Mongo Connect: ${con.connection.host}`);
  } catch (err) {
    console.error("Error:", err);
  }
};

module.exports = mongoosedb;