'use strict';

const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
    unique: true
  },
  exercises: Array,
  totalDuration: Number
});


WorkoutSchema.methods.addTotalDuration = function () {
  this.totalDuration = 0;
  // console.log(`totalDur: `, this.exercises);
  if (this.exercises.length > 0) {
    for (const exercise of this.exercises) {
      this.totalDuration += parseInt(exercise.duration);
    };
  };
  return this.totalDuration;
};


module.exports = mongoose.model(`Workout`, WorkoutSchema);
