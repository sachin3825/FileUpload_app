// importing mongoose
const mongoose = require("mongoose");
// import env file
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB connect successful"))
    .catch((error) => {
      console.log("DB connection issues");
      process.exit(1);
    });
};
