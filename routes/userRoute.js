const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
require('dotenv').config();

router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ user});
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }
    const token = jwt.sign({ _id: user._id }, 'Rudra', { expiresIn: "1h"});
    res.status(200).send({accessToken: token});
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;