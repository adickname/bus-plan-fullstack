const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    subAuth0: {
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
