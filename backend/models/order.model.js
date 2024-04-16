const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    owner: {
      type: String,
      required: [true, "required"],
    },
    name: {
      type: String,
      required: [true, "required"],
    },
    surname: {
      type: String,
      required: [true, "required"],
    },
    age: {
      type: String || Number,
      required: [true, "required"],
    },
    company: {
      type: String,
      required: [true, "required"],
    },
    distance: {
      type: String,
      required: [true, "required"],
    },
    end: {
      type: String,
      required: [true, "required"],
    },
    start: {
      type: String,
      required: [true, "required"],
    },

    fakePrice: {
      type: String || Number,
      required: [true, "required"],
    },
    reducedPrice: {
      type: String || Number,
      required: [true, "required"],
    },
    dateOfIssue: {
      type: String,
      required: [true, "required"],
    },

    dateOfExpiry: {
      type: String,
      required: [true, "required"],
    },
    typeTicket: {
      type: String,
      required: [true, "required"],
    },
    oneWay: {
      type: Boolean,
      required: [true, "required"],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
