const express = require("express");
const router = express.Router();
const Schedule = require("../models/schedule.model.js");

const returnData = (data, res) => {
  if (data.length === 0) {
    res.send({ message: "Cannot find. Check your data." });
  } else {
    res.status(200).json(data);
  }
};

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
        $and: [
          { "places.place": { $regex: `${start.toLowerCase()}` } },
          { "places.place": { $regex: `${end.toLowerCase()}` } },
          { company: { $in: companies._value } },
        ],
      });
      returnData(schedule, res);
    } else if (req.body.start) {
      const { start, companies } = req.body;
      const schedule = await Schedule.find({
        "places.place": { $regex: `${start.toLowerCase()}` },
        company: { $in: companies._value },
      });
      returnData(schedule, res);
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
      returnData(schedule, res);
    }
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.get("/bus-stops/distinct", async (req, res) => {
  try {
    const place = await Schedule.distinct("places.place");
    returnData(place, res);
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
    returnData(
      place.filter((place) => place != start),
      res
    );
  } catch (error) {
    res.send({ message: error.message });
  }
});

module.exports = router;
