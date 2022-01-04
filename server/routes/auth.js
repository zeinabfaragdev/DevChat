const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");

const User = require("../models/User");

router.post("/signup", async (req, res) => {
  const user = new User({
    ...req.body,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  const userExists = await User.findOne({ email: req.body.email });

  if (userExists) {
    res.status(400).send("Email already exists, please sign in.");
  } else {
    try {
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
});

router.post("/signin", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(404).send("Email not found.");
  } else {
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) return res.status(400).send("Invalid Password.");
  }
});

module.exports = router;
