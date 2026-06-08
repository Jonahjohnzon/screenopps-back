const mongoose = require("mongoose");

const mongoosedb = async () => {
  try {

    const con = await mongoose.connect("mongodb+srv://jonahjohnzon:JOHNZON@lets.evmaf.mongodb.net/?appName=Lets", {
      dbName: "Lets",
      bufferCommands: true,
    });

    console.log(`Mongo Connect: ${con.connection.host}`);
  } catch (err) {
    console.error("Error:", err);
  }
};

module.exports = mongoosedb;