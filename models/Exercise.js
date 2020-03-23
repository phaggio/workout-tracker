'use strict';

const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  type: {
    type: String
  },
  name: {
    type: String
  },
  duration: {
    type: Number
  }
});

module.exports = mongoose.model(`Exercise`, ExerciseSchema);
