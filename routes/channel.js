const express = require("express");
const router = express.Router();
const Channel = require("../models/Channel");

router.post("/", async (req, res) => {
  const channel = new Channel(req.body);
  try {
    await channel.save();
    await channel.populate("createdBy", "avatar username");
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

module.exports = router;
