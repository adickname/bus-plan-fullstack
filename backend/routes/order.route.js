const express = require("express");
const router = express.Router();
const Order = require("../models/order.model.js");
const Price = require("../models/price.model.js");
router.post("/new", async (req, res) => {
  try {
    const user = await Order.create(req.body);
    res.status(200).send({ message: "added succesfully" });
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.post("/find", async (req, res) => {
  try {
    const tickets = await Order.find({ owner: req.body.owner });
    res.status(200).json(tickets);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.get("/prices", async (req, res) => {
  try {
    const price = await Price.findOne({ company: req.query.company });
    res.status(200).json(price);
  } catch (error) {
    res.send({ message: error.message });
  }
});

module.exports = router;
