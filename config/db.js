const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("db Connected");
  })
  .catch((error) => {
    console.log(error);
  });
