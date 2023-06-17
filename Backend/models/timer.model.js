const mongoose = require("mongoose");

const timerSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    default: null,
  },
  endTime: {
    type: Date,
    default: null,
  },
  duration: {
    type: Number,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

timerSchema.methods.start = function () {
  if (!this.isActive) {
    this.startTime = new Date();
    this.isActive = true;
  }
};

timerSchema.methods.stop = function () {
  if (this.isActive) {
    this.endTime = new Date();
    this.duration = this.endTime - this.startTime;
    this.isActive = false;
  }
};

const TimerModel = mongoose.model("timer", timerSchema);

module.exports = { TimerModel };



