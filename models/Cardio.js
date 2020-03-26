'use strict';

const mongoose = require(`mongoose`);
const opts = { toJSON: { virtuals: true }, toObject: { virtuals: true } };

const Schema = mongoose.Schema;

const CardioSchema = new Schema({
  name: {
    type: String,
    minlength: 1
  },
  distance: {
    type: Number,
    min: 1
  },
  duration: {
    type: Number,
    min: 1
  }
}, opts);

CardioSchema.virtual(`type`).get(function () {
  return `cardio`;
});

module.exports = mongoose.model(`Cardio`, CardioSchema);
