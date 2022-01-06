const mongoose = require("mongoose");

const Channel = mongoose.model(
  "Channel",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  })
);

module.exports = Channel;
