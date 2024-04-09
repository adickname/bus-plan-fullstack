const mongoose = require("mongoose");

const PlaceSchema = mongoose.Schema({
  place: {
    type: String,
    required: [true, "required"],
  },
  hours: {
    type: [String],
  },
});

const ScheduleSchema = mongoose.Schema(
  {
    comapny: {
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
    places: {
      type: [PlaceSchema],
      required: [true, "required"],
    },
  },
  {
    timestamps: true,
  }
);

const Schedule = mongoose.model("Schedule", ScheduleSchema);
module.exports = Schedule;
