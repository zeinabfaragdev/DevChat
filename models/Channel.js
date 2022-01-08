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
          },
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            autopopulate: { select: "avatar username" },
          },
          image: {
            type: String,
          },
        },
        { timestamps: true }
      ),
    },
  ],
});

ChannelSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("Channel", ChannelSchema);
