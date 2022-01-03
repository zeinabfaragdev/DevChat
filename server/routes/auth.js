const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");

// Load Book model
const User = require("../models/User");

router.post("/signup", (req, res) => {
  // const user = new User({
  //   ...req.body,
  //   password: bcrypt.hashSync(req.body.password, 8),
  // });

  res.send(req.body.email);

  //   Book.create(req.body)
  //     .then((book) => res.json({ msg: "Book added successfully" }))
  //     .catch((err) => res.status(400).json({ error: "Unable to add this book" }));
});

module.exports = router;
