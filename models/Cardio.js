'use strict';

const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;

const CardioSchema = new Schema({
  name: {
    type: String
  },
  duration: {
    type: Number
  },
  distance: {
    type: Number
  }
});

module.exports = mongoose.model(`Cardio`, CardioSchema);
