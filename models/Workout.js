'use strict';

const mongoose = require(`mongoose`);
const opts = { toJSON: { virtuals: true }, toObject: { virtuals: true } };

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
    unique: true
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: `Exercise`
    }
  ],
  weekday: Number
}, opts);

WorkoutSchema.virtual(`totalDuration`).get(function () {
  let totalDuration = 0;
  if (this.exercises.length > 0) {
    for (const exercise of this.exercises) {
      totalDuration += parseInt(exercise.exercise.duration);
    };
  };
  return totalDuration;
})

WorkoutSchema.methods.addWeekday = function () {
  this.weekday = this.day.getDay();
  return this.weekday;
};

module.exports = mongoose.model(`Workout`, WorkoutSchema);
