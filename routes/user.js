const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");

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

      const token = jwt.sign(
        {
          user_id: user._id,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      res.cookie("token", token, { httpOnly: true }).json(user);
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

    const token = jwt.sign(
      {
        user_id: user._id,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    res.cookie("token", token, { httpOnly: true }).json(user);
  }
});

router.get("/", verifyToken, async (req, res) => {
  let userId = req.user.user_id;
  try {
    let result = await User.findOne({ _id: userId });
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: "User does not exist" });
  }
});

router.get("/signout", (req, res) => {
  return res
    .clearCookie("token")
    .status(200)
    .json({ message: "Successfully logged out" });
});

module.exports = router;
