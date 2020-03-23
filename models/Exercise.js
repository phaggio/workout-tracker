'use strict';

const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;


const ExerciseSchema = new Schema({
  type: String,
  name: String,
  duration: Number
});


module.exports = mongoose.model(`Exercise`, ExerciseSchema);
