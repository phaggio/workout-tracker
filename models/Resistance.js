'use strict';

const mongoose = require(`mongoose`);
const opts = { toJSON: { virtuals: true }, toObject: { virtuals: true } };

const Schema = mongoose.Schema;

const ResistanceSchema = new Schema({
  name: {
    type: String,
    minlength: 1
  },
  weight: {
    type: Number,
    min: 1
  },
  reps: {
    type: Number,
    min: 1
  },
  sets: {
    type: Number,
    min: 1
  },
  duration: {
    type: Number,
    min: 1
  }
}, opts);

ResistanceSchema.virtual(`type`).get(function () {
  return `resistance`;
});

module.exports = mongoose.model(`Resistance`, ResistanceSchema);
