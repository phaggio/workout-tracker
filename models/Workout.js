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
  totalDuration: Number,
  totalWeight: Number,
  totalReps: Number,
  totalDistance: Number,
  weekday: Number
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

WorkoutSchema.methods.addWeekday = function () {
  this.weekday = this.day.getDay();
  return this.weekday;
};

WorkoutSchema.methods.addTotalWeight = function () {
  this.totalWeight = 0;
  if (this.exercises.length > 0) {
    for (const exercise of this.exercises) {
      if (exercise.type === `resistance`) {
        this.totalWeight += (exercise.weight * exercise.reps * exercise.sets);
      };
    };
  };
  return this.totalWeight;
};

WorkoutSchema.methods.addTotalReps = function () {
  this.totalReps = 0;
  if (this.exercises.length > 0) {
    for (const exercise of this.exercises) {
      if (exercise.type === `resistance`) {
        this.totalReps += (exercise.reps * exercise.sets);
      };
    };
  };
  return this.totalReps;
};

WorkoutSchema.methods.addTotalDistance = function () {
  this.totalDistance = 0;
  if (this.exercises.length > 0) {
    for (const exercise of this.exercises) {
      if (exercise.type === `cardio`) {
        this.totalDistance += exercise.distance;
      };
    };
  };
  return this.totalDistance;
};


// 7 objects
// total duration by weekdays
// total pounds lifted by weekdays
// total duration by exercise
// total pounds by exercise

module.exports = mongoose.model(`Workout`, WorkoutSchema);
