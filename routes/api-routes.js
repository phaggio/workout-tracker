'use strict';

const db = require(`../models`);

module.exports = app => {
  app.get(`/api/workouts`, (req, res) => {
    db.Workout.find({})
      .then(workouts => {
        let newWorkoutArr = [];
        for (let i in workouts) {
          const workout = new db.Workout(workouts[i]);
          workout.addTotalDuration();
          newWorkoutArr.push(workout);
        }
        res.json(newWorkoutArr);
      })
      .catch(err => {
        res.json(err);
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
        res.json(err);
      });
  });

  app.put(`/api/workouts/:id`, (req, res) => {
    db.Workout.update(
      { _id: req.params.id },
      { $push: { exercises: req.body } }
    )
      .then(result => {
        console.log(result);
        res.json(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

};
