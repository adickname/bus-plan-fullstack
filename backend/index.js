const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const userRoute = require("./routes/user.route.js");
const scheduleRoute = require("./routes/schedule.route.js");
const orderRoute = require("./routes/order.route.js");
app.use(express.json());
app.use(cors());
const allowedOrigins = [
  process.env.CLIENT_APP_URL,
  process.env.CLIENT_APP_URL_RENDER,
];
app.use((req, res, next) => {
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

console.log(process.env.MONGO_CONNECT);

app.use("/api/users", userRoute);
app.use("/api/schedules", scheduleRoute);
app.use("/api/orders", orderRoute);
mongoose
  .connect(process.env.MONGO_CONNECT)
  .then(() => {
    app.listen(process.env.SERVER_PORT, () => {});
    console.log("Connected to database");
  })
  .catch(() => console.log("not connected"));
