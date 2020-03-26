'use strict';

const mongoose = require(`mongoose`);
const opts = { toJSON: { virtuals: true }, toObject: { virtuals: true } };

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  exercise: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: `onModel`
  },
  onModel: {
    type: String,
    required: true,
    enum: ['Cardio', 'Resistance']
  }
}, opts);

module.exports = mongoose.model(`Exercise`, ExerciseSchema);
