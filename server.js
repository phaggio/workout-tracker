'use strict';

const express = require(`express`);
const mongoose = require(`mongoose`);
const logger = require(`morgan`);
const path = require(`path`);
const htmlRoutes = require(`./routes/html-routes`);
const apiRoutes = require(`./routes/api-routes`);

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
apiRoutes(app);

app.get(`/api/workouts/range`, (req, res) => {
  db.Workout.find({})
    .then(workouts => {
      res.json(workouts);
    })
})

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});