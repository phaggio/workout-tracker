'use strict';

const express = require(`express`);
const mongoose = require(`mongoose`);
const logger = require(`morgan`);
const path = require(`path`);
const htmlRoutes = require(`./routes/html-routes`);

const PORT = process.env.PORT || 3000;

const db = require(`./models`);

const app = express();

app.use(logger(`dev`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`public`));

mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/workout`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// html routes
// default makes latest exercise api get call
htmlRoutes(app);

// api routes

app.get(`/api/workouts`, (req, res) => {
  db.Workout.find({})
    .then(workouts => {
      let newWorkoutArr = [];
      for (let i in workouts) {
        const workout = new db.Workout(workouts[i]);
        workout.addTotalDuration();
        newWorkoutArr.push(workout);
      }
      // console.log(`new workouts`, newWorkoutArr);
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


app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});