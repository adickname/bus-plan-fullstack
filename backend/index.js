const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const userRoute = require("./routes/user.route.js");
const scheduleRoute = require("./routes/schedule.route.js");
const orderRoute = require("./routes/order.route.js");
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Ustawia domenę frontendu, który ma dostęp
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Ustawia dozwolone metody HTTP
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Ustawia dozwolone nagłówki
  next();
});

app.use("/api/users", userRoute);
app.use("/api/schedules", scheduleRoute);
app.use("/api/orders", orderRoute);
mongoose
  .connect(
    "mongodb+srv://pasterkaadrian:uCgtPdtkelF8mz40@cluster-0.vsqoqx6.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster-0"
  )
  .then(() => {
    app.listen(5170, () => {});
    console.log("Connected to database");
  })
  .catch(() => console.log("not connected"));
