const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/user.model.js");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/api/users/:login", async (req, res) => {
  try {
    const { login } = req.params;
    const user = await User.findOne({ login: login });
    console.log(user);
    if (user) {
      res.send(user);
    } else {
      res.send({ isFound: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post("/api/users/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});
mongoose
  .connect(
    "mongodb+srv://pasterkaadrian:uCgtPdtkelF8mz40@cluster-0.vsqoqx6.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster-0"
  )
  .then(() => {
    app.listen(5137, () => {});
    console.log("Connected to database");
  })
  .catch(() => console.log("not connected"));
