const express = require("express");
const router = express.Router();
const Schedule = require("../models/schedule.model.js");

router.post("/bus-line", async (req, res) => {
  try {
    if (req.body.end && req.body.start) {
      const { end, start, companies } = req.body;
      const schedule = await Schedule.find({
        end: end,
        start: start,
        company: { $in: companies._value },
      });
      if (schedule.length === 0) {
        res.json({ message: "Cannot find. Check your data." });
      } else {
        res.status(200).json(schedule);
      }
    } else {
      res.json({ message: "No enough data" });
    }
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.get("/company", async (req, res) => {
  try {
    const company = await Schedule.distinct("company");
    res.status(200).json(company);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.post("/bus-stops/filter-companies", async (req, res) => {
  try {
    if (req.body.end && req.body.start) {
      const { end, start, companies } = req.body;
      const schedule = await Schedule.find({
        "places.place": { $regex: `${start}` },
        "places.place": { $regex: `${end}` },
        company: { $in: companies._value },
      });
      if (schedule.length === 0) {
        res.send({ message: "Cannot find. Check your data." });
      } else {
        res.status(200).json(schedule);
      }
    } else if (req.body.end) {
      const { end, companies } = req.body;
      const schedule = await Schedule.find({
        "places.place": { $regex: `${end}` },
        company: { $in: companies._value },
      });
      if (schedule.length === 0) {
        res.send({ message: "Cannot find. Check your data." });
      }
      res.status(200).json(schedule);
    } else if (req.body.start) {
      const { start } = req.body;
      const schedule = await Schedule.find({
        "places.place": { $regex: `${start}` },
        company: { $in: companies._value },
      });
      if (schedule.length === 0) {
        res.send({ message: "Cannot find. Check your data." });
      }
      res.status(200).json(schedule);
    } else {
      res.send({ message: "Cannot find. Check your data." });
    }
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.post("/bus-stops", async (req, res) => {
  try {
    if (req.body.end && req.body.start) {
      const { end, start } = req.body;
      const schedule = await Schedule.find({
        $and: [
          { "places.place": { $in: start } },
          { "places.place": { $in: end } },
        ],
      });
      if (schedule.length === 0) {
        res.send({ message: "Cannot find. Check your data." });
      } else {
        res.status(200).json(schedule);
      }
    }
  } catch (error) {
    res.send({ message: error.message });
  }
});

module.exports = router;
