const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_DB_URL);
const connect = mongoose.connection;
 
connect.on("connected", () => {
  console.log("DB connection established");
});
connect.on("error", () => {
  console.log("DB connection failed");
});
module.exports = connect;