const express = require("express");
const router = express.Router();
const Schedule = require("../models/schedule.model.js");

router.post("/bus-line", async (req, res) => {
  try {
    if (req.body.end && req.body.start) {
      const { end, start, companies } = req.body;
      const schedule = await Schedule.find({
        end: end.toLowerCase(),
        start: start.toLowerCase(),
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

router.get("/companies", async (req, res) => {
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
        "places.place": { $regex: `${start.toLowerCase()}` },
        "places.place": { $regex: `${end.toLowerCase()}` },
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
        "places.place": { $regex: `${end.toLowerCase()}` },
        company: { $in: companies._value },
      });
      if (schedule.length === 0) {
        res.send({ message: "Cannot find. Check your data." });
      }
      res.status(200).json(schedule);
    } else if (req.body.start) {
      const { start } = req.body;
      const schedule = await Schedule.find({
        "places.place": { $regex: `${start.toLowerCase()}` },
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
          { "places.place": { $in: start.toLowerCase() } },
          { "places.place": { $in: end.toLowerCase() } },
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

router.get("/bus-stops/distinct", async (req, res) => {
  try {
    const place = await Schedule.distinct("places.place");
    if (place.length === 0) {
      res.send({ message: "cannot find. check your data" });
    }
    res.status(200).json(place);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.post("/bus-stops/destination", async (req, res) => {
  try {
    let { start } = req.body;
    start = start.toLowerCase();
    const place = await Schedule.distinct("places.place", {
      "places.place": { $in: start },
    });
    if (place.length === 0) {
      res.send({ message: "cannot find. check your data" });
    }
    res.status(200).json(place);
  } catch (error) {
    res.send({ message: error.message });
  }
});

module.exports = router;
