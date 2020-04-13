'use strict';

const db = require(`../models`);

module.exports = app => {
  app.get(`/api/workouts`, (req, res) => {
    db.Workout.find({})
      .populate({
        path: `exercises`
        ,
        populate: {
          path: `exercise`
        }
      })
      .then(workouts => {
        console.log(workouts[workouts.length - 1]);
        res.json(workouts)
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.post(`/api/workouts`, (req, res) => {
    db.Workout.create({})
      .then(result => {
        console.log(`success add to mongoDB`);
        console.log(`new workout ID: ${result._id}`);
        res.json(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.put(`/api/workouts/:id`, (req, res) => {
    if (req.body.type === 'cardio') {
      db.Cardio.create(req.body)
        .then(({ _id }) =>
          db.Exercise.create({ exercise: _id, onModel: `Cardio` })
        )
        .then(({ _id }) =>
          db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: _id } }, { new: true })
        )
        .then(workout => {
          res.json(workout);
        })
        .catch(err => {
          res.json(err);
        });
    } else {
      db.Resistance.create(req.body)
        .then(({ _id }) =>
          db.Exercise.create({ exercise: _id, onModel: `Resistance` })
        )
        .then(({ _id }) =>
          db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: _id } }, { new: true })
        )
        .then(workout => {
          res.json(workout);
        })
        .catch(err => {
          res.json(err);
        });
    };
  });

  app.get(`/api/workouts/range`, (req, res) => {
    db.Workout.find({})
      .populate({
        path: `exercises`
        ,
        populate: {
          path: `exercise`
        }
      })
      .then(workouts => {
        const maxWorkouts = 8;
        console.log(workouts.length);
        if (workouts.length > maxWorkouts) {
          workouts = workouts.splice(workouts.length - maxWorkouts)
        };
        res.json(workouts);
      })
      .catch(err => {
        console.log(err);
      });
  });

};
