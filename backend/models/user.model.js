const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    login: {
      type: String,
      required: [true, "required"],
    },
    password: {
      type: String,
      required: [true, "required"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
