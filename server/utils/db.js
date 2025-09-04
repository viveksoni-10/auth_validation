const mongoose  = require("mongoose");

const URL = process.env.MONGODB_URL;

const connectdb = async ()=>{
  try {
    await mongoose.connect(URL);
    console.log("DATABASE CONNECTED");
  } catch (error) {
    console.error("database connection faill");
    process.exit(0);
  }
}


module.exports = connectdb;