const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    owner: {
      type: String,
      required: [true, "required"],
    },
    company: {
      type: String,
      required: [true, "required"],
    },
    start: {
      type: String,
      required: [true, "required"],
    },
    end: {
      type: String,
      required: [true, "required"],
    },
    distance: {
      type: String,
      required: [true, "required"],
    },
    fakePrice: {
      type: String,
      required: [true, "required"],
    },
    reducedPrice: {
      type: String,
      required: [true, "required"],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
