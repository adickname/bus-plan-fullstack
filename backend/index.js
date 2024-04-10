const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/user.model.js");
const cors = require("cors");
const Schedule = require("./models/schedule.model.js");

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Ustawia domenę frontendu, który ma dostęp
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Ustawia dozwolone metody HTTP
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Ustawia dozwolone nagłówki
  next();
});

//user

app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email, password: password });
    if (user) {
      res.send({ isFound: true });
    } else {
      res.send({ isFound: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/users/", async (req, res) => {
  const email = decodeURIComponent(req.query.email);
  console.log(email);
  try {
    const user = await User.findOne({ email: email });
    console.log(user);
    if (user) {
      res.send({ isFound: true });
    } else {
      res.send({ isFound: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post("/api/users/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

//schedule

app.post("/api/schedules/bus-line", async (req, res) => {
  try {
    if (req.body.end && req.body.start) {
      const { end, start, companies } = req.body;
      const schedule = await Schedule.find({
        end: end,
        start: start,
        company: { $in: companies._value },
      });
      console.log(schedule);
      if (schedule.length === 0) {
        res.send({ message: "Cannot find. Check your data." });
      }
      res.status(200).json(schedule);
    } else if (req.body.end) {
      const { end, companies } = req.body;
      const schedule = await Schedule.find({
        end: end,
        company: { $in: companies._value },
      });
      if (schedule.length === 0) {
        res.send({ message: "Cannot find. Check your data." });
      }
      res.status(200).json(schedule);
    } else if (req.body.start) {
      const { start } = req.body;
      const schedule = await Schedule.find({
        start: start,
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
    console.log(error.message);
  }
});

app.post("/api/schedules/bus-stops", async (req, res) => {
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
      }
      res.status(200).json(schedule);
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
    console.log(error.message);
  }
});

app.get("/api/schedules/company", async (req, res) => {
  try {
    const company = await Schedule.distinct("company");
    res.status(200).json(company);
  } catch (error) {
    console.log(error.message);
  }
});

mongoose
  .connect(
    "mongodb+srv://pasterkaadrian:uCgtPdtkelF8mz40@cluster-0.vsqoqx6.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster-0"
  )
  .then(() => {
    app.listen(5170, () => {});
    console.log("Connected to database");
  })
  .catch(() => console.log("not connected"));
