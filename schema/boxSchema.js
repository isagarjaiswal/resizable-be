const mongoose = require("mongoose");

const boxSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

const Box = mongoose.model("Box", boxSchema);

module.exports = Box;
