const express = require("express");
const router = express.Router();
const Channel = require("../models/Channel");

router.post("/", async (req, res) => {
  const channel = new Channel(req.body);
  try {
    await channel.save();
    res.json(channel);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/", async (req, res) => {
  const channels = await Channel.find();
  try {
    res.json(channels);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:channelId", async (req, res) => {
  let channel = await Channel.findByIdAndUpdate(
    req.params.channelId,
    {
      $push: {
        messages: {
          content: req.body.content,
          user: req.body.user,
        },
      },
    },
    { new: true, upsert: true }
  );

  res.json(channel);
});

module.exports = router;
