const mongoose = require("mongoose");

const PriceSchema = mongoose.Schema({
  company: {
    type: String,
    required: [true, "required"],
  },
  price: {
    type: String,
    required: [true, "required"],
  },
  priceMonth: {
    type: String,
    required: [true, "required"],
  },
  priceWeek: {
    type: String,
    required: [true, "required"],
  },
});

const Price = mongoose.model("Price", PriceSchema);
module.exports = Price;
