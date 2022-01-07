const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema({
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
    autopopulate: { select: "avatar username" },
  },
  messages: [
    {
      type: new mongoose.Schema(
        {
          content: {
            type: String,
            required: true,
          },
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            autopopulate: { select: "avatar username" },
          },
        },
        { timestamps: true }
      ),
    },
  ],
});

ChannelSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("Channel", ChannelSchema);
