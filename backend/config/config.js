const mongoose = require("mongoose");

const connectDb = () => {
  mongoose.connect(process.env.URL || "mongodb://localhost:27017/lingua");
  mongoose.connection.on("open", () => console.log("Mongo Running"));
  mongoose.connection.on("error", (err) => {
    console.log(`MongoDB Connection Error: ${err}`);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Disconnected");
  });
};

module.exports = connectDb;
