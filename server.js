'use strict';

const express = require(`express`);
const mongoose = require(`mongoose`);
const logger = require(`morgan`);
const path = require(`path`);

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
app.get(`/`, (req, res) => res.sendFile(path.join(__dirname, `/public/index.html`)));
app.get(`/exercise`, (req, res) => res.sendFile(path.join(__dirname, `/public/exercise.html`)));
app.get(`/stats`, (req, res) => res.sendFile(path.join(__dirname, `/public/stats.html`)));

// api routes
app.get(`/?id=:id`, (req, res) => {
  // const id = req.params.id;
  console.log(req.params.id);
  console.log(`calling last exercise id data`);
  db.Workout.findById(id, data => {
    console.log(data);
    res.json(data);
  }
  )
})

app.get(`/test`, (req, res) => {
  db.Workout.find()
    .then(data => {
      let newArr = [];
      for (let i in data) {
        console.log(data[i]);
        const workout = new db.Workout(data[i]);
        workout.addTotalDuration();
        newArr.push(workout);
      };
      res.json(newArr);
    })
    .catch(err => {
      console.log(err);
    })
});

app.get(`/api/workouts`, (req, res) => {
  db.Workout.find({})
    .then(workouts => {
      let newWorkoutArr = [];
      for (let i in workouts) {
        const workout = new db.Workout(workouts[i]);
        workout.addTotalDuration();
        newWorkoutArr.push(workout);
      }
      console.log(`new workouts`, newWorkoutArr);
      res.json(newWorkoutArr);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});