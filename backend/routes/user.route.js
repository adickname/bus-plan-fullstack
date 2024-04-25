const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.model.js");

router.delete("/", async (req, res) => {
  const { user } = req.body;
  let fakeUser = await User.findOne({ email: user });
  await User.deleteOne({ email: user });
  res.send({ message: "deleting fake user" });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const isPasswordValid = bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        res.json({ isFound: true, userId: user.id });
      } else {
        res.json({ message: "inwalid password" });
      }
    } else {
      res.send({ isFound: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { subAuth0 } = req.body;
  try {
    const user = await User.findOne({ subAuth0: subAuth0 });
    if (user) {
      res.send({ isFound: true });
    } else {
      res.send({ isFound: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { subAuth0 } = req.body;
    const user = await User.create({ subAuth0: subAuth0 });
    if (user) {
      res.status(200).send({ message: "registered succesfully" });
    }
  } catch (error) {
    res.send({ message: error.message });
  }
});

module.exports = router;
