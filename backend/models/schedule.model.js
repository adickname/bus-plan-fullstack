const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    start: {
      type: Object,
      required: [true, "required"],
    },
    end: {
      type: Object,
      required: [true, "required"],
    },
    rest: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
